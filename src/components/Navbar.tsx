import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, FlameKindling, Building2, ShieldCheck, Users, LineChart, Home } from 'lucide-react';

interface NavbarProps {
  currentView: 'website' | 'portal';
  onViewChange: (view: 'website' | 'portal') => void;
  onOpenInquiry: (type: 'general' | 'investor') => void;
}

export default function Navbar({ currentView, onViewChange, onOpenInquiry }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId?: string) => {
    setIsMenuOpen(false);
    onViewChange('website');
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePortalClick = () => {
    setIsMenuOpen(false);
    onViewChange('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-accent-gold/20 shadow-xl shadow-black/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-24 sm:h-28">
          
          {/* Desktop Left-Aligned Logo / Mobile Placeholder */}
          <div 
            className="hidden md:flex items-center cursor-pointer group select-none -ml-2" 
            onClick={() => handleNavClick()}
            aria-label="Atlas MEP Group Home"
          >
            <div className="h-20 sm:h-24 md:h-26 w-auto flex items-center justify-start relative">
              <img 
                src="/src/assets/images/atlas_logo_1784081371248.png" 
                alt="Atlas MEP Group Logo" 
                className="h-16 sm:h-20 md:h-22 lg:h-24 w-auto object-contain brightness-115 transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_18px_rgba(212,175,55,0.25)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Mobile Centered Logo (Only visible on mobile screens < md) */}
          <div 
            className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group select-none" 
            onClick={() => handleNavClick()}
            aria-label="Atlas MEP Group Home Mobile"
          >
            <div className="h-20 sm:h-24 w-auto flex items-center justify-center relative">
              <img 
                src="/src/assets/images/atlas_logo_1784081371248.png" 
                alt="Atlas MEP Group Logo" 
                className="h-16 sm:h-20 w-auto object-contain brightness-115 transition-all duration-300 filter drop-shadow-[0_0_18px_rgba(212,175,55,0.25)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <button 
              onClick={() => handleNavClick('services')}
              className="text-base lg:text-lg font-medium text-text-secondary hover:text-accent-gold transition-colors duration-200 cursor-pointer"
            >
              Our Services
            </button>
            <button 
              onClick={() => handleNavClick('advantage')}
              className="text-base lg:text-lg font-medium text-text-secondary hover:text-accent-gold transition-colors duration-200 cursor-pointer"
            >
              Government Contracting
            </button>
            <button 
              onClick={() => handleNavClick('team')}
              className="text-base lg:text-lg font-medium text-text-secondary hover:text-accent-gold transition-colors duration-200 cursor-pointer"
            >
              Team Pillars
            </button>
          </nav>

          {/* Right Side Controls: Desktop CTAs + Mobile 3-Line Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto md:ml-0">
            {/* Desktop CTAs */}
            {currentView === 'portal' ? (
              <button
                onClick={() => onOpenInquiry('investor')}
                className="hidden md:inline-flex items-center gap-2 bg-accent-gold hover:bg-accent-gold-dark text-bg-base font-display font-bold text-sm uppercase tracking-wider py-3.5 px-6 rounded transition-all duration-200 shadow-lg shadow-accent-gold/10 hover:scale-105 cursor-pointer"
              >
                <FlameKindling className="w-4 h-4 animate-pulse" />
                <span>Invest in Atlas</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenInquiry('general')}
                className="hidden md:inline-flex items-center gap-2 bg-transparent border border-accent-gold/50 hover:border-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold text-text-primary font-sans text-sm uppercase tracking-wider py-3.5 px-6 rounded transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-accent-gold" />
                <span>Contact Bidding</span>
              </button>
            )}

            {/* Mobile 3-Line Panel Navigation Button (Hamburger) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-accent-gold hover:text-text-primary bg-bg-surface hover:bg-bg-elevated border border-accent-gold/30 hover:border-accent-gold/60 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center shadow-md active:scale-95"
              aria-label="Toggle Navigation Panel"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-accent-gold" />
              ) : (
                <Menu className="w-6 h-6 text-accent-gold" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Slide-Down Overlay Panel */}
      {isMenuOpen && (
        <div className="border-t border-accent-gold/25 bg-bg-base/98 backdrop-blur-xl shadow-2xl transition-all duration-300 max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Navigation Category 1: Main Site */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-accent-gold uppercase tracking-widest block font-bold border-b border-accent-gold/20 pb-2">
                Primary Navigation
              </span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick()}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:text-accent-gold hover:bg-bg-surface transition-colors text-left cursor-pointer group"
                >
                  <Home className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Main Home</span>
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:text-accent-gold hover:bg-bg-surface transition-colors text-left cursor-pointer group"
                >
                  <Building2 className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Our Services</span>
                </button>
                <button
                  onClick={() => handleNavClick('advantage')}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:text-accent-gold hover:bg-bg-surface transition-colors text-left cursor-pointer group"
                >
                  <ShieldCheck className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Government Contracting</span>
                </button>
                <button
                  onClick={() => handleNavClick('team')}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:text-accent-gold hover:bg-bg-surface transition-colors text-left cursor-pointer group"
                >
                  <Users className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Team Pillars</span>
                </button>
              </div>
            </div>

            {/* Navigation Category 2: Investors & Portal */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-accent-gold uppercase tracking-widest block font-bold border-b border-accent-gold/20 pb-2">
                Investor Relations
              </span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setIsMenuOpen(false); onOpenInquiry('investor'); }}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:text-accent-gold hover:bg-bg-surface transition-colors text-left cursor-pointer group"
                >
                  <FlameKindling className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Request Investor Information</span>
                </button>
                <button
                  onClick={handlePortalClick}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left cursor-pointer group ${
                    currentView === 'portal'
                      ? 'bg-accent-gold/15 text-accent-gold font-bold'
                      : 'text-text-primary hover:text-accent-gold hover:bg-bg-surface'
                  }`}
                >
                  <LineChart className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Access To Investor Room</span>
                </button>
              </div>
            </div>

            {/* Navigation Category 3: Contact & Bidding */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-accent-gold uppercase tracking-widest block font-bold border-b border-accent-gold/20 pb-2">
                Direct Contact
              </span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setIsMenuOpen(false); onOpenInquiry('general'); }}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-text-primary hover:text-accent-gold hover:bg-bg-surface transition-colors text-left cursor-pointer group"
                >
                  <Phone className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span className="font-display font-medium text-base">Commercial Bidding Inquiry</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

