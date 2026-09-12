import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || "en";
  if (!locales.includes(currentLocale as Locale)) notFound();

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  };
});
