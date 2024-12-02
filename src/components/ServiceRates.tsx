import React from 'react';
import { DollarSign, Clock, Calendar, Info } from 'lucide-react';

export default function ServiceRates() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Service Rates</h2>
      </div>

      <div className="space-y-8">
        {/* Boarding */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pet Boarding</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-primary-600 font-semibold">Base Rate: $40/night</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Holiday Rate: $55/night (+$15)</li>
                  <li>• Additional Pet: +$32/night</li>
                  <li>• Puppy Rate: $55/night</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Extended Care Rates:</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• 2-8 additional hours: +50% of nightly rate</li>
                  <li>• 8+ additional hours: +100% of nightly rate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Drop-in Visits */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop-in Visits</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-primary-600 font-semibold">30-Minute Visit: $22</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Holiday Rate: $37 (+$15)</li>
                  <li>• Additional Dog: +$14</li>
                  <li>• Puppy Rate: $25</li>
                </ul>
              </div>
              <div>
                <p className="text-primary-600 font-semibold">60-Minute Visit: $35</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Holiday Rate: $50 (+$15)</li>
                  <li>• Additional Dog: +$14</li>
                  <li>• Puppy Rate: $38</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Cat Care */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cat Care (in your home)</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-primary-600 font-semibold">Base Rate: $20/visit</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Holiday Rate: $35 (+$15)</li>
              <li>• Additional Cat: +$8</li>
              <li>• 15+ day bookings: $25/visit</li>
            </ul>
          </div>
        </div>

        {/* Day Care */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Doggy Day Care</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-primary-600 font-semibold">Base Rate: $35/day</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Holiday Rate: $50/day (+$15)</li>
              <li>• Additional Dog: +$28</li>
              <li>• Puppy Rate: $39/day</li>
            </ul>
          </div>
        </div>

        {/* Dog Walking */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Dog Walking</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-primary-600 font-semibold">Base Rate: $25/walk</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Holiday Rate: $40/walk (+$15)</li>
              <li>• Additional Dog: +$15</li>
              <li>• Puppy Rate: $28/walk</li>
            </ul>
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Services</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-primary-600 font-semibold">Bathing / Grooming: +$50</p>
          </div>
        </div>

        {/* Holiday Rate Notice */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800">Holiday Rate Information</p>
              <p className="mt-1 text-sm text-yellow-700">
                All services during holiday periods incur an additional fee of $15.00 (fifteen dollars) per service.
                This rate applies to all bookings that include designated holiday dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}