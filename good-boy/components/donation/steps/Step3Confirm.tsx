"use client";

import { Divider, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ConsentCheckbox } from "../fields/ConsentCheckbox";
import { SummaryRow } from "../summary/SummaryRow";
import { useShelters } from "@/lib/query/shelters";
import type { Control } from "react-hook-form";
import type { DonationFormValues } from "@/lib/validation/donationSchema";

interface Step3ConfirmProps {
  control: Control<DonationFormValues>;
  values: DonationFormValues;
}

export function Step3Confirm({ control, values }: Step3ConfirmProps) {
  const { t } = useTranslation();
  const {
    donationType,
    shelterId,
    amount,
    firstName,
    lastName,
    email,
    phoneCountry,
    phoneNumber,
  } = values;

  const { data: sheltersData } = useShelters();

  const formattedType =
    donationType === "foundation"
      ? t("step3.foundationContribution")
      : t("step3.shelterContribution");

  const shelterLabel = shelterId
    ? (sheltersData?.shelters.find((s) => String(s.id) === shelterId)?.name ??
      "—")
    : "—";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";
  const formattedPhone = phoneNumber
    ? phoneNumber
        .replace(/\D/g, "")
        .replace(/(\d{3})(?=\d)/g, "$1 ")
        .trim()
    : "";
  const fullPhone = formattedPhone ? `${phoneCountry} ${formattedPhone}` : "—";

  return (
    <Stack gap="lg">
      <Title order={2} fw={700} size="48px">
        {t("step3.title")}
      </Title>

      {/* Donation summary */}
      <div>
        <Text fw={700} mb="xs">
          {t("step3.summary")}
        </Text>
        <SummaryRow label={t("step3.helpType")} value={formattedType} />
        <SummaryRow label={t("step3.shelter")} value={shelterLabel} />
        <SummaryRow label={t("step3.amount")} value={`${amount} €`} />
      </div>

      <Divider size="xs" />

      {/* Personal details summary */}
      <div>
        <SummaryRow label={t("step3.fullName")} value={fullName} />
        <SummaryRow label={t("step3.email")} value={email || "—"} />
        <SummaryRow label={t("step3.phone")} value={fullPhone} />
      </div>

      <Divider size="xs" />

      <ConsentCheckbox control={control} />
    </Stack>
  );
}
