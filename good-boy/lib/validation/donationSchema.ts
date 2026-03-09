import { z } from 'zod';
import type { TFunction } from 'i18next';

const phoneRegex = /^\d{3}\s?\d{3}\s?\d{3}$/;

export function createDonationSchema(t: TFunction) {
  return z
    .object({
      donationType: z.enum(['shelter', 'foundation']),
      shelterId: z.string().nullable(),
      amount: z.number().min(1, t('validation.amountMin')),
      firstName: z.union([
        z.literal(''),
        z.string().min(2, t('validation.firstNameMin')).max(20, t('validation.firstNameMax')),
      ]),
      lastName: z
        .string()
        .min(2, t('validation.lastNameMin'))
        .max(30, t('validation.lastNameMax')),
      email: z.string().email(t('validation.emailInvalid')),
      phoneCountry: z.enum(['+421', '+420']),
      phoneNumber: z
        .string()
        .min(1, t('validation.phoneRequired'))
        .refine(
          (v) => phoneRegex.test(v.trim()),
          t('validation.phoneInvalid'),
        ),
      consent: z.literal(true, {
        error: t('validation.consentRequired'),
      }),
    })
    .refine(
      (data) => {
        if (data.donationType === 'shelter') {
          return data.shelterId !== null && data.shelterId !== '';
        }
        return true;
      },
      {
        message: t('validation.shelterRequired'),
        path: ['shelterId'],
      },
    );
}

// Keep the static schema for type inference only
const donationSchema = z
  .object({
    donationType: z.enum(['shelter', 'foundation']),
    shelterId: z.string().nullable(),
    amount: z.number(),
    firstName: z.union([z.literal(''), z.string()]),
    lastName: z.string(),
    email: z.string(),
    phoneCountry: z.enum(['+421', '+420']),
    phoneNumber: z.string(),
    consent: z.literal(true),
  });

export type DonationFormValues = z.infer<typeof donationSchema>;

/** Fields validated per step (used with trigger()) */
export const STEP_FIELDS: (keyof DonationFormValues)[][] = [
  ['donationType', 'shelterId', 'amount'],
  ['firstName', 'lastName', 'email', 'phoneCountry', 'phoneNumber'],
  ['consent'],
];
