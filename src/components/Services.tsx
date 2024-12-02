import React, { useState } from 'react';
import { DogIcon, HomeIcon, Clock, CalendarDays, SunMedium, ShieldCheck, DollarSignIcon, CameraIcon, Syringe, Heart, Activity, ChevronDown, ChevronRight } from 'lucide-react';
import PricingCalculator from './PricingCalculator';
import ServiceRates from './ServiceRates';

const services = [
  {
    icon: DogIcon,
    title: 'Dog Walking',
    basePrice: 25,
    description: 'Professional, attentive walks tailored to your dog\'s needs'
  },
  {
    icon: HomeIcon,
    title: 'Pet Boarding',
    basePrice: 40,
    description: 'Cozy, home-like environment for overnight stays'
  },
  {
    icon: Clock,
    title: 'Drop-in Visits',
    basePrice: 22,
    description: '30-min ($22) or 1-hour ($35) visits for feeding and play'
  },
  {
    icon: SunMedium,
    title: 'Pet Day Care',
    basePrice: 35,
    description: 'Full day of supervised fun and socialization'
  },
  {
    icon: Syringe,
    title: 'Medication Administration',
    description: 'Experienced in oral and injected medications',
    customPrice: true
  },
  {
    icon: Heart,
    title: 'Senior & Special Needs',
    description: 'Specialized care for elderly and special needs pets',
    customPrice: true
  }
];

export default function Services() {
  const [showHolidayRates, setShowHolidayRates] = useState(false);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Pet Care Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced, reliable pet care in Jacksonville with over 12 years of expertise in dog walking, pet sitting, and specialized care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <service.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              {!service.customPrice && (
                <p className="text-purple-600 font-bold text-2xl mb-3">
                  From ${service.basePrice}
                </p>
              )}
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="space-y-12">
          {/* Holiday Rate Notice */}
          <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowHolidayRates(!showHolidayRates)}
              className="w-full px-4 py-3 flex items-center justify-between text-red-800 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                {showHolidayRates ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                <span className="font-medium">Holiday Rates (+$15.00) - Click for dates</span>
              </div>
            </button>
            
            {showHolidayRates && (
              <div className="px-4 py-3 border-t border-red-200 bg-white/50">
                <p className="text-sm text-red-800">
                  Holiday rates apply during:
                  <br />
                  • AUG 30-SEP 2, 2024 (Labor Day)
                  <br />
                  • NOV 28-DEC 1, 2024 (Thanksgiving)
                  <br />
                  • DEC 21-JAN 1, 2025 (Christmas & New Year)
                  <br />
                  • JAN 17-20, 2025 (MLK Weekend)
                  <br />
                  • FEB 14-17, 2025 (Valentine's Weekend)
                  <br />
                  • MAY 23-26, 2025 (Memorial Day)
                  <br />
                  • JUN 19-22, 2025 (Juneteenth)
                  <br />
                  • JUL 4-6, 2025 (Independence Day)
                  <br />
                  • AUG 29-SEP 1, 2025 (Labor Day)
                </p>
              </div>
            )}
          </div>

          {/* Pricing Calculator */}
          <PricingCalculator />

          {/* Service Rates */}
          <ServiceRates />
        </div>
      </div>
    </section>
  );
}