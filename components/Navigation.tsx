import React, { useEffect, useState } from 'react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 nav-blend ${
        scrolled 
          ? 'py-3 md:py-4' 
          : 'py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="relative group transition-all duration-300"
            aria-label="Go to top"
          >
            <span className="text-lg md:text-xl font-semibold text-white uppercase tracking-tight">
              MOUVCON
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#work" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#work'); }}
              className="text-sm text-white hover:opacity-70 transition-opacity duration-300 lowercase"
            >
              work
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
              className="text-sm text-white hover:opacity-70 transition-opacity duration-300 lowercase"
            >
              about
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
              className="text-sm text-white hover:opacity-70 transition-opacity duration-300 lowercase"
            >
              contact
            </a>
          </div>

          {/* Mobile Menu Button - Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white transition-all duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed left-0 right-0 bottom-0 bg-neutral-900/98 backdrop-blur-xl transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: scrolled ? '56px' : '64px' }}
      >
        <div className="flex flex-col items-center justify-center min-h-full px-6 py-12 space-y-10">
          <a 
            href="#work" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#work'); }}
            className="text-3xl font-medium text-white hover:text-neutral-400 transition-all duration-300 lowercase"
          >
            work
          </a>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
            className="text-3xl font-medium text-white hover:text-neutral-400 transition-all duration-300 lowercase"
          >
            about
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            className="text-3xl font-medium text-white hover:text-neutral-400 transition-all duration-300 lowercase"
          >
            contact
          </a>
        </div>
      </div>
    </nav>
  );
};