import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  Info,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { calculateServicePrice, SERVICE_RATES } from '../lib/pricing';
import { getHolidayPeriod } from '../lib/holidays';
import BookingButton from './BookingButton';

const BOOKING_FORM_URL = 'https://forms.gle/3Yp2Nb6NZ4zPov5r8';

export interface CalculatedPrice {
  serviceType: keyof typeof SERVICE_RATES;
  startDate: string;
  endDate: string;
  numPets: number;
  isPuppy: boolean;
  includeGrooming: boolean;
  priceBreakdown?: ReturnType<typeof calculateServicePrice>;
}

export default function PricingCalculator() {
  const [serviceType, setServiceType] =
    useState<keyof typeof SERVICE_RATES>('boarding');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numPets, setNumPets] = useState(1);
  const [isPuppy, setIsPuppy] = useState(false);
  const [includeGrooming, setIncludeGrooming] = useState(false);

  const priceBreakdown =
    startDate && endDate
      ? calculateServicePrice({
          serviceType,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          numPets,
          isPuppy,
          includeGrooming,
        })
      : null;

  const holidayPeriod = startDate
    ? getHolidayPeriod(new Date(startDate))
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Price Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) =>
              setServiceType(e.target.value as keyof typeof SERVICE_RATES)
            }
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="boarding">Pet Boarding</option>
            <option value="dropIn30">Drop-in Visit (30 min)</option>
            <option value="dropIn60">Drop-in Visit (60 min)</option>
            <option value="catCare">Cat Care</option>
            <option value="dayCare">Doggy Day Care</option>
            <option value="walking">Dog Walking</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Pets
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={numPets}
            onChange={(e) => setNumPets(parseInt(e.target.value))}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPuppy}
            onChange={(e) => setIsPuppy(e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">
            Puppy Rate (under 1 year)
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeGrooming}
            onChange={(e) => setIncludeGrooming(e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">
            Include Bathing (+$50/pet)
          </span>
        </label>
      </div>

      {holidayPeriod && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <p className="font-medium">Holiday Period: {holidayPeriod.name}</p>
            <p>Additional holiday rate of $15.00 per service will apply.</p>
          </div>
        </div>
      )}

      {priceBreakdown && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Price Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${priceBreakdown.basePrice.toFixed(2)}</span>
            </div>
            {priceBreakdown.holidayFee > 0 && (
              <div className="flex justify-between text-yellow-700">
                <span>Holiday Fee:</span>
                <span>+${priceBreakdown.holidayFee.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.additionalPetFee > 0 && (
              <div className="flex justify-between">
                <span>Additional Pet Fee:</span>
                <span>+${priceBreakdown.additionalPetFee.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.puppyFee > 0 && (
              <div className="flex justify-between">
                <span>Puppy Rate:</span>
                <span>+${priceBreakdown.puppyFee.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.groomingFee > 0 && (
              <div className="flex justify-between">
                <span>Grooming Fee:</span>
                <span>+${priceBreakdown.groomingFee.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.extendedCareFee > 0 && (
              <div className="flex justify-between">
                <span>Extended Care Fee:</span>
                <span>+${priceBreakdown.extendedCareFee.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 font-semibold text-primary-600 flex justify-between">
              <span>Total:</span>
              <span>${priceBreakdown.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <a
        href={BOOKING_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Continue to Booking
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}
