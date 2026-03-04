'use client';

import { Divider, Stack, Text, Title } from '@mantine/core';
import { ConsentCheckbox } from '../fields/ConsentCheckbox';
import { SummaryRow } from '../summary/SummaryRow';
import type { DonationType } from '../fields/DonationTypeToggle';

/** Mock shelter label lookup */
const SHELTER_LABELS: Record<string, string> = {
  '1': 'Mestský útulok, Žilina',
  '2': 'OZ Tuláčik, Bratislava',
  '3': 'Sloboda zvierat, Košice',
  '4': 'Útulok Piešťany',
  '5': 'Psí domov, Banská Bystrica',
};

interface Step3ConfirmProps {
  donationType: DonationType;
  shelterId: string | null;
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
}

export function Step3Confirm({
  donationType,
  shelterId,
  amount,
  firstName,
  lastName,
  email,
  phoneCountry,
  phoneNumber,
  consent,
  onConsentChange,
}: Step3ConfirmProps) {
  const formattedType =
    donationType === 'foundation'
      ? 'Finančný príspevok celej nadácii'
      : 'Príspevok konkrétnemu útulku';

  const shelterLabel = shelterId ? (SHELTER_LABELS[shelterId] ?? '—') : '—';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—';
  const fullPhone =
    phoneNumber ? `${phoneCountry} ${phoneNumber}` : '—';

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

      <ConsentCheckbox checked={consent} onChange={onConsentChange} />
    </Stack>
  );
}
