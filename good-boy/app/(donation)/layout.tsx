import { DonationLayoutShell } from '@/components/layout/DonationLayoutShell';

export default function DonationLayout({ children }: { children: React.ReactNode }) {
  return <DonationLayoutShell>{children}</DonationLayoutShell>;
}