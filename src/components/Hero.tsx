import React, { useState, useEffect } from 'react';
import { Dog, Cat } from 'lucide-react';
import { scrollToElement } from '../lib/utils/scroll';
import LOGO_URL from './logo.png';

const ILLUSTRATION_URL = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=800&fit=crop';
const BOOKING_FORM_URL = 'https://forms.gle/3Yp2Nb6NZ4zPov5r8';

export default function Hero() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [illustrationLoaded, setIllustrationLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      // Preload logo
      const logoImg = new Image();
      logoImg.onload = () => {
        setLogoLoaded(true);
        setLogoError(false);
      };
      logoImg.onerror = () => {
        console.error('Failed to load logo');
        setLogoError(true);
        setLogoLoaded(false);
      };
      logoImg.src = LOGO_URL;

      // Preload illustration
      const illImg = new Image();
      illImg.onload = () => setIllustrationLoaded(true);
      illImg.onerror = () => console.error('Failed to load illustration');
      illImg.src = ILLUSTRATION_URL;
    };

    preloadImages();
  }, []);

  const handlePricingClick = () => {
    scrollToElement('#services .bg-white.rounded-xl.shadow-lg');
  };

  const handleServicesClick = () => {
    scrollToElement('#services');
  };

  return (
    <div className="relative min-h-[90vh] bg-gradient-hero overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {illustrationLoaded ? (
          <img
            src={ILLUSTRATION_URL}
            alt="Pet Care Illustration"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-8">
                <Dog className="w-24 h-24 text-primary-300" />
                <Cat className="w-24 h-24 text-primary-300" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 to-primary-800/90"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              {logoLoaded && !logoError ? (
                <img 
                  src={LOGO_URL}
                  alt="Little Paws JAX"
                  className="w-full h-full rounded-full border-4 border-white/20 shadow-2xl object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '';
                    target.className = 'h-full w-full flex items-center justify-center bg-primary-100';
                    const icon = document.createElement('div');
                    icon.className = 'text-primary-500';
                    target.parentNode?.appendChild(icon);
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-primary-200 animate-pulse flex items-center justify-center">
                  <Dog className="w-12 h-12 text-primary-400" />
                </div>
              )}
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            Your Pet's Home Away From Home
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-white mb-8 bg-primary-900/60 p-4 rounded-lg inline-block animate-slide-up animate-delay-200 backdrop-blur-sm">
            Skip the Big Guys, Choose the Big Hearts at Little Paws!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale animate-delay-300">
            <a 
              href={BOOKING_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Book Now
            </a>
            
            <button 
              onClick={handlePricingClick}
              className="flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Check Pricing
            </button>
            
            <button 
              onClick={handleServicesClick}
              className="flex items-center justify-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-800 border-2 border-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Services
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}