"use client";

import { Grid, Stack, TextInput, Title, Text } from "@mantine/core";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PhoneField } from "../fields/PhoneField";
import type { DonationFormValues } from "@/lib/validation/donationSchema";

interface Step2PersonalProps {
  control: Control<DonationFormValues>;
}

export function Step2Personal({ control }: Step2PersonalProps) {
  const { t } = useTranslation();

  return (
    <Stack gap="lg">
      <Title order={2} fw={700} size="48px">
        {t("step2.title")}
      </Title>

      <Text fw={600} size="md">
        {t("step2.aboutYou")}
      </Text>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={t("step2.firstName")}
                placeholder={t("step2.firstNamePlaceholder")}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                maxLength={20}
              />
            )}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={t("step2.lastName")}
                placeholder={t("step2.lastNamePlaceholder")}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                maxLength={30}
                required
              />
            )}
          />
        </Grid.Col>
      </Grid>

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            label={t("step2.email")}
            placeholder={t("step2.emailPlaceholder")}
            type="email"
            inputMode="email"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            required
          />
        )}
      />

      <PhoneField control={control} />
    </Stack>
  );
}
