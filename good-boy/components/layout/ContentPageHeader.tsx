"use client";

import { Anchor, Group, Title, Stack, Text } from "@mantine/core";
import { ArrowNarrowLeft } from "@/components/icons/ArrowNarrowLeft";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";

interface ContentPageHeaderProps {
  title: string;
}

export function ContentPageHeader({ title }: ContentPageHeaderProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <Stack gap="md">
      <Anchor
        component={Link}
        href={`/${lang}`}
        size="sm"
        c="violet"
        underline="never"
      >
        <Group gap={4}>
          <ArrowNarrowLeft size={20} />
          <Text fw={500} size="md">
            {t("nav.back")}
          </Text>
        </Group>
      </Anchor>

      <Title order={1} fw={700} size="48px">
        {title}
      </Title>
    </Stack>
  );
}
