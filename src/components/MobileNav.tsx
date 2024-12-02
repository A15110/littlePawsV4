import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { handleNavigation } from '../lib/utils/scroll';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  logoUrl: string;
  navLinks: Array<{
    id: string;
    href: string;
    label: string;
  }>;
}

export default function MobileNav({ isOpen, onClose, logoUrl, navLinks }: MobileNavProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-primary-100">
                <img 
                  src={logoUrl}
                  alt="Little Paws JAX"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900">Menu</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    handleNavigation(e, link.id);
                    onClose();
                  }}
                  className="block px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <>
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-primary-50 transition-colors"
                    onClick={onClose}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-base font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 text-base font-medium text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  onClick={onClose}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}