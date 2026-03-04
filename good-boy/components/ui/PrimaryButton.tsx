import { Button, type ButtonProps } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  showArrow?: boolean;
}

export function PrimaryButton({
  children,
  showArrow = true,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      size="md"
      radius="xl"
      rightSection={showArrow ? <IconArrowRight size={18} /> : undefined}
      {...props}
    >
      {children}
    </Button>
  );
}
