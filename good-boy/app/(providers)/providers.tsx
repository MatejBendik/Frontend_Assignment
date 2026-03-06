"use client";

import { MantineProvider, createTheme, Input } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query/queryClient";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  primaryColor: "violet",
  defaultRadius: "md",
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: "filled",
        size: "xl",
      },
      styles: {
        input: {
          fontSize: "16px",
          fontWeight: 400,
          height: "56px",
          minHeight: "56px",
        },
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
      styles: {
        label: {
          fontSize: "14px",
          fontWeight: 500,
        },
        error: {
          fontSize: "14px",
        },
      },
    }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="bottom-right" />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
