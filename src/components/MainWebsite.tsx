import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Wrench, 
  ShieldAlert, 
  Activity, 
  CheckCircle, 
  Users, 
  Award, 
  Map, 
  DollarSign, 
  ArrowRight, 
  FileText, 
  TrendingUp,
  Cpu,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES_DATA, TEAM_DATA, CERTIFICATIONS_DATA, SALES_DEALS_DATA } from '../data';
import { ServiceItem } from '../types';

interface MainWebsiteProps {
  onViewChange: (view: 'website' | 'portal') => void;
  onOpenInquiry: (type: 'general' | 'investor') => void;
}

export default function MainWebsite({ onViewChange, onOpenInquiry }: MainWebsiteProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  const toggleService = (id: string) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  const toggleCert = (index: number) => {
    setExpandedCert(expandedCert === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary overflow-x-hidden relative roman-arch-bg">
      
      {/* Thin elegant architectural horizontal boundary lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent-gold/20" />
      
      {/* Decorative simplistic Roman Pillars on the screen edges */}
      <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-accent-gold/10 hidden xl:block" />
      <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-accent-gold/10 hidden xl:block" />

      {/* 1. HERO SECTION WITH BLUEPRINT BACKGROUND & TRUST STATS */}
      <section className="relative flex md:items-center items-start pt-6 sm:pt-10 md:pt-20 lg:pt-24 pb-12 md:pb-20 md:min-h-[85vh] overflow-hidden">
        {/* Background Image with elegant overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.95) 90%), url('/src/assets/images/atlas_hero_bg_1783644829309.jpg')` 
          }}
          role="img"
          aria-label="Atlas MEP Group HVACR blueprint high-tech background"
        />
        
        {/* Schematic spine signature lines - Roman Pillar style */}
        <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-accent-gold/25 hidden lg:block">
          <div className="absolute top-[8%] -left-[4px] w-2 h-2 bg-accent-gold rotate-45 border border-black" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto py-4 sm:py-6 md:py-12">
            
            {/* Core Positioning Copy */}
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-accent-gold/5 border border-accent-gold/25 px-3.5 py-1.5 md:px-4 md:py-2 rounded-none">
                <span className="w-1.5 h-1.5 bg-accent-gold rounded-full pulse-slow" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-gold font-bold">
                  ILLINOIS LICENSED MEP CONTRACTOR
                </span>
              </div>
              
              <h1 className="font-display font-normal text-3xl sm:text-5xl lg:text-6xl text-text-primary leading-[1.15] tracking-wide italic">
                Single-Source Accountability. <br />
                <span className="text-accent-gold not-italic font-bold tracking-tight">Union-Trained Precision.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed font-sans">
                We manage mechanical, electrical, and plumbing trades under one contract. 
                Our unified approach eliminates contractor finger-pointing, guarantees flawless execution, and keeps high-stakes commercial builds on schedule.
              </p>

              <div className="flex justify-center pt-1 md:pt-2">
                <button
                  onClick={() => onOpenInquiry('general')}
                  className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-display font-bold text-xs uppercase tracking-wider py-3.5 md:py-4 px-8 rounded-none transition-all duration-150 shadow-lg shadow-accent-gold/20 hover:brightness-110 active:scale-95 border border-[#BF953F]/40 cursor-pointer"
                >
                  Request Bidding & Estimation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTINUOUS SECTIONS WRAPPER WITH SUBTLE DARK STEEL & SLATE ARCHITECTURAL TEXTURE */}
      <div className="relative overflow-hidden">
        {/* Subtle Dark Slate Ambient Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(circle at 80% 20%, rgba(148, 163, 184, 0.03) 0%, transparent 60%),
              radial-gradient(circle at 20% 60%, rgba(100, 116, 139, 0.025) 0%, transparent 50%),
              radial-gradient(circle at 70% 85%, rgba(148, 163, 184, 0.03) 0%, transparent 60%)
            `
          }}
        />

        {/* Muted Slate Architectural Micro-Dot & Blueprint Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] select-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Micro Grid 24x24 */}
              <pattern id="mep-slate-fine-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="1,3" />
              </pattern>
              {/* Structural Section Grid 120x120 */}
              <pattern id="mep-slate-major-grid" width="120" height="120" patternUnits="userSpaceOnUse">
                <rect width="120" height="120" fill="url(#mep-slate-fine-grid)" />
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#94A3B8" strokeWidth="0.75" />
                <circle cx="0" cy="0" r="1.5" fill="#CBD5E1" />
                <circle cx="120" cy="0" r="1.5" fill="#CBD5E1" />
                <circle cx="0" cy="120" r="1.5" fill="#CBD5E1" />
                <circle cx="120" cy="120" r="1.5" fill="#CBD5E1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mep-slate-major-grid)" />
          </svg>
        </div>

        {/* 2. SERVICES SECTION */}
        <section id="services" className="relative py-24 border-t border-accent-gold/20">
          {/* Schematic spine signature lines - Roman style */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-accent-gold/25 hidden lg:block">
            <div className="absolute top-[8%] -left-[4px] w-2 h-2 bg-accent-gold rotate-45 border border-black" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-16 text-left">
              <span className="font-mono text-xs text-accent-gold uppercase tracking-[0.2em] block mb-2 font-bold">
                COMPOUNDING COMMERCIAL SUCCESS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
                Unified Services with Unmatched Value
              </h2>
              <p className="text-sm sm:text-base text-text-secondary mt-3">
                Unlike fragmented contractors, we deliver an integrated suite of services, self-performed by our certified field teams. The result, flawless field coordination and reduced risk.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES_DATA.map((service) => {
                const Icon = service.id === 'mep-contracting' ? Wrench :
                             service.id === 'system-design' ? Cpu :
                             service.id === 'equipment-protection' ? BookmarkCheck : Building;
                const isExpanded = expandedService === service.id;

                return (
                  <div 
                    key={service.id}
                    className="bg-bg-elevated/90 backdrop-blur-xs border border-line-hairline hover:border-accent-gold/40 p-6 rounded transition-all duration-300 flex flex-col gap-4 card-glow group cursor-pointer"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-bg-surface border border-line-hairline rounded text-accent-gold group-hover:bg-accent-gold/10 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-text-muted font-bold tracking-widest">
                        {service.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-accent-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Dynamic Accordion list for Service Details */}
                    <div className={`mt-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-60' : 'max-h-0'}`}>
                      <ul className="space-y-2 border-t border-line-hairline/40 pt-3 text-xs text-text-secondary font-mono">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent-gold mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-line-hairline/20">
                      <span className="text-xs font-mono font-semibold text-accent-gold flex items-center gap-1">
                        {isExpanded ? 'Collapse parameters' : 'Expand technical parameters'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-accent-gold" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. CERTIFIED ADVANTAGE (BEP & FEDERAL) */}
        <section id="advantage" className="relative py-24 border-t border-accent-gold/20 bg-bg-elevated/20">
          {/* Schematic spine signature lines */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-accent-gold/25 hidden lg:block">
            <div className="absolute top-[8%] -left-[4px] w-2 h-2 bg-accent-gold rotate-45 border border-black" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl space-y-6 text-left">
              <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block">
                ILLINOIS COMPLIANCE ADVANTAGE
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
                Preferred Partner on Every Illinois Public Build
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Minority certification (BEP) combined with downstate regional underserved advantages unlocks immediately accessible, protected revenue channels in municipal, state, and educational projects.
              </p>

              <div className="space-y-4 pt-2">
                {CERTIFICATIONS_DATA.map((cert, index) => {
                  const isCertExpanded = expandedCert === index;
                  return (
                    <div key={index} className="p-5 bg-bg-surface/60 backdrop-blur-xs border border-line-hairline rounded space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-sm text-text-primary">
                          {cert.title}
                        </h4>
                        <span className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded ${
                          cert.status === 'Active' ? 'bg-green-500/15 text-green-400' : 'bg-accent-gold/15 text-accent-gold'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {cert.description}
                      </p>

                      {/* Desktop View: Always visible bullet points */}
                      <ul className="text-[11px] font-sans text-text-muted space-y-1 pt-2 border-t border-line-hairline/40 hidden md:block">
                        {cert.details.map((det, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <span className="text-accent-gold">•</span>
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Mobile View: Collapsible Dropdown Accordion */}
                      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isCertExpanded ? 'max-h-60 mt-2' : 'max-h-0'}`}>
                        <ul className="text-[11px] font-sans text-text-muted space-y-1 border-t border-line-hairline/40 pt-2">
                          {cert.details.map((det, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <span className="text-accent-gold">•</span>
                              <span>{det}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div 
                        onClick={() => toggleCert(index)}
                        className="md:hidden mt-2 pt-2.5 flex items-center justify-between border-t border-line-hairline/20 cursor-pointer text-xs font-sans font-semibold text-accent-gold"
                      >
                        <span>{isCertExpanded ? 'Collapse details' : 'Expand details'}</span>
                        {isCertExpanded ? <ChevronUp className="w-4 h-4 text-accent-gold" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4. MEET THE PILLARS (TEAM SECTION) */}
        <section id="team" className="relative py-24 border-t border-accent-gold/20">
          {/* Schematic spine signature lines */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-accent-gold/25 hidden lg:block">
            <div className="absolute top-[8%] -left-[4px] w-2 h-2 bg-accent-gold rotate-45 border border-black" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-16 text-left">
              <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block mb-2">
                CONSTRUCTIVE MINDS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
                The Pillars of Your Future Projects
              </h2>
              <p className="text-sm sm:text-base text-text-secondary mt-3">
                We've brought together the best that the industry has to offer: brilliant minds to conceptualize system designs, and dedicated hands to execute trade craftsmanship with union standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM_DATA.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-bg-elevated/90 backdrop-blur-xs border border-line-hairline rounded p-6 sm:p-8 space-y-4 flex flex-col relative overflow-hidden group"
                >
                  {/* Visual Avatar Identifier */}
                  <div className="w-14 h-14 bg-bg-surface border border-line-hairline rounded flex items-center justify-center text-2xl group-hover:border-accent-gold group-hover:bg-accent-gold/5 transition-all duration-300">
                    {member.avatarPlaceholder}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-accent-gold transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs font-mono text-accent-gold font-semibold uppercase tracking-wider block">
                      {member.role}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-text-secondary leading-relaxed space-y-2 flex-grow">
                    <p>{member.description}</p>
                    <p className="border-t border-line-hairline/40 pt-3 text-text-muted italic">
                      {member.background}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
