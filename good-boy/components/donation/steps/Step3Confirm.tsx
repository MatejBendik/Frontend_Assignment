'use client';

import { Divider, Stack, Text, Title } from '@mantine/core';
import { ConsentCheckbox } from '../fields/ConsentCheckbox';
import { SummaryRow } from '../summary/SummaryRow';
import { useShelters } from '@/lib/query/shelters';
import type { Control } from 'react-hook-form';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

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

  const { data: sheltersData } = useShelters();

  const formattedType =
    donationType === 'foundation'
      ? 'Finančný príspevok celej nadácii'
      : 'Príspevok konkrétnemu útulku';

  const shelterLabel = shelterId
    ? (sheltersData?.shelters.find((s) => String(s.id) === shelterId)?.name ?? '—')
    : '—';
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
