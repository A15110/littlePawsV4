import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { PriceBreakdown } from './pricing';

interface FormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  petName: string;
  petType: string;
  petBreed?: string;
  serviceType?: string;
  startDate?: string;
  endDate?: string;
  specialInstructions?: string;
  wantPhotos?: boolean;
  referralSource?: string;
  priceBreakdown?: PriceBreakdown;
}

const SPREADSHEET_ID = '1BAz8r4l2mkGrZIee7YchjPEQbX1h4ulqoEMwQTw9Dcg';
const CLIENT_EMAIL = 'lilpaws@littlepaws-442316.iam.gserviceaccount.com';

const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'Address',
  'Pet Name',
  'Pet Type',
  'Pet Breed',
  'Service Type',
  'Start Date',
  'End Date',
  'Special Instructions',
  'Want Photos',
  'Referral Source',
  'Base Price',
  'Holiday Fee',
  'Additional Pet Fee',
  'Puppy Fee',
  'Grooming Fee',
  'Extended Care Fee',
  'Total Price',
  'Status'
];

export async function appendToSheet(formData: FormData) {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: import.meta.env.VITE_GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      throw new Error('Sheet not found');
    }

    // Ensure headers exist
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      await sheet.setHeaderRow(HEADERS);
    }

    // Format dates for better readability
    const formatDate = (dateStr?: string) => {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    // Format currency
    const formatCurrency = (amount?: number) => {
      if (amount === undefined || amount === null) return '';
      return `$${amount.toFixed(2)}`;
    };

    const row = {
      Timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      Name: formData.clientName,
      Email: formData.clientEmail,
      Phone: formData.clientPhone,
      Address: formData.clientAddress,
      'Pet Name': formData.petName,
      'Pet Type': formData.petType,
      'Pet Breed': formData.petBreed || '',
      'Service Type': formData.serviceType || '',
      'Start Date': formatDate(formData.startDate),
      'End Date': formatDate(formData.endDate),
      'Special Instructions': formData.specialInstructions || '',
      'Want Photos': formData.wantPhotos ? 'Yes' : 'No',
      'Referral Source': formData.referralSource || '',
      'Base Price': formatCurrency(formData.priceBreakdown?.basePrice),
      'Holiday Fee': formatCurrency(formData.priceBreakdown?.holidayFee),
      'Additional Pet Fee': formatCurrency(formData.priceBreakdown?.additionalPetFee),
      'Puppy Fee': formatCurrency(formData.priceBreakdown?.puppyFee),
      'Grooming Fee': formatCurrency(formData.priceBreakdown?.groomingFee),
      'Extended Care Fee': formatCurrency(formData.priceBreakdown?.extendedCareFee),
      'Total Price': formatCurrency(formData.priceBreakdown?.total),
      'Status': 'Pending'
    };

    await sheet.addRow(row);
    return true;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    return false;
  }
}