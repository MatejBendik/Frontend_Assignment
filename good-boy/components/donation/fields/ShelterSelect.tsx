'use client';

import { Select } from '@mantine/core';

/** Mock shelter data — will be replaced with API data later */
const MOCK_SHELTERS = [
  { value: '1', label: 'Mestský útulok, Žilina' },
  { value: '2', label: 'OZ Tuláčik, Bratislava' },
  { value: '3', label: 'Sloboda zvierat, Košice' },
  { value: '4', label: 'Útulok Piešťany' },
  { value: '5', label: 'Psí domov, Banská Bystrica' },
];

interface ShelterSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  required?: boolean;
}

export function ShelterSelect({ value, onChange, required = false }: ShelterSelectProps) {
  return (
    <Select
      label={`Útulok${!required ? ' (Nepovinné)' : ''}`}
      placeholder="Vyberte útulok zo zoznamu"
      data={MOCK_SHELTERS}
      value={value}
      onChange={onChange}
      clearable
      searchable
      size="md"
      aria-label="Vyberte útulok"
    />
  );
}
