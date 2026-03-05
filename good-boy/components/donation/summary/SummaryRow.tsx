import { Group, Text } from "@mantine/core";

interface SummaryRowProps {
  label: string;
  value: string;
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <Group justify="space-between" py={8}>
      <Text size="sm" c="dark" fw={400}>
        {label}
      </Text>
      <Text size="sm" fw={600}>
        {value}
      </Text>
    </Group>
  );
}
