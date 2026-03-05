'use client';

import { Divider, Stack, Text, Title } from '@mantine/core';
import { ConsentCheckbox } from '../fields/ConsentCheckbox';
import { SummaryRow } from '../summary/SummaryRow';
import type { Control } from 'react-hook-form';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

/** Mock shelter label lookup */
const SHELTER_LABELS: Record<string, string> = {
  '1': 'Mestský útulok, Žilina',
  '2': 'OZ Tuláčik, Bratislava',
  '3': 'Sloboda zvierat, Košice',
  '4': 'Útulok Piešťany',
  '5': 'Psí domov, Banská Bystrica',
};

interface Step3ConfirmProps {
  control: Control<DonationFormValues>;
  values: DonationFormValues;
}

export function Step3Confirm({ control, values }: Step3ConfirmProps) {
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

  const formattedType =
    donationType === 'foundation'
      ? 'Finančný príspevok celej nadácii'
      : 'Príspevok konkrétnemu útulku';

  const shelterLabel = shelterId ? (SHELTER_LABELS[shelterId] ?? '—') : '—';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—';
  const fullPhone = phoneNumber ? `${phoneCountry} ${phoneNumber}` : '—';

  return (
    <Stack gap="lg">
      <Title order={2} fw={800} size="h1">
        Skontrolujte si zadané údaje
      </Title>

      {/* Donation summary */}
      <div>
        <Text fw={700} mb="xs">
          Zhrnutie
        </Text>
        <SummaryRow label="Forma pomoci" value={formattedType} />
        <SummaryRow label="Útulok" value={shelterLabel} />
        <SummaryRow label="Suma príspevku" value={`${amount} €`} />
      </div>

      <Divider />

      {/* Personal details summary */}
      <div>
        <SummaryRow label="Meno a priezvisko" value={fullName} />
        <SummaryRow label="E-mail" value={email || '—'} />
        <SummaryRow label="Telefónne číslo" value={fullPhone} />
      </div>

      <ConsentCheckbox control={control} />
    </Stack>
  );
}
