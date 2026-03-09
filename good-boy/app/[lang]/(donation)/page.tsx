import { DonationWizard } from "@/components/donation/DonationWizard";
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
    title: dict.metadata.donateTitle,
    description: dict.metadata.donateDescription,
    openGraph: {
      title: `${dict.metadata.donateTitle} | GoodBoy`,
      description: dict.metadata.donateDescription,
      images: [{ url: "/images/donation-dog.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function Page() {
  return <DonationWizard />;
}
