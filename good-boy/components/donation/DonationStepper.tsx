"use client";

import { useTranslation } from "react-i18next";
import { CheckIcon } from "@/components/icons/CheckIcon";
import classes from "./DonationStepper.module.css";

interface DonationStepperProps {
  currentStep: number;
}

export function DonationStepper({ currentStep }: DonationStepperProps) {
  const { t } = useTranslation();

  const STEPS = [
    { label: t("stepper.shelterSelection") },
    { label: t("stepper.personalData") },
    { label: t("stepper.confirmation") },
  ];

  return (
    <nav className={classes.stepper} aria-label={t("stepper.ariaLabel")}>
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step.label} style={{ display: "contents" }}>
            <div className={classes.step}>
              <div
                className={`${classes.stepCircle} ${
                  isCompleted
                    ? classes.stepCircleCompleted
                    : isActive
                      ? classes.stepCircleActive
                      : classes.stepCircleInactive
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? <CheckIcon size={16} /> : index + 1}
              </div>
              <span
                className={`${classes.stepLabel} ${
                  isActive
                    ? `${classes.stepLabelActive} ${classes.stepLabelCurrent}`
                    : isCompleted
                      ? classes.stepLabelActive
                      : classes.stepLabelInactive
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {index < STEPS.length - 1 && <div className={classes.connector} />}
          </div>
        );
      })}
    </nav>
  );
}
