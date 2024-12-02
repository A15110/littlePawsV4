import { z } from 'zod';
import { appendToSheet } from '../google-sheets';

const clientSubmissionSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  clientAddress: z.string().min(5, 'Address is required'),
  petName: z.string().min(1, 'Pet name is required'),
  petType: z.string().min(1, 'Pet type is required'),
  petBreed: z.string().optional(),
  serviceType: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  specialInstructions: z.string().optional(),
  wantPhotos: z.boolean().optional(),
  referralSource: z.string().optional(),
  priceBreakdown: z.object({
    basePrice: z.number(),
    holidayFee: z.number(),
    additionalPetFee: z.number(),
    puppyFee: z.number(),
    groomingFee: z.number(),
    extendedCareFee: z.number(),
    total: z.number()
  }).optional()
});

type ClientSubmission = z.infer<typeof clientSubmissionSchema>;

export async function createClientSubmission(data: ClientSubmission) {
  try {
    // Validate submission data
    const validated = clientSubmissionSchema.parse(data);

    // Append to Google Sheet
    const success = await appendToSheet(validated);
    
    if (!success) {
      throw new Error('Failed to save submission');
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      throw new Error(firstError.message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}