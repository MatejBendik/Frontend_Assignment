import { ContentLayoutShell } from '@/components/layout/ContentLayoutShell';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <ContentLayoutShell>{children}</ContentLayoutShell>;
}