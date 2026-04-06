import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
     { name: 'À propos', path: '/about' },
    { name: 'Caractéristiques', path: '/caracteristiques' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Tarifs', path: '/tarifs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrollY > 50
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 
                          rounded-xl flex items-center justify-center
                          transform group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className={`font-bold text-xl transition-colors duration-300 ${
              scrollY > 50 ? 'text-slate-900' : 'text-white'
            }`}>
             Canada trans
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  scrollY > 50 
                    ? isActive(link.path) 
                      ? 'text-blue-600' 
                      : 'text-slate-700 hover:text-blue-600'
                    : isActive(link.path)
                      ? 'text-white'
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 
                                transition-all duration-300 ${
                                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                       text-white text-sm font-medium rounded-xl
                       hover:shadow-lg hover:shadow-blue-500/25 
                       transform hover:scale-105 transition-all duration-300"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              scrollY > 50
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-slate-200 my-2" />
            <Link
              to="/register"
              className="block w-full text-center px-4 py-2 bg-gradient-to-r 
                       from-blue-600 to-cyan-600 text-white rounded-lg 
                       hover:shadow-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;