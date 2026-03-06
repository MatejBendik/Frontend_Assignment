"use client";

import {
  Group,
  Image,
  Select,
  Text,
  TextInput,
  type ComboboxLikeRenderOptionInput,
} from "@mantine/core";
import { Controller, useWatch, type Control } from "react-hook-form";
import type { DonationFormValues } from "@/lib/validation/donationSchema";
import type { ChangeEvent } from "react";

const FLAG_MAP: Record<string, string> = {
  "+421": "/icons/sk-icon.png",
  "+420": "/icons/cz-icon.png",
};

const COUNTRY_OPTIONS = [
  { value: "+421", label: "+421" },
  { value: "+420", label: "+420" },
];

function renderCountryOption({
  option,
}: ComboboxLikeRenderOptionInput<{ value: string; label: string }>) {
  return (
    <Group gap="xs" wrap="nowrap">
      <Image
        src={FLAG_MAP[option.value]}
        alt=""
        w={20}
        h={20}
        style={{ borderRadius: 2, flexShrink: 0 }}
      />
    </Group>
  );
}

const CODE_MAP: Record<string, string> = {
  "+421": "+ 421",
  "+420": "+ 420",
};

/** Format raw digits as "123 456 789" */
function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

interface PhoneFieldProps {
  control: Control<DonationFormValues>;
}

export function PhoneField({ control }: PhoneFieldProps) {
  const phoneCountry = useWatch({ control, name: "phoneCountry" });

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "var(--mantine-font-size-sm)",
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        Telefónne číslo{" "}
        <span style={{ color: "var(--mantine-color-red-filled)" }}>*</span>
      </label>
      <Group gap="md" align="flex-start" wrap="nowrap">
        <Controller
          name="phoneCountry"
          control={control}
          render={({ field }) => (
            <Select
              data={COUNTRY_OPTIONS}
              value={field.value}
              onChange={(val) => field.onChange(val ?? "+421")}
              onBlur={field.onBlur}
              w={80}
              allowDeselect={false}
              aria-label="Predvoľba krajiny"
              renderOption={renderCountryOption}
              leftSection={
                <Image
                  src={FLAG_MAP[field.value] ?? FLAG_MAP["+421"]}
                  alt=""
                  w={20}
                  h={20}
                  style={{ borderRadius: 2, pointerEvents: "none" }}
                />
              }
              leftSectionWidth={48}
              leftSectionPointerEvents="none"
              styles={{
                input: { paddingLeft: 36, color: "transparent", fontSize: 0 },
              }}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              placeholder="123 321 123"
              value={formatPhoneDisplay(field.value)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const digits = e.currentTarget.value
                  .replace(/\D/g, "")
                  .slice(0, 9);
                field.onChange(digits);
              }}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              style={{ flex: 1 }}
              leftSection={
                <Text size="md" c="black" fw={400} pl={4}>
                  {CODE_MAP[phoneCountry] ?? "+ 421"}
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
