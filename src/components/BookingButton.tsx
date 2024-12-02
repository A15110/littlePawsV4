import React from 'react';
import type { CalculatedPrice } from './PricingCalculator';

const BOOKING_FORM_URL = 'https://forms.gle/3Yp2Nb6NZ4zPov5r8';

interface BookingButtonProps {
  className?: string;
  children?: React.ReactNode;
  initialData?: CalculatedPrice;
}

export default function BookingButton({ className, children }: BookingButtonProps) {
  return (
    <a
      href={BOOKING_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children || 'Book Now'}
    </a>
  );
}