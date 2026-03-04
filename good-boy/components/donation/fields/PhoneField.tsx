'use client';

import { Group, Select, TextInput } from '@mantine/core';

const COUNTRY_OPTIONS = [
  { value: '+421', label: '🇸🇰 +421' },
  { value: '+420', label: '🇨🇿 +420' },
];

interface PhoneFieldProps {
  countryCode: string;
  phoneNumber: string;
  onCountryChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export function PhoneField({
  countryCode,
  phoneNumber,
  onCountryChange,
  onPhoneChange,
}: PhoneFieldProps) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 'var(--mantine-font-size-sm)',
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        Telefónne číslo
      </label>
      <Group gap="xs" align="flex-start" wrap="nowrap">
        <Select
          data={COUNTRY_OPTIONS}
          value={countryCode}
          onChange={(val) => onCountryChange(val ?? '+421')}
          w={120}
          size="md"
          allowDeselect={false}
          aria-label="Predvoľba krajiny"
        />
        <TextInput
          placeholder="123 321 123"
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.currentTarget.value)}
          size="md"
          style={{ flex: 1 }}
          aria-label="Telefónne číslo"
        />
      </Group>
    </div>
  );
}
