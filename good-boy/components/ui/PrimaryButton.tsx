import { Button, type ButtonProps } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface PrimaryButtonProps
  extends
    ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, keyof ButtonProps> {
  children: ReactNode;
  showArrow?: boolean;
}

export function PrimaryButton({
  children,
  showArrow = true,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      size="xl"
      radius="md"
      style={{ fontSize: "16px", fontWeight: 500 }}
      rightSection={showArrow ? <IconArrowRight size={18} /> : undefined}
      {...props}
    >
      {children}
    </Button>
  );
}
