'use client';

import { Stack, Text, Title } from '@mantine/core';
import { DonationTypeToggle, type DonationType } from '../fields/DonationTypeToggle';
import { ShelterSelect } from '../fields/ShelterSelect';
import { AmountPicker } from '../fields/AmountPicker';

interface Step1ProjectProps {
  donationType: DonationType;
  shelterId: string | null;
  amount: number;
  onDonationTypeChange: (value: DonationType) => void;
  onShelterChange: (value: string | null) => void;
  onAmountChange: (value: number) => void;
}

export function Step1Project({
  donationType,
  shelterId,
  amount,
  onDonationTypeChange,
  onShelterChange,
  onAmountChange,
}: Step1ProjectProps) {
  return (
    <Stack gap="lg">
      <Title order={2} fw={800} size="h1">
        Vyberte si možnosť, ako chcete pomôcť
      </Title>

      <DonationTypeToggle value={donationType} onChange={onDonationTypeChange} />

      <div>
        <Text fw={600} size="sm" mb={4}>
          O projekte
        </Text>
        <ShelterSelect
          value={shelterId}
          onChange={onShelterChange}
          required={donationType === 'shelter'}
        />
      </div>

      <div>
        <Text fw={600} mb="sm">
          Suma, ktorú chcem prispieť
        </Text>
        <AmountPicker value={amount} onChange={onAmountChange} />
      </div>
    </Stack>
  );
}
