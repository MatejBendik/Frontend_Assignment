'use client';

import { Grid, Stack, TextInput, Title, Text } from '@mantine/core';
import { Controller, type Control } from 'react-hook-form';
import { PhoneField } from '../fields/PhoneField';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

interface Step2PersonalProps {
  control: Control<DonationFormValues>;
}

export function Step2Personal({ control }: Step2PersonalProps) {
  return (
    <Stack gap="lg">
      <Title order={2} fw={800} size="h1">
        Potrebujeme od Vás zopár informácií
      </Title>

      <Text fw={600} size="sm">
        O vás
      </Text>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Meno"
                placeholder="Zadajte Vaše meno"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                maxLength={20}
                size="md"
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
                label="Priezvisko"
                placeholder="Zadajte Vaše priezvisko"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                maxLength={30}
                size="md"
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
            label="E-mailová adresa"
            placeholder="Zadajte Váš e-mail"
            type="email"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            size="md"
            required
          />
        )}
      />

      <PhoneField control={control} />
    </Stack>
  );
}
