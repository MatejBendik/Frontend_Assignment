"use client";

import { Button, Text } from "@mantine/core";
import { useRef } from "react";
import { Controller, type Control } from "react-hook-form";
import type { DonationFormValues } from "@/lib/validation/donationSchema";
import classes from "./AmountPicker.module.css";

const PRESETS = [5, 10, 20, 30, 50, 100];

interface AmountPickerProps {
  control: Control<DonationFormValues>;
}

export function AmountPicker({ control }: AmountPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name="amount"
      control={control}
      render={({ field, fieldState }) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          field.onChange(raw === "" ? 0 : parseInt(raw, 10));
        };

        const displayValue = field.value ? String(field.value) : "";
        const charCount = Math.max(displayValue.length, 1);

        return (
          <div className={classes.wrapper}>
            <div className={classes.amountDisplay}>
              <div className={classes.amountRow}>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  className={classes.amountInput}
                  value={displayValue}
                  onChange={handleInputChange}
                  onBlur={field.onBlur}
                  placeholder="0"
                  style={{ width: `${charCount}ch` }}
                  aria-label="Suma príspevku v eurách"
                  data-error={fieldState.error ? "" : undefined}
                />
                <span className={classes.currency}>€</span>
              </div>
              <div className={classes.underline} />
            </div>

            <div className={classes.presets}>
              {PRESETS.map((preset) => (
                <Button
                  key={preset}
                  size="lg"
                  radius={12}
                  styles={{
                    root: {
                      fontSize: 16,
                      fontWeight: 500,
                    },
                  }}
                  variant="filled"
                  color={field.value === preset ? "violet" : "gray.1.5"}
                  c={field.value === preset ? "white" : "dark"}
                  onClick={() => {
                    field.onChange(preset);
                    inputRef.current?.focus();
                  }}
                  aria-label={`${preset} eur`}
                >
                  {preset} €
                </Button>
              ))}
            </div>

            {fieldState.error && (
              <Text c="red" size="sm">
                {fieldState.error.message}
              </Text>
            )}
          </div>
        );
      }}
    />
  );
}
