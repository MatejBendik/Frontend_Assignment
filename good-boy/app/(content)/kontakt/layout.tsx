import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte nadáciu GoodBoy – email, telefón a adresa kancelárie v Žiline.",
  openGraph: {
    title: "Kontakt | GoodBoy",
    description:
      "Kontaktujte nadáciu GoodBoy – email, telefón a adresa kancelárie v Žiline.",
    images: [{ url: "/images/kontakt-dog.jpg", width: 1200, height: 630 }],
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
