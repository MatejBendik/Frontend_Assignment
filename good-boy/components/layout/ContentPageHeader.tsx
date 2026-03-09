"use client";

import { Anchor, Group, Title, Stack, Text } from "@mantine/core";
import { ArrowNarrowLeft } from "@/components/icons/ArrowNarrowLeft";
import Link from "next/link";

interface ContentPageHeaderProps {
  title: string;
}

export function ContentPageHeader({ title }: ContentPageHeaderProps) {
  return (
    <Stack gap="md">
      <Anchor component={Link} href="/" size="sm" c="violet" underline="never">
        <Group gap={4}>
          <ArrowNarrowLeft size={20} />
          <Text fw={500} size="md">
            Späť
          </Text>
        </Group>
      </Anchor>

      <Title order={1} fw={700} size="48px">
        {title}
      </Title>
    </Stack>
  );
}
