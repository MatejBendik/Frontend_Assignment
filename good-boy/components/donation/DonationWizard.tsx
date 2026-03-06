"use client";

import { useEffect, useState, useRef } from "react";
import { Group, Box, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
  const [fadeIn, setFadeIn] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

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
  const isMobile = useMediaQuery("(max-width: 48em)");

  const goTo = (next: number) => {
    // Lock content height so layout doesn't shift during transition
    if (contentRef.current) {
      contentRef.current.style.minHeight = `${contentRef.current.offsetHeight}px`;
    }
    setFadeIn(false);
    setTimeout(() => {
      setStep(next);
      setPersistedStep(next);
      window.scrollTo({ top: 0 });
      // Release locked height after step change
      if (contentRef.current) {
        contentRef.current.style.minHeight = "";
      }
      setFadeIn(true);
      // Move focus to the step heading so keyboard/screen-reader users start at the top
      requestAnimationFrame(() => {
        const heading =
          contentRef.current?.querySelector<HTMLElement>("h1, h2, h3");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus();
        }
      });
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Box style={{ flex: 1 }}>
        <Stack gap={40}>
          <DonationStepper currentStep={step} />

          <Box
            ref={contentRef}
            style={{
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
          >
            {step === 0 && <Step1Project control={control} />}
            {step === 1 && <Step2Personal control={control} />}
            {step === 2 && (
              <Step3Confirm control={control} values={getValues()} />
            )}
          </Box>
        </Stack>
      </Box>

      {/* Navigation buttons — always at bottom */}
      <Group justify="space-between" mt={36} mb={36} wrap="nowrap">
        <SecondaryButton
          onClick={handleBack}
          disabled={step === 0}
          style={step === 0 ? { visibility: "hidden" } : undefined}
          type="button"
          size={isMobile ? "compact-xl" : "xl"}
        >
          Späť
        </SecondaryButton>

        {step < TOTAL_STEPS - 1 ? (
          <PrimaryButton
            onClick={handleNext}
            type="button"
            size={isMobile ? "compact-xl" : "xl"}
          >
            Pokračovať
          </PrimaryButton>
        ) : (
          <PrimaryButton
            type="submit"
            showArrow={false}
            size={isMobile ? "compact-xl" : "xl"}
          >
            Odoslať formulár
          </PrimaryButton>
        )}
      </Group>
    </form>
  );
}
