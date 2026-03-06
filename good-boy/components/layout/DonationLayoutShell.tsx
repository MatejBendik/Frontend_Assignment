"use client";

import { Box, Container, Paper } from "@mantine/core";
import { FooterLinks } from "./FooterLinks";
import { useDonationStore } from "@/store/donationStore";

export function DonationLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const step = useDonationStore((s) => s.step);

  return (
    <Container
      size={1440}
      mih="100vh"
      p={{ base: 12, md: 24 }}
      style={{ display: "flex", gap: 24 }}
    >
      {/* Left: white card with form + footer */}
      <Paper
        p={0}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Content area */}
        <Box
          pt={{ base: 24, md: 48 }}
          px={{ base: 24, md: 48 }}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          {children}
        </Box>

        {/* Footer — always pinned at bottom */}
        <Box px={{ base: 24, md: 48 }}>
          <FooterLinks showSocial={step === 0} />
        </Box>
      </Paper>

      {/* Right: separate rounded image */}
      <Box
        visibleFrom="md"
        style={{
          width: "42%",
          flexShrink: 1,
          minWidth: 0,
          borderRadius: "var(--mantine-radius-xl)",
          overflow: "hidden",
          position: "relative",
          minHeight: "calc(100vh - 48px)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/donation-dog.jpg"
          alt="Pes na pláži"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Container>
  );
}
