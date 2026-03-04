'use client';

import { Anchor, Group, Title, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface ContentPageHeaderProps {
  title: string;
}

export function ContentPageHeader({ title }: ContentPageHeaderProps) {
  return (
    <Stack gap="md">
      <Anchor component={Link} href="/" size="sm" c="violet" underline="never">
        <Group gap={4}>
          <IconArrowLeft size={16} />
          Späť
        </Group>
      </Anchor>

      <Title order={1} fw={800}>
        {title}
      </Title>
    </Stack>
  );
}
