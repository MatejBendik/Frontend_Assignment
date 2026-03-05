'use client';

import { Select } from '@mantine/core';
import { Controller, type Control } from 'react-hook-form';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

/** Mock shelter data — will be replaced with API data later */
const MOCK_SHELTERS = [
  { value: '1', label: 'Mestský útulok, Žilina' },
  { value: '2', label: 'OZ Tuláčik, Bratislava' },
  { value: '3', label: 'Sloboda zvierat, Košice' },
  { value: '4', label: 'Útulok Piešťany' },
  { value: '5', label: 'Psí domov, Banská Bystrica' },
];

interface ShelterSelectProps {
  control: Control<DonationFormValues>;
  required?: boolean;
}

export function ShelterSelect({ control, required = false }: ShelterSelectProps) {
  return (
    <Controller
      name="shelterId"
      control={control}
      render={({ field, fieldState }) => (
        <Select
          label={`Útulok${!required ? ' (Nepovinné)' : ''}`}
          placeholder="Vyberte útulok zo zoznamu"
          data={MOCK_SHELTERS}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
          clearable
          searchable
          size="md"
          required={required}
          aria-label="Vyberte útulok"
        />
      )}
    />
  );
}
