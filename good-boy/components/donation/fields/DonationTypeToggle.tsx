'use client';

import { SegmentedControl } from '@mantine/core';
import { Controller, type Control } from 'react-hook-form';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

export type DonationType = 'shelter' | 'foundation';

interface DonationTypeToggleProps {
  control: Control<DonationFormValues>;
}

export function DonationTypeToggle({ control }: DonationTypeToggleProps) {
  return (
    <Controller
      name="donationType"
      control={control}
      render={({ field }) => (
        <SegmentedControl
          value={field.value}
          onChange={field.onChange}
          fullWidth
          size="xl"
          radius="12px"
          color="violet"
          data={[
            { label: 'Prispieť konkrétnemu útulku', value: 'shelter' },
            { label: 'Prispieť celej nadácii', value: 'foundation' },
          ]}
          styles={{
            root: {
              backgroundColor: 'var(--mantine-color-white)',
              border: '1px solid var(--mantine-color-gray-2)',
            },
            label: {
              fontSize: 14,
              '&[dataActive]': {
                color: 'var(--mantine-color-white)',
              },
            },
          }}
        />
      )}
    />
  );
}
