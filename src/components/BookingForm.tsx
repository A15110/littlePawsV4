import React from 'react';
import { X } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingForm({ isOpen, onClose }: BookingFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-gray-900">Book a Service</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSc9zKFc3z_1dAe44mcspxTI7shjy5lupct76m9T3sSboikOHw/viewform?embedded=true" 
              width="100%" 
              height="800" 
              frameBorder="0" 
              className="mx-auto"
            >
              Loading...
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}