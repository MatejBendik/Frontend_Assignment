"use client";

import { Checkbox } from "@mantine/core";
import { Controller, type Control } from "react-hook-form";
import type { DonationFormValues } from "@/lib/validation/donationSchema";

interface ConsentCheckboxProps {
  control: Control<DonationFormValues>;
}

export function ConsentCheckbox({ control }: ConsentCheckboxProps) {
  return (
    <Controller
      name="consent"
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          label="Súhlasím so spracovaním mojich osobných údajov"
          checked={!!field.value}
          onChange={(e) => field.onChange(e.currentTarget.checked)}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
          size="md"
          aria-required
          pt="sm"
        />
      )}
    />
  );
}
