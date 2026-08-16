import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart as PieIcon, 
  ListTodo, 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Flame, 
  Activity, 
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { 
  ROADMAP_DATA, 
  INVESTOR_PACKAGES_DATA, 
  USE_OF_FUNDS_DATA, 
  RISK_FACTORS_DATA, 
  SALES_DEALS_DATA 
} from '../data';
import InteractiveCalculator from './InteractiveCalculator';

interface InvestorPortalProps {
  onOpenInquiry: (type: 'general' | 'investor', tier?: string, amount?: number) => void;
  onViewChange: (view: 'website' | 'portal') => void;
}

export default function InvestorPortal({ onOpenInquiry, onViewChange }: InvestorPortalProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeRiskTab, setActiveRiskTab] = useState<'all' | 'risks' | 'protections'>('all');

  const SEED_TARGET = 150000;
  const SEED_COMMITTED = 95000; // Mock committed capital to date
  const SEED_REMAINING = SEED_TARGET - SEED_COMMITTED;
  const committedPercentage = Math.round((SEED_COMMITTED / SEED_TARGET) * 100);

  // Use of Funds data with calculated dollar values
  const fundsData = USE_OF_FUNDS_DATA.map(item => ({
    ...item,
    amount: (SEED_TARGET * item.percentage) / 100
  }));

  // Filtering Risks and Protections
  const filteredRisks = RISK_FACTORS_DATA.filter(item => {
    if (activeRiskTab === 'all') return true;
    if (activeRiskTab === 'risks') return item.type === 'Risk';
    return item.type === 'Protection';
  });

  const handleSelectCalculatorPackage = (tier: string, amount: number) => {
    onOpenInquiry('investor', tier, amount);
  };

  return (
    <div className="bg-transparent text-text-primary min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-16 text-left relative roman-arch-bg">
      
      {/* Thin elegant horizontal architectural boundary lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent-gold/20" />
      <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-accent-gold/10 hidden xl:block" />
      <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-accent-gold/10 hidden xl:block" />

      {/* 1. SEED ROUND OVERVIEW HEADER */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-bg-elevated border border-accent-gold/25 rounded-none overflow-hidden relative roman-border">
          
          {/* Subtle gold decoration bar */}
          <div className="h-1 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]" />
          
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Seed Pitch Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent-gold/5 border border-accent-gold/25 px-3 py-1.5 rounded-none">
                <Flame className="w-4 h-4 text-accent-gold animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-gold font-bold">
                  EXCLUSIVE SEED OPPORTUNITY (SEC. I)
                </span>
              </div>
              
              <h1 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-wide leading-tight italic">
                Atlas MEP Group <br />
                <span className="text-accent-gold not-italic font-bold tracking-tight">Seed Round Dashboard</span>
              </h1>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl font-sans">
                Atlas MEP Group is positioned to capture Illinois public construction contracts through minority certification (BEP), Arsenal BG's commercial HVACR sales pipeline, state small-business set-asides, and government contracting development—delivering strong, risk-adjusted returns to early seed investors.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onOpenInquiry('investor')}
                  className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-display font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-none transition-all duration-150 shadow-md shadow-accent-gold/20 flex items-center gap-2 hover:brightness-110 cursor-pointer border border-[#BF953F]/40"
                >
                  <UserCheck className="w-4 h-4" />
                  Connect with Founder
                </button>
                <button
                  onClick={() => onViewChange('website')}
                  className="bg-black hover:bg-bg-surface-hover text-accent-gold font-mono text-xs uppercase tracking-wider py-3.5 px-6 rounded-none border border-accent-gold/35 hover:border-accent-gold transition-colors cursor-pointer"
                >
                  Return to Contractor Site
                </button>
              </div>
            </div>

            {/* Right Column: Capital Raise Meter */}
            <div className="lg:col-span-5 bg-black/95 p-6 sm:p-8 rounded-none border border-accent-gold/20 space-y-6 relative">
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-accent-gold/30" />
              <div>
                <span className="text-[10px] font-mono text-accent-gold tracking-widest uppercase block">
                  CAPITAL RAISE PROGRESS
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-accent-gold">
                    ${SEED_COMMITTED.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-text-secondary">
                    Target: ${SEED_TARGET.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="w-full h-3 bg-black rounded-none overflow-hidden border border-accent-gold/15">
                  <div 
                    className="h-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]" 
                    style={{ width: `${committedPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-text-muted">
                  <span>{committedPercentage}% Committed</span>
                  <span>${SEED_REMAINING.toLocaleString()} Remaining</span>
                </div>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-line-hairline/60 pt-4 text-xs font-mono">
                <div>
                  <span className="text-text-muted block text-[10px]">MIN INVESTMENT</span>
                  <span className="text-text-primary font-bold mt-1 block">$5,000 USD</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">INVESTMENT TIER</span>
                  <span className="text-accent-gold font-bold mt-1 block">Equity or Fixed Yield</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. THREE-PHASE GROWTH ROADMAP */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block mb-2">
            BUSINESS DEVELOPMENT TIMELINE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
            Three-Phase Growth Roadmap
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            We hold a clear, sequential path to transition from Year 1 private pipelines to high-win-rate public state contracts in Illinois.
          </p>
        </div>

        {/* Phase Timeline Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ROADMAP_DATA.map((step, index) => {
            const isActive = activePhaseIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActivePhaseIndex(index)}
                className={`p-5 rounded border text-left transition-all duration-300 relative cursor-pointer ${
                  isActive 
                    ? 'bg-brand-steel border-accent-gold ring-1 ring-accent-gold' 
                    : 'bg-bg-elevated border-line-hairline hover:bg-bg-surface-hover hover:border-text-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-accent-gold font-bold uppercase tracking-wider">
                    {step.phase}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted">
                    {step.timeline}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-text-primary mt-2">
                  {step.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Phase Detail Display */}
        <div className="bg-bg-surface border border-line-hairline rounded p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhaseIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-hairline/60 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider block font-bold">
                    ACTIVE OBJECTIVE
                  </span>
                  <p className="text-sm text-text-primary font-display font-medium mt-1">
                    {ROADMAP_DATA[activePhaseIndex].objective}
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-1.5 bg-bg-base px-3 py-1 border border-line-hairline rounded text-xs font-mono text-text-secondary">
                  <Activity className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
                  {ROADMAP_DATA[activePhaseIndex].timeline}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-3 font-bold">
                  KEY ACTION DELIVERABLES
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROADMAP_DATA[activePhaseIndex].bulletPoints.map((bp, idx) => (
                    <div key={idx} className="p-4 bg-bg-elevated/40 border border-line-hairline/60 rounded flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border border-accent-gold/20">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                        {bp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. USE OF SEED FUNDS */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block mb-2">
            FINANCIAL DEPLOYMENT
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
            Use of Seed Funds
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Where your capital is deployed to maximize contracting margin and expedite the 30-day state payment cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Recharts Pie Chart */}
          <div className="lg:col-span-5 bg-bg-elevated border border-line-hairline rounded p-6 flex flex-col items-center justify-center self-stretch min-h-[380px]">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-4 self-start font-bold">
              CAPITAL DISTRIBUTION (%)
            </span>

            <div className="w-full h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="percentage"
                  >
                    {fundsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1B212B', 
                      borderColor: '#2E3746',
                      borderRadius: '4px',
                      color: '#EDEEF2',
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: '11px'
                    }} 
                    formatter={(value: any, name: any, props: any) => [
                      `${value}% ($${props.payload.amount.toLocaleString()})`, 
                      props.payload.label
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Absolute Center Circle Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono text-text-muted uppercase">SEED TARGET</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-text-primary">$150,000</span>
                <span className="text-[9px] font-mono text-accent-gold mt-1 uppercase">100% Capitalized</span>
              </div>
            </div>

            {/* Micro Legends */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2 border-t border-line-hairline/40 pt-4 w-full">
              {fundsData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[10px] font-mono text-text-secondary">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span>{item.label} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bento List of Categories with Descriptions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundsData.map((item, index) => (
              <div 
                key={index} 
                className="bg-bg-surface border border-line-hairline p-5 rounded space-y-2 hover:border-accent-gold/20 transition-all duration-150"
              >
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-1 bg-bg-base border border-line-hairline text-text-primary px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.percentage}% Allocation
                  </span>
                  <span className="font-mono text-xs font-bold text-accent-gold">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
                
                <h4 className="font-display font-semibold text-text-primary text-sm">
                  {item.label}
                </h4>
                <p className="text-xs text-text-secondary font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. DYNAMIC ROI CALCULATOR */}
      <div className="max-w-7xl mx-auto space-y-8 border-t border-line-hairline pt-16">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block mb-2">
            INVESTOR PACKAGES & SIMULATOR
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
            Investor Package Modeling
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Choose the package size that fits your capital. Select from low-risk fixed yields or shadow equity growth shares.
          </p>
        </div>

        <InteractiveCalculator onSelectPackage={handleSelectCalculatorPackage} />
      </div>

      {/* 5. RISK FACTORS AND PROTECTIONS CHECKLIST */}
      <div className="max-w-7xl mx-auto space-y-8 border-t border-line-hairline pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block mb-2">
              RISK ASSESSMENTS & GOVERNANCE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
              Risk Factors & Investor Protections
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Atlas believes in absolute professional transparency. Review how we manage early-stage risks.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex bg-bg-surface p-1 rounded border border-line-hairline shrink-0">
            <button
              onClick={() => setActiveRiskTab('all')}
              className={`py-1 px-2.5 text-xs font-semibold rounded ${
                activeRiskTab === 'all' ? 'bg-brand-steel text-text-primary' : 'text-text-secondary'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveRiskTab('risks')}
              className={`py-1 px-2.5 text-xs font-semibold rounded ${
                activeRiskTab === 'risks' ? 'bg-[#D9534F]/20 text-red-400 border border-[#D9534F]/30' : 'text-text-secondary'
              }`}
            >
              Risks
            </button>
            <button
              onClick={() => setActiveRiskTab('protections')}
              className={`py-1 px-2.5 text-xs font-semibold rounded ${
                activeRiskTab === 'protections' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-text-secondary'
              }`}
            >
              Protections
            </button>
          </div>
        </div>

        {/* Bento Grid layout of filtered risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRisks.map((item, index) => {
            const isRisk = item.type === 'Risk';
            return (
              <div 
                key={index} 
                className={`p-5 rounded border flex flex-col justify-between space-y-4 ${
                  isRisk 
                    ? 'bg-[#D9534F]/5 border-red-500/20' 
                    : 'bg-green-500/5 border-green-500/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                    isRisk ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {item.type}
                  </span>
                  
                  {isRisk ? (
                    <ShieldAlert className="w-4 h-4 text-red-400/80" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-green-400/80" />
                  )}
                </div>

                <div className="space-y-1 text-left">
                  <h4 className="font-display font-bold text-sm text-text-primary leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
