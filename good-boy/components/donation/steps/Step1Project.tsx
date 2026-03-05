'use client';

import { Stack, Text, Title } from '@mantine/core';
import { useWatch, type Control } from 'react-hook-form';
import { DonationTypeToggle } from '../fields/DonationTypeToggle';
import { ShelterSelect } from '../fields/ShelterSelect';
import { AmountPicker } from '../fields/AmountPicker';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

interface Step1ProjectProps {
  control: Control<DonationFormValues>;
}

export function Step1Project({ control }: Step1ProjectProps) {
  const donationType = useWatch({ control, name: 'donationType' });

  return (
    <Stack gap={40}>
      <Title order={2} fw={800} size="h1">
        Vyberte si možnosť, ako chcete pomôcť
      </Title>

      <DonationTypeToggle control={control} />

      <div>
        <Text fw={600} size="sm" mb={4}>
          O projekte
        </Text>
        <ShelterSelect
          control={control}
          required={donationType === 'shelter'}
        />
      </div>

      <div>
        <Text fw={600} mb="sm">
          Suma, ktorou chcem prispieť
        </Text>
        <AmountPicker control={control} />
      </div>
    </Stack>
  );
}
