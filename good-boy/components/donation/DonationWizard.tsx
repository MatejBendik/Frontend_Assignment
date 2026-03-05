'use client';

import { useState } from 'react';
import { Group, Transition, Box, Stack } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DonationStepper } from './DonationStepper';
import { Step1Project } from './steps/Step1Project';
import { Step2Personal } from './steps/Step2Personal';
import { Step3Confirm } from './steps/Step3Confirm';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import {
  donationSchema,
  STEP_FIELDS,
  type DonationFormValues,
} from '@/lib/validation/donationSchema';

const TOTAL_STEPS = 3;

export function DonationWizard() {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(true);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationType: 'foundation',
      shelterId: null,
      amount: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneCountry: '+421',
      phoneNumber: '',
      consent: false as unknown as true,
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const { control, trigger, handleSubmit, getValues } = form;

  const goTo = (next: number) => {
    setMounted(false);
    setTimeout(() => {
      setStep(next);
      setMounted(true);
    }, 150);
  };

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);

    // Cross-field: enforce shelter selection when donationType is 'shelter'
    if (step === 0) {
      const { donationType, shelterId } = getValues();
      if (donationType === 'shelter' && (!shelterId || shelterId === '')) {
        form.setError('shelterId', { message: 'Vyberte útulok zo zoznamu' });
        return;
      }
    }

    if (valid && step < TOTAL_STEPS - 1) goTo(step + 1);
  };

  const handleBack = () => {
    if (step > 0) goTo(step - 1);
  };

  const onSubmit = (data: DonationFormValues) => {
    const phone = data.phoneNumber
      ? `${data.phoneCountry}${data.phoneNumber}`.replace(/\s+/g, '')
      : undefined;

    const payload = {
      contributors: [
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          ...(phone && { phone }),
        },
      ],
      ...(data.shelterId && { shelterID: Number(data.shelterId) }),
      value: data.amount,
    };

    // eslint-disable-next-line no-console
    console.log('Form submitted:', payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={40}>
        <DonationStepper currentStep={step} />

        <Transition mounted={mounted} transition="fade" duration={200} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              {step === 0 && <Step1Project control={control} />}
              {step === 1 && <Step2Personal control={control} />}
              {step === 2 && <Step3Confirm control={control} values={getValues()} />}
            </Box>
          )}
        </Transition>

        {/* Navigation buttons */}
        <Group justify="space-between">
          <SecondaryButton
            onClick={handleBack}
            disabled={step === 0}
            style={step === 0 ? { visibility: 'hidden' } : undefined}
            type="button"
          >
            Späť
          </SecondaryButton>

          {step < TOTAL_STEPS - 1 ? (
            <PrimaryButton onClick={handleNext} type="button">
              Pokračovať
            </PrimaryButton>
          ) : (
            <PrimaryButton type="submit" showArrow={false}>
              Odoslať formulár
            </PrimaryButton>
          )}
        </Group>
      </Stack>
    </form>
  );
}
