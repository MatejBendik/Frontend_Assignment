import { Group, Text } from '@mantine/core';

interface SummaryRowProps {
  label: string;
  value: string;
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <Group justify="space-between" py={8} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Text size="sm" fw={600}>
        {value}
      </Text>
    </Group>
  );
}
