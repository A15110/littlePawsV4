import { supabase } from '../supabase';
import { sendEmail } from '../email';
import { calculateServicePrice } from '../pricing';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  serviceType: string;
  petName: string;
  petType: string;
  petBreed?: string;
  startDate: string;
  endDate: string;
  specialInstructions?: string;
  wantPhotos: boolean;
  referralSource?: string;
  petCharacteristics: string[];
  incompatibilities: string[];
  size?: string;
  numPets: number;
  isPuppy: boolean;
  includeGrooming: boolean;
  priceBreakdown?: any;
}

export async function createBooking(bookingData: BookingData) {
  try {
    // Get current user or use anonymous context
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userId = user?.id;

    // Calculate final price
    const price = calculateServicePrice({
      serviceType: bookingData.serviceType as any,
      startDate: new Date(bookingData.startDate),
      endDate: new Date(bookingData.endDate),
      numPets: bookingData.numPets,
      isPuppy: bookingData.isPuppy,
      includeGrooming: bookingData.includeGrooming
    });

    // Create client record if new
    const { data: clientData, error: clientError } = await supabase.rpc(
      'create_client_with_pet',
      {
        client_data: {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          address: bookingData.address || '',
          emergency_contact: '',
          emergency_phone: '',
          created_by: userId || '00000000-0000-0000-0000-000000000000'
        },
        pet_data: {
          name: bookingData.petName,
          type: bookingData.petType,
          breed: bookingData.petBreed,
          medical_info: bookingData.specialInstructions,
          behavioral_notes: [
            ...bookingData.petCharacteristics,
            ...bookingData.incompatibilities
          ].join(', '),
          created_by: userId || '00000000-0000-0000-0000-000000000000'
        }
      }
    );

    if (clientError) throw clientError;

    // Create booking record
    const { data: bookingRecord, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        client_id: clientData,
        service_type: bookingData.serviceType,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        status: 'pending',
        total_price: price.total,
        notes: bookingData.specialInstructions,
        created_by: userId || '00000000-0000-0000-0000-000000000000'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Send email notifications
    await Promise.all([
      // Admin notification
      sendEmail({
        to: 'dixonjd1982@gmail.com',
        subject: 'New Booking Request',
        content: `
          New booking request received:
          
          Client: ${bookingData.name}
          Email: ${bookingData.email}
          Phone: ${bookingData.phone}
          
          Service: ${bookingData.serviceType}
          Pet: ${bookingData.petName} (${bookingData.petType})
          Dates: ${bookingData.startDate} to ${bookingData.endDate}
          
          Total Price: $${price.total.toFixed(2)}
          
          Special Instructions: ${bookingData.specialInstructions || 'None'}
          
          View booking details in the admin dashboard to approve or decline.
        `
      }),
      // Client confirmation
      sendEmail({
        to: bookingData.email,
        subject: 'Booking Request Received - Little Paws JAX',
        content: `
          Dear ${bookingData.name},
          
          Thank you for booking with Little Paws JAX! We have received your request for pet care services.
          
          Booking Details:
          - Service: ${bookingData.serviceType}
          - Pet: ${bookingData.petName}
          - Dates: ${bookingData.startDate} to ${bookingData.endDate}
          - Total Price: $${price.total.toFixed(2)}
          
          We will review your booking and contact you shortly to confirm the details.
          
          Best regards,
          Little Paws JAX Team
        `
      })
    ]);

    return bookingRecord;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}