import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DonationFormValues } from '@/lib/validation/donationSchema';

export const INITIAL_FORM_VALUES: DonationFormValues = {
  donationType: 'foundation',
  shelterId: null,
  amount: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneCountry: '+421',
  phoneNumber: '',
  consent: false as unknown as true,
};

interface DonationStore {
  formValues: DonationFormValues;
  step: number;
  setFormValues: (values: Partial<DonationFormValues>) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useDonationStore = create<DonationStore>()(
  persist(
    (set) => ({
      formValues: INITIAL_FORM_VALUES,
      step: 0,
      setFormValues: (values) =>
        set((state) => ({
          formValues: { ...state.formValues, ...values },
        })),
      setStep: (step) => set({ step }),
      reset: () => set({ formValues: INITIAL_FORM_VALUES, step: 0 }),
    }),
    {
      name: 'donation-form',
    },
  ),
);
