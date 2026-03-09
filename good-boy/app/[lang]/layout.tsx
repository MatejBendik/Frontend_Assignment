import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Inter } from "next/font/google";
import { isLocale, locales, defaultLocale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { notFound } from "next/navigation";
import { Providers } from "./(providers)/providers";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

const BASE_URL = "https://goodrequest.com";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | GoodBoy`,
    },
    description: dict.metadata.siteDescription,
    openGraph: {
      type: "website" as const,
      locale: locale === "sk" ? "sk_SK" : "en_US",
      siteName: "GoodBoy",
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      images: [{ url: "/images/donation-dog.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      images: ["/images/donation-dog.jpg"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
