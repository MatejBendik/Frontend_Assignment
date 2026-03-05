'use client';

import { Group, Select, Text, TextInput } from '@mantine/core';
import { Controller, useWatch, type Control } from 'react-hook-form';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

const COUNTRY_OPTIONS = [
  { value: '+421', label: '🇸🇰' },
  { value: '+420', label: '🇨🇿' },
];

const CODE_MAP: Record<string, string> = {
  '+421': '+ 421',
  '+420': '+ 420',
};

interface PhoneFieldProps {
  control: Control<DonationFormValues>;
}

export function PhoneField({ control }: PhoneFieldProps) {
  const phoneCountry = useWatch({ control, name: 'phoneCountry' });

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
        Telefónne číslo{' '}
        <span style={{ color: 'var(--mantine-color-red-filled)' }}>*</span>
      </label>
      <Group gap="xs" align="flex-start" wrap="nowrap">
        <Controller
          name="phoneCountry"
          control={control}
          render={({ field }) => (
            <Select
              data={COUNTRY_OPTIONS}
              value={field.value}
              onChange={(val) => field.onChange(val ?? '+421')}
              onBlur={field.onBlur}
              w={90}
              size="md"
              allowDeselect={false}
              aria-label="Predvoľba krajiny"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              placeholder="123 321 123"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              size="md"
              style={{ flex: 1 }}
              leftSection={
                <Text size="sm" c="dark" fw={500} pl={4}>
                  {CODE_MAP[phoneCountry] ?? '+ 421'}
                </Text>
              }
              leftSectionWidth={60}
              aria-label="Telefónne číslo"
              required
            />
          )}
        />
      </Group>
    </div>
  );
}
