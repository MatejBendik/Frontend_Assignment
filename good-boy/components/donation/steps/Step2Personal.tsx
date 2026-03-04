'use client';

import { Grid, Stack, TextInput, Title, Text } from '@mantine/core';
import { PhoneField } from '../fields/PhoneField';

interface Step2PersonalProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneCountryChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

export function Step2Personal({
  firstName,
  lastName,
  email,
  phoneCountry,
  phoneNumber,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneCountryChange,
  onPhoneNumberChange,
}: Step2PersonalProps) {
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
          <TextInput
            label="Meno"
            placeholder="Zadajte Vaše meno"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.currentTarget.value)}
            size="md"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label="Priezvisko"
            placeholder="Zadajte Vaše priezvisko"
            value={lastName}
            onChange={(e) => onLastNameChange(e.currentTarget.value)}
            size="md"
          />
        </Grid.Col>
      </Grid>

      <TextInput
        label="E-mailová adresa"
        placeholder="Zadajte Váš e-mail"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.currentTarget.value)}
        size="md"
      />

      <PhoneField
        countryCode={phoneCountry}
        phoneNumber={phoneNumber}
        onCountryChange={onPhoneCountryChange}
        onPhoneChange={onPhoneNumberChange}
      />
    </Stack>
  );
}
