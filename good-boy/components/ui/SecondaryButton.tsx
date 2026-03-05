import { Button, type ButtonProps } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface SecondaryButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonProps> {
  children: ReactNode;
  showArrow?: boolean;
}

export function SecondaryButton({
  children,
  showArrow = true,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button
      size="md"
      radius="xl"
      variant="default"
      leftSection={showArrow ? <IconArrowLeft size={18} /> : undefined}
      {...props}
    >
      {children}
    </Button>
  );
}
