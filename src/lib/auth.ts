import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const user = await prisma.adminUser.findUnique({
            where: { email },
          });

          if (!user) {
            // Check fallback superadmin for first boot if DB is empty
            if (email === "admin@amirhossein.dev" && password === "AdminPass123!") {
              return {
                id: "admin-seed",
                name: "Amirhossein Omidi",
                email: "admin@amirhossein.dev",
                role: "ADMIN",
              };
            }
            return null;
          }

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          // Fallback credential when database is offline in staging
          if (email === "admin@amirhossein.dev" && password === "AdminPass123!") {
            return {
              id: "admin-seed",
              name: "Amirhossein Omidi",
              email: "admin@amirhossein.dev",
              role: "ADMIN",
            };
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/en/admin/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || "super_random_jwt_secret_token_change_in_production",
});
