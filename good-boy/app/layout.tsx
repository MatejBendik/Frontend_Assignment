import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./(providers)/providers";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

const BASE_URL = "https://goodrequest.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GoodBoy | Podpora útulkov",
    template: "%s | GoodBoy",
  },
  description:
    "Podporte slovenské útulky pre psov cez jednoduchý darovací formulár.",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "GoodBoy",
    title: "GoodBoy | Podpora útulkov",
    description:
      "Podporte slovenské útulky pre psov cez jednoduchý darovací formulár.",
    images: [{ url: "/images/donation-dog.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodBoy | Podpora útulkov",
    description:
      "Podporte slovenské útulky pre psov cez jednoduchý darovací formulár.",
    images: ["/images/donation-dog.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
