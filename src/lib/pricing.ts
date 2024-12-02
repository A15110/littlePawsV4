import { differenceInHours, differenceInDays, isWithinInterval } from 'date-fns';
import { isHoliday } from './holidays';

export const SERVICE_RATES = {
  boarding: {
    base: 40,
    holiday: 55, // Base + $15 holiday rate
    additionalPet: 32, // Per night for additional pets
    puppy: 55,
    extendedCare: {
      halfDay: 0.5, // 50% of nightly rate
      fullDay: 1.0  // 100% of nightly rate
    }
  },
  dropIn30: {
    base: 22,
    holiday: 37, // Base + $15 holiday rate
    additionalPet: 14, // Per visit for additional pets
    puppy: 25
  },
  dropIn60: {
    base: 35,
    holiday: 50, // Base + $15 holiday rate
    additionalPet: 14, // Per visit for additional pets
    puppy: 38
  },
  catCare: {
    base: 20,
    additionalPet: 8, // Per visit for additional pets
    holiday: 35, // Base + $15 holiday rate
    longTerm: 25 // 15+ days
  },
  dayCare: {
    base: 35,
    holiday: 50, // Base + $15 holiday rate
    additionalPet: 28, // Per day for additional pets
    puppy: 39
  },
  walking: {
    base: 25,
    holiday: 40, // Base + $15 holiday rate
    additionalPet: 15, // Per walk for additional pets
    puppy: 28
  }
};

export const GROOMING_FEE = 50;

interface PriceCalculationParams {
  serviceType: keyof typeof SERVICE_RATES;
  startDate: Date;
  endDate: Date;
  numPets: number;
  isPuppy?: boolean;
  includeGrooming?: boolean;
}

interface PriceBreakdown {
  basePrice: number;
  holidayFee: number;
  additionalPetFee: number;
  puppyFee: number;
  groomingFee: number;
  extendedCareFee: number;
  total: number;
}

export function calculateServicePrice({
  serviceType,
  startDate,
  endDate,
  numPets,
  isPuppy = false,
  includeGrooming = false
}: PriceCalculationParams): PriceBreakdown {
  const rates = SERVICE_RATES[serviceType];
  let basePrice = 0;
  let holidayFee = 0;
  let additionalPetFee = 0;
  let puppyFee = 0;
  let groomingFee = 0;
  let extendedCareFee = 0;

  const isHolidayPeriod = isHoliday(startDate) || isHoliday(endDate);
  const baseRate = isPuppy ? rates.puppy : rates.base;

  if (serviceType === 'boarding') {
    const days = differenceInDays(endDate, startDate) + 1;
    const extraHours = differenceInHours(endDate, startDate) % 24;
    
    // Calculate base boarding price
    basePrice = baseRate * days;

    // Calculate additional pet fee per night
    if (numPets > 1) {
      const additionalPets = numPets - 1;
      additionalPetFee = rates.additionalPet * additionalPets * days;
    }

    // Add holiday fee if applicable
    if (isHolidayPeriod) {
      holidayFee = 15 * days * numPets; // Holiday fee applies to each pet
    }

    // Add extended care fees
    if (extraHours > 2) {
      const extraCharge = baseRate * (extraHours >= 8 ? rates.extendedCare.fullDay : rates.extendedCare.halfDay);
      extendedCareFee = extraCharge * numPets;
    }
  } else if (serviceType === 'catCare') {
    const days = differenceInDays(endDate, startDate) + 1;
    const isLongTerm = days >= 15;
    basePrice = (isLongTerm ? rates.longTerm : rates.base) * days;
    
    // Calculate additional pet fee per visit
    if (numPets > 1) {
      const additionalPets = numPets - 1;
      additionalPetFee = rates.additionalPet * additionalPets * days;
    }
    
    if (isHolidayPeriod) {
      holidayFee = 15 * days * numPets;
    }
  } else {
    // For other services (day care, walking, drop-ins)
    const sessions = differenceInDays(endDate, startDate) + 1;
    basePrice = baseRate * sessions;
    
    // Calculate additional pet fee per session
    if (numPets > 1) {
      const additionalPets = numPets - 1;
      additionalPetFee = rates.additionalPet * additionalPets * sessions;
    }
    
    if (isHolidayPeriod) {
      holidayFee = 15 * sessions * numPets;
    }
  }

  // Add puppy fee if applicable (per session/night)
  if (isPuppy) {
    const sessions = differenceInDays(endDate, startDate) + 1;
    puppyFee = (rates.puppy - rates.base) * sessions * numPets;
  }

  // Add grooming fee if requested (one-time fee per pet)
  if (includeGrooming) {
    groomingFee = GROOMING_FEE * numPets;
  }

  const total = basePrice + holidayFee + additionalPetFee + puppyFee + groomingFee + extendedCareFee;

  return {
    basePrice,
    holidayFee,
    additionalPetFee,
    puppyFee,
    groomingFee,
    extendedCareFee,
    total
  };
}