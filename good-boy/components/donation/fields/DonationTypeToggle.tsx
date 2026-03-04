'use client';

import { SegmentedControl } from '@mantine/core';

export type DonationType = 'shelter' | 'foundation';

interface DonationTypeToggleProps {
  value: DonationType;
  onChange: (value: DonationType) => void;
}

export function DonationTypeToggle({ value, onChange }: DonationTypeToggleProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={(val) => onChange(val as DonationType)}
      fullWidth
      size="md"
      radius="xl"
      data={[
        { label: 'Prispieť konkrétnemu útulku', value: 'shelter' },
        { label: 'Prispieť celej nadácii', value: 'foundation' },
      ]}
      styles={{
        root: {
          backgroundColor: 'var(--mantine-color-gray-1)',
          padding: 4,
        },
      }}
    />
  );
}
