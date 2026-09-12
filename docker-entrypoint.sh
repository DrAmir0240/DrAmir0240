#!/bin/sh
set -e

echo "Pushing Prisma schema to PostgreSQL..."
npx prisma db push --skip-generate

echo "Seeding initial profile and admin user..."
npx prisma db seed || true

echo "Starting Next.js standalone server..."
exec node server.js
