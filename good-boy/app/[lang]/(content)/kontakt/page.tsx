"use client";

import { Anchor, Grid, Image, Stack, Text, ThemeIcon } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { MailIcon } from "@/components/icons/MailIcon";
import { MarkerPinIcon } from "@/components/icons/MarkerPinIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

export default function KontaktPage() {
  const { t } = useTranslation();

  const CONTACT_CARDS = [
    {
      icon: MailIcon,
      title: t("contact.emailTitle"),
      description: t("contact.emailDesc"),
      value: t("contact.emailValue"),
      href: "mailto:hello@goodrequest.com",
    },
    {
      icon: MarkerPinIcon,
      title: t("contact.officeTitle"),
      description: t("contact.officeDesc"),
      value: t("contact.officeAddress"),
      href: "https://maps.google.com/?q=Obchodná+3D+Žilina",
    },
    {
      icon: PhoneIcon,
      title: t("contact.phoneTitle"),
      description: t("contact.phoneDesc"),
      value: t("contact.phoneValue"),
      href: "tel:+421911750750",
    },
  ];

  return (
    <Stack gap="lg">
      <ContentPageHeader title={t("contact.title")} />

      {/* Contact cards */}
      <Grid gutter="xl" mt="md">
        {CONTACT_CARDS.map((card) => (
          <Grid.Col key={card.title} span={{ base: 12, sm: 4 }}>
            <Stack align="center" ta="center" gap="20px">
              <ThemeIcon variant="light" color="violet" size={48} radius="10px">
                <card.icon size={24} />
              </ThemeIcon>
              <Text fw={600} size="xl">
                {card.title}
              </Text>
              <Text size="md" fw={400} c="dimmed">
                {card.description}
              </Text>
              <Anchor
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                size="md"
                c="violet"
                fw={500}
              >
                {card.value}
              </Anchor>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>

      {/* Hero image */}
      <Image
        src="/images/kontakt-dog.jpg"
        alt={t("contact.imageAlt")}
        radius="20px"
        h={{ base: 260, sm: 400 }}
        fit="cover"
        mt="md"
      />
    </Stack>
  );
}
