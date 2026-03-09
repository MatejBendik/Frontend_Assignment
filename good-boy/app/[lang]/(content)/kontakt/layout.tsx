import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, defaultLocale } from "@/lib/i18n/settings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.metadata.contactTitle,
    description: dict.metadata.contactDescription,
    openGraph: {
      title: `${dict.metadata.contactTitle} | GoodBoy`,
      description: dict.metadata.contactDescription,
      images: [{ url: "/images/kontakt-dog.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
