import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, PawPrint } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import MobileNav from './MobileNav';
import { handleNavigation } from '../lib/utils/scroll';

interface NavigationProps {
  user: User | null;
  logoUrl: string;
}

export default function Navigation({ user, logoUrl }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', href: '/', label: 'Home' },
    { id: 'services', href: '/#services', label: 'Services' },
    { id: 'pricing', href: '/#pricing', label: 'Pricing' },
    { id: 'contact', href: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={logoUrl}
                  alt="Little Paws JAX"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '';
                    target.className = 'h-full w-full flex items-center justify-center bg-primary-100';
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg class="w-6 h-6 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
                    target.parentNode?.appendChild(icon);
                  }}
                />
              </div>
              <span className={`font-bold text-lg ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Little Paws JAX
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isScrolled
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-600 hover:bg-white/90'
                  }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-600 hover:bg-white/90'
                  }`}
                >
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logoUrl={logoUrl}
        navLinks={navLinks}
      />
    </>
  );
}