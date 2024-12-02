import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import BookingButton from './BookingButton';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary-900">Get in Touch</h2>
          <p className="text-gray-600 text-center mb-12">
            We'd love to hear from you! Contact us for any questions or concerns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primary-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a 
                    href="mailto:LittlePawsJax@gmail.com" 
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    LittlePawsJax@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/littlepawsjax" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@littlepawsJAX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-8 h-8 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <BookingButton 
                className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors bg-primary-600 hover:bg-primary-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}