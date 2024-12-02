import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { createClient } from '../../lib/api/clients';

interface AddClientFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddClientForm({ onClose, onSuccess }: AddClientFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergency_contact: '',
    emergency_phone: ''
  });

  const [petData, setPetData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    medical_info: '',
    feeding_instructions: '',
    behavioral_notes: ''
  });

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handlePetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createClient(
        clientData,
        {
          ...petData,
          age: parseInt(petData.age) || 0
        }
      );
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error adding client/pet:', err);
      setError(err.message || 'Failed to add client and pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 ? 'Add New Client' : 'Add Pet Information'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form content remains the same */}
          </form>
        </div>
      </div>
    </div>
  );
}