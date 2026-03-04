'use client';

import { Button } from '@mantine/core';
import { useRef } from 'react';
import classes from './AmountPicker.module.css';

const PRESETS = [5, 10, 20, 30, 50, 100];

interface AmountPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export function AmountPicker({ value, onChange }: AmountPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    onChange(raw === '' ? 0 : parseInt(raw, 10));
  };

  return (
    <div className={classes.wrapper}>
      {/* Large editable amount display */}
      <div className={classes.amountDisplay}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className={classes.amountInput}
          value={value || ''}
          onChange={handleInputChange}
          placeholder="0"
          aria-label="Suma príspevku v eurách"
        />
        <span className={classes.currency}>€</span>
      </div>

      {/* Preset amount buttons */}
      <div className={classes.presets}>
        {PRESETS.map((preset) => (
          <Button
            key={preset}
            size="sm"
            radius="xl"
            variant={value === preset ? 'filled' : 'default'}
            onClick={() => {
              onChange(preset);
              inputRef.current?.focus();
            }}
            aria-label={`${preset} eur`}
          >
            {preset} €
          </Button>
        ))}
      </div>
    </div>
  );
}
