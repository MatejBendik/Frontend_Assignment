'use client';

import { Checkbox } from '@mantine/core';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ConsentCheckbox({ checked, onChange }: ConsentCheckboxProps) {
  return (
    <Checkbox
      label="Súhlasím so spracovaním mojich osobných údajov"
      checked={checked}
      onChange={(e) => onChange(e.currentTarget.checked)}
      size="md"
      aria-required
    />
  );
}
