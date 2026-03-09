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
    title: dict.metadata.aboutTitle,
    description: dict.metadata.aboutDescription,
    openGraph: {
      title: `${dict.metadata.aboutTitle} | GoodBoy`,
      description: dict.metadata.aboutDescription,
      images: [{ url: "/images/donation-dog.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function OProjekteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
