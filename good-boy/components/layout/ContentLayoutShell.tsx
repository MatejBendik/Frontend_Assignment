'use client';

import { Container } from '@mantine/core';
import { FooterLinks } from './FooterLinks';

export function ContentLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      size="lg"
      mih="100vh"
      py={{ base: 32, md: 56 }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1 }}>{children}</div>

      <FooterLinks />
    </Container>
  );
}