"use client";

import { Stack, Text, Title } from "@mantine/core";
import { useWatch, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DonationTypeToggle } from "../fields/DonationTypeToggle";
import { ShelterSelect } from "../fields/ShelterSelect";
import { AmountPicker } from "../fields/AmountPicker";
import type { DonationFormValues } from "@/lib/validation/donationSchema";

interface Step1ProjectProps {
  control: Control<DonationFormValues>;
}

export function Step1Project({ control }: Step1ProjectProps) {
  const { t } = useTranslation();
  const donationType = useWatch({ control, name: "donationType" });

  return (
    <Stack gap={40}>
      <Title order={2} fw={700} size="48px">
        {t("step1.title")}
      </Title>

      <DonationTypeToggle control={control} />

      <div>
        <Text fw={600} size="sm" mb={4}>
          {t("step1.aboutProject")}
        </Text>
        <ShelterSelect
          control={control}
          required={donationType === "shelter"}
        />
      </div>

      <div>
        <Text fw={600} mb="sm">
          {t("step1.amountLabel")}
        </Text>
        <AmountPicker control={control} />
      </div>
    </Stack>
  );
}
