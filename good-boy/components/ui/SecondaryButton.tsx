import { Button, type ButtonProps } from "@mantine/core";
import { ArrowNarrowLeft } from "@/components/icons/ArrowNarrowLeft";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface SecondaryButtonProps
  extends
    ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, keyof ButtonProps> {
  children: ReactNode;
  showArrow?: boolean;
}

export function SecondaryButton({
  children,
  showArrow = true,
  style,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      size="xl"
      radius="md"
      variant="filled"
      color="gray.1"
      c="dark"
      style={{
        fontSize: "16px",
        fontWeight: 500,
        border: "none",
        ...style,
      }}
      leftSection={showArrow ? <ArrowNarrowLeft size={18} /> : undefined}
      {...props}
    >
      {children}
    </Button>
  );
}
