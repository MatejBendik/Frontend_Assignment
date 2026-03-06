"use client";

import { IconCheck } from "@tabler/icons-react";
import classes from "./DonationStepper.module.css";

const STEPS = [
  { label: "Výber útulku" },
  { label: "Osobné údaje" },
  { label: "Potvrdenie" },
];

interface DonationStepperProps {
  currentStep: number;
}

export function DonationStepper({ currentStep }: DonationStepperProps) {
  return (
    <nav className={classes.stepper} aria-label="Kroky formulára">
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
                {isCompleted ? <IconCheck size={16} /> : index + 1}
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
            {index < STEPS.length - 1 && (
              <div
                className={`${classes.connector} ${
                  index < currentStep
                    ? classes.connectorActive
                    : classes.connectorInactive
                }`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
