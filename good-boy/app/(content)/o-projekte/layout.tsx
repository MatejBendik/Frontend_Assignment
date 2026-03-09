import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O projekte",
  description:
    "Nadácia GoodBoy zachraňuje opustené psy v Žiline. Prečítajte si o našom poslaní, výsledkoch a ako môžete pomôcť.",
  openGraph: {
    title: "O projekte | GoodBoy",
    description:
      "Nadácia GoodBoy zachraňuje opustené psy v Žiline. Prečítajte si o našom poslaní, výsledkoch a ako môžete pomôcť.",
    images: [{ url: "/images/donation-dog.jpg", width: 1200, height: 630 }],
  },
};

export default function OProjekteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
