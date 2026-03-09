"use client";

import { Checkbox } from "@mantine/core";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { DonationFormValues } from "@/lib/validation/donationSchema";

interface ConsentCheckboxProps {
  control: Control<DonationFormValues>;
}

export function ConsentCheckbox({ control }: ConsentCheckboxProps) {
  const { t } = useTranslation();

  return (
    <Controller
      name="consent"
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          label={t("step3.consentLabel")}
          checked={!!field.value}
          onChange={(e) => field.onChange(e.currentTarget.checked)}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
          size="sm"
          radius="4px"
          fw={500}
          aria-required
          pt="sm"
        />
      )}
    />
  );
}
