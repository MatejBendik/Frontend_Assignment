"use client";

import { useEffect, useState } from "react";
import { Group, Transition, Box, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DonationStepper } from "./DonationStepper";
import { Step1Project } from "./steps/Step1Project";
import { Step2Personal } from "./steps/Step2Personal";
import { Step3Confirm } from "./steps/Step3Confirm";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useContribute } from "@/lib/query/shelters";
import { useDonationStore, INITIAL_FORM_VALUES } from "@/store/donationStore";
import {
  donationSchema,
  STEP_FIELDS,
  type DonationFormValues,
} from "@/lib/validation/donationSchema";

const TOTAL_STEPS = 3;

export function DonationWizard() {
  const {
    formValues,
    step: persistedStep,
    setFormValues,
    setStep: setPersistedStep,
    reset: resetStore,
  } = useDonationStore();
  const [step, setStep] = useState(persistedStep);
  const [mounted, setMounted] = useState(true);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: formValues,
    mode: "onTouched",
    criteriaMode: "all",
  });

  // Sync form changes to Zustand store
  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormValues(values as Partial<DonationFormValues>);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormValues]);

  // Restore persisted values after Zustand hydration
  useEffect(() => {
    const unsub = useDonationStore.persist.onFinishHydration((state) => {
      form.reset(state.formValues);
      setStep(state.step);
    });

    // If already hydrated (e.g. fast restore), sync immediately
    if (useDonationStore.persist.hasHydrated()) {
      const state = useDonationStore.getState();
      form.reset(state.formValues);
      setStep(state.step);
    }

    return unsub;
  }, [form]);

  const { control, trigger, handleSubmit, getValues } = form;
  const contribute = useContribute();

  const goTo = (next: number) => {
    setMounted(false);
    setTimeout(() => {
      setStep(next);
      setPersistedStep(next);
      setMounted(true);
    }, 150);
  };

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);

    // Cross-field: enforce shelter selection when donationType is 'shelter'
    if (step === 0) {
      const { donationType, shelterId } = getValues();
      if (donationType === "shelter" && (!shelterId || shelterId === "")) {
        form.setError("shelterId", { message: "Vyberte útulok zo zoznamu" });
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
      ? `${data.phoneCountry}${data.phoneNumber}`.replace(/\s+/g, "")
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

    contribute.mutate(payload, {
      onSuccess: (res) => {
        const msg =
          res.messages?.[0]?.message ?? "Príspevok bol úspešne zaznamenaný";
        notifications.show({
          title: "Ďakujeme!",
          message: msg,
          color: "green",
        });
        form.reset(INITIAL_FORM_VALUES);
        resetStore();
        setStep(0);
      },
      onError: () => {
        notifications.show({
          title: "Chyba",
          message: "Nepodarilo sa odoslať príspevok. Skúste to znova.",
          color: "red",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={40}>
        <DonationStepper currentStep={step} />

        <Transition
          mounted={mounted}
          transition="fade"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <Box style={styles}>
              {step === 0 && <Step1Project control={control} />}
              {step === 1 && <Step2Personal control={control} />}
              {step === 2 && (
                <Step3Confirm control={control} values={getValues()} />
              )}
            </Box>
          )}
        </Transition>

        {/* Navigation buttons */}
        <Group justify="space-between">
          <SecondaryButton
            onClick={handleBack}
            disabled={step === 0}
            style={step === 0 ? { visibility: "hidden" } : undefined}
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
