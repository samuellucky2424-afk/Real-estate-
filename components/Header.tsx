
import React, { useState } from 'react';
import { HomeIcon, MenuIcon, XIcon } from './icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Properties', href: '#properties' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About', href: '#about' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2">
            <HomeIcon className="h-8 w-8 text-brand-blue" />
            <span className="text-2xl font-serif font-bold text-brand-blue">Luxe Properties</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-600 hover:text-brand-blue font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center">
            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hidden md:inline-block bg-brand-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Contact Agent
            </a>
            <div className="md:hidden ml-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)} 
                className="text-slate-600 hover:text-brand-blue font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="bg-brand-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Contact Agent
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;