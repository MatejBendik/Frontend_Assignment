"use client";

import { Container } from "@mantine/core";
import { FooterLinks } from "./FooterLinks";

export function ContentLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      size={1280}
      mih="100vh"
      pt={{ base: 32, md: 56 }}
      pb={{ base: 24, md: 24 }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>{children}</div>

      <FooterLinks />
    </Container>
  );
}
