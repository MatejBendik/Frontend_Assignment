import { z } from 'zod';

const phoneRegex = /^\d{3}\s?\d{3}\s?\d{3}$/;

export const donationSchema = z
  .object({
    donationType: z.enum(['shelter', 'foundation']),
    shelterId: z.string().nullable(),
    amount: z.number().min(1, 'Suma musí byť aspoň 1 €'),
    firstName: z.union([
      z.literal(''),
      z.string().min(2, 'Meno musí mať aspoň 2 znaky').max(20, 'Meno môže mať maximálne 20 znakov'),
    ]),
    lastName: z
      .string()
      .min(2, 'Priezvisko musí mať aspoň 2 znaky')
      .max(30, 'Priezvisko môže mať maximálne 30 znakov'),
    email: z.string().email('Zadajte platnú e-mailovú adresu'),
    phoneCountry: z.enum(['+421', '+420']),
    phoneNumber: z
      .string()
      .min(1, 'Zadajte telefónne číslo')
      .refine(
        (v) => phoneRegex.test(v.trim()),
        'Zadajte platné telefónne číslo',
      ),
    consent: z.literal(true, {
      error: 'Musíte súhlasiť so spracovaním údajov',
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
      message: 'Vyberte útulok zo zoznamu',
      path: ['shelterId'],
    },
  );

export type DonationFormValues = z.infer<typeof donationSchema>;

/** Fields validated per step (used with trigger()) */
export const STEP_FIELDS: (keyof DonationFormValues)[][] = [
  ['donationType', 'shelterId', 'amount'],
  ['firstName', 'lastName', 'email', 'phoneCountry', 'phoneNumber'],
  ['consent'],
];
