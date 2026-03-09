import type { Metadata } from "next";
import { DonationWizard } from "@/components/donation/DonationWizard";

export const metadata: Metadata = {
  title: "Darovať",
  description:
    "Darujte útulkom pre psov na Slovensku – vyberte si útulok, zadajte údaje a podporte dobrú vec.",
  openGraph: {
    title: "Darovať | GoodBoy",
    description:
      "Darujte útulkom pre psov na Slovensku – vyberte si útulok, zadajte údaje a podporte dobrú vec.",
    images: [{ url: "/images/donation-dog.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <DonationWizard />;
}
