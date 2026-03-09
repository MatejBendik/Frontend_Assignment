"use client";

import { Divider, Grid, Skeleton, Stack, Text } from "@mantine/core";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { useShelterResults } from "@/lib/query/shelters";
import { useTranslation } from "@/lib/i18n/client";

export default function OProjektePage() {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useShelterResults();

  const numberLocale = i18n.language === "sk" ? "sk-SK" : "en-US";

  return (
    <Stack gap="xl">
      <ContentPageHeader title={t("about.title")} />

      {/* Description */}
      <Text size="md" fw={400} lh={1.7}>
        {t("about.description1")}
      </Text>

      <Divider />

      {/* Stats */}
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack align="center" gap={4}>
            {isLoading ? (
              <Skeleton height={53} width={200} />
            ) : (
              <Text
                size="xl"
                fw={600}
                c="violet"
                style={{ fontSize: 60, lineHeight: 1.1 }}
              >
                {data?.contribution.toLocaleString(numberLocale)} €
              </Text>
            )}
            <Text size="18px" c="dark" fw={500}>
              {t("about.totalRaised")}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack align="center" gap={4}>
            {isLoading ? (
              <Skeleton height={53} width={120} />
            ) : (
              <Text
                size="xl"
                fw={600}
                c="violet"
                style={{ fontSize: 60, lineHeight: 1.1 }}
              >
                {data?.contributors.toLocaleString(numberLocale)}
              </Text>
            )}
            <Text size="18px" c="dark" fw={500}>
              {t("about.donorCount")}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider />

      {/* Additional text */}
      <Text size="md" fw={400} lh={1.7}>
        {t("about.description2")}
      </Text>
    </Stack>
  );
}
