"use client";

import { Select } from "@mantine/core";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useShelters } from "@/lib/query/shelters";
import type { DonationFormValues } from "@/lib/validation/donationSchema";

interface ShelterSelectProps {
  control: Control<DonationFormValues>;
  required?: boolean;
}

export function ShelterSelect({
  control,
  required = false,
}: ShelterSelectProps) {
  const { t } = useTranslation();
  const { data, isLoading } = useShelters();

  const shelterOptions = (data?.shelters ?? []).map((s) => ({
    value: String(s.id),
    label: s.name,
  }));

  return (
    <Controller
      name="shelterId"
      control={control}
      render={({ field, fieldState }) => (
        <Select
          label={`${t("step1.shelterLabel")}${!required ? t("step1.shelterOptionalSuffix") : ""}`}
          placeholder={t("step1.shelterPlaceholder")}
          data={shelterOptions}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
          clearable
          searchable
          required={required}
          disabled={isLoading}
          aria-label={t("step1.shelterAriaLabel")}
        />
      )}
    />
  );
}
