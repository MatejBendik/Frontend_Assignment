'use client';

import { useState } from 'react';
import { Group, Transition, Box, Stack } from '@mantine/core';
import { DonationStepper } from './DonationStepper';
import { Step1Project } from './steps/Step1Project';
import { Step2Personal } from './steps/Step2Personal';
import { Step3Confirm } from './steps/Step3Confirm';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import type { DonationType } from './fields/DonationTypeToggle';

/** Local form state — will be replaced with Zustand + RHF later */
interface WizardState {
  donationType: DonationType;
  shelterId: string | null;
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  consent: boolean;
}

const INITIAL_STATE: WizardState = {
  donationType: 'foundation',
  shelterId: null,
  amount: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneCountry: '+421',
  phoneNumber: '',
  consent: false,
};

const TOTAL_STEPS = 3;

export function DonationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WizardState>(INITIAL_STATE);

  /* Transition state to drive fade animation */
  const [mounted, setMounted] = useState(true);

  const update = <K extends keyof WizardState>(key: K, value: WizardState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* Simple step-level "can continue" checks (UI only) */
  const canNext = (): boolean => {
    if (step === 0) {
      if (form.donationType === 'shelter' && !form.shelterId) return false;
      return form.amount > 0;
    }
    if (step === 1) {
      return form.lastName.trim().length >= 2 && form.email.includes('@');
    }
    if (step === 2) {
      return form.consent;
    }
    return false;
  };

  const goTo = (next: number) => {
    setMounted(false);
    // Wait for exit transition, then switch step
    setTimeout(() => {
      setStep(next);
      setMounted(true);
    }, 150);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) goTo(step + 1);
  };

  const handleBack = () => {
    if (step > 0) goTo(step - 1);
  };

  const handleSubmit = () => {
    // Placeholder — just log for now
    // eslint-disable-next-line no-console
    console.log('Form submitted:', form);
  };

  return (
    <Stack gap={40}>
      <DonationStepper currentStep={step} />

      <Transition mounted={mounted} transition="fade" duration={200} timingFunction="ease">
        {(styles) => (
          <Box style={styles}>
            {step === 0 && (
              <Step1Project
                donationType={form.donationType}
                shelterId={form.shelterId}
                amount={form.amount}
                onDonationTypeChange={(v) => update('donationType', v)}
                onShelterChange={(v) => update('shelterId', v)}
                onAmountChange={(v) => update('amount', v)}
              />
            )}

            {step === 1 && (
              <Step2Personal
                firstName={form.firstName}
                lastName={form.lastName}
                email={form.email}
                phoneCountry={form.phoneCountry}
                phoneNumber={form.phoneNumber}
                onFirstNameChange={(v) => update('firstName', v)}
                onLastNameChange={(v) => update('lastName', v)}
                onEmailChange={(v) => update('email', v)}
                onPhoneCountryChange={(v) => update('phoneCountry', v)}
                onPhoneNumberChange={(v) => update('phoneNumber', v)}
              />
            )}

            {step === 2 && (
              <Step3Confirm
                donationType={form.donationType}
                shelterId={form.shelterId}
                amount={form.amount}
                firstName={form.firstName}
                lastName={form.lastName}
                email={form.email}
                phoneCountry={form.phoneCountry}
                phoneNumber={form.phoneNumber}
                consent={form.consent}
                onConsentChange={(v) => update('consent', v)}
              />
            )}
          </Box>
        )}
      </Transition>

      {/* Navigation buttons */}
      <Group justify="space-between">
        <SecondaryButton
          onClick={handleBack}
          disabled={step === 0}
          style={step === 0 ? { visibility: 'hidden' } : undefined}
        >
          Späť
        </SecondaryButton>

        {step < TOTAL_STEPS - 1 ? (
          <PrimaryButton onClick={handleNext} disabled={!canNext()}>
            Pokračovať
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!canNext()}
            showArrow={false}
          >
            Odoslať formulár
          </PrimaryButton>
        )}
      </Group>
    </Stack>
  );
}
