import { Button, type ButtonProps } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
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
      variant="default"
      style={{ fontSize: "16px", fontWeight: 500, ...style }}
      leftSection={showArrow ? <IconArrowLeft size={18} /> : undefined}
      {...props}
    >
      {children}
    </Button>
  );
}
