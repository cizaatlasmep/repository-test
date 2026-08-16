import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Flame, Cpu, ArrowUpRight, Presentation } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: 'website' | 'portal') => void;
  onOpenInquiry: (type: 'general' | 'investor') => void;
  currentView?: 'website' | 'portal';
}

export default function Footer({ onViewChange, onOpenInquiry, currentView = 'website' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-surface border-t border-accent-gold/25 text-text-primary mt-auto relative z-10 overflow-hidden">
      {/* Background Slate CAD Grid & Ambient Lighting Texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(148, 163, 184, 0.05) 0%, transparent 70%)`
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="1,2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Navigation (Hidden on mobile) */}
          <div className="hidden md:flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
            <h5 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider text-center">
              Navigation
            </h5>
            <ul className="flex flex-col gap-2 text-sm text-text-primary font-normal text-center">
              <li>
                <button 
                  onClick={() => { onViewChange('website'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                  className="hover:text-accent-gold transition-colors duration-150 text-center font-normal cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onViewChange('website'); setTimeout(() => document.getElementById('advantage')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                  className="hover:text-accent-gold transition-colors duration-150 text-center font-normal cursor-pointer"
                >
                  Government Contracting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onViewChange('website'); setTimeout(() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                  className="hover:text-accent-gold transition-colors duration-150 text-center font-normal cursor-pointer"
                >
                  Team Pillars
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
            <h5 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider text-center">
              Direct Contact
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm text-text-primary font-medium text-center items-center">
              <li className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                <span>Headquartered in Chicago, IL</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <a href="tel:+13129182188" className="hover:text-accent-gold transition-colors">
                  +1 (312) 918-2188
                </a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <a href="mailto:ciza@atlasmepgroup.com" className="hover:text-accent-gold transition-colors">
                  ciza@atlasmepgroup.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Invest With Us */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
            <h5 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider text-center">
              Invest With Us
            </h5>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => onOpenInquiry('investor')}
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-bg-surface-hover text-accent-gold font-sans font-bold text-[11px] uppercase tracking-wider py-2 px-3 border border-accent-gold/40 rounded-none transition-colors duration-150 cursor-pointer w-full text-center"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-gold" />
                Request Investor Information
              </button>
              <button
                onClick={() => onViewChange('portal')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-sans font-bold text-[11px] uppercase tracking-wider py-2 px-3 rounded-none transition-all duration-150 shadow-md shadow-accent-gold/20 hover:brightness-110 cursor-pointer w-full text-center"
              >
                <Flame className="w-3.5 h-3.5 text-black" />
                Access To Investor Room
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Motto */}
        <div className="border-t border-line-hairline mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-center sm:text-left">
          <span className="font-display font-bold text-accent-gold text-sm tracking-wide uppercase italic drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            "We Carry The Weight. You Build The Future."
          </span>
          <span className="text-text-primary">
            &copy; {currentYear} Atlas MEP Group. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
