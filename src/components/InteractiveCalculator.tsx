import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Percent, 
  HelpCircle, 
  TrendingUp, 
  Coins, 
  Award,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { INVESTOR_PACKAGES_DATA } from '../data';
import { InvestorPackage } from '../types';

interface InteractiveCalculatorProps {
  onSelectPackage: (tier: string, amount: number) => void;
}

export default function InteractiveCalculator({ onSelectPackage }: InteractiveCalculatorProps) {
  const [selectedPackage, setSelectedPackage] = useState<InvestorPackage>(INVESTOR_PACKAGES_DATA[1]); // Default to Silver
  const [investAmount, setInvestAmount] = useState<number>(25000); // Default to $25k inside Silver range
  const [simulationYearlyRevenue, setSimulationYearlyRevenue] = useState({
    y1: 650000,
    y2: 1400000,
    y3: 2800000,
    y4: 4500000,
    y5: 6800000
  });

  // Map dollar amount ($5,000 to $250,000) to 0-100 slider position percentage across 4 quarters
  const amountToPercent = (amount: number): number => {
    if (amount <= 15000) {
      // Quarter 1 (0% - 25%): $5,000 to $15,000
      const ratio = Math.max(0, Math.min(1, (amount - 5000) / (15000 - 5000)));
      return ratio * 25;
    } else if (amount <= 50000) {
      // Quarter 2 (25% - 50%): $15,000 to $50,000
      const ratio = Math.max(0, Math.min(1, (amount - 15000) / (50000 - 15000)));
      return 25 + ratio * 25;
    } else if (amount <= 100000) {
      // Quarter 3 (50% - 75%): $50,000 to $100,000
      const ratio = Math.max(0, Math.min(1, (amount - 50000) / (100000 - 50000)));
      return 50 + ratio * 25;
    } else {
      // Quarter 4 (75% - 100%): $100,000 to $250,000
      const ratio = Math.max(0, Math.min(1, (amount - 100000) / (250000 - 100000)));
      return 75 + ratio * 25;
    }
  };

  // Map 0-100 slider position percentage to dollar amount
  const percentToAmount = (pct: number): number => {
    let amt = 5000;
    if (pct <= 25) {
      amt = 5000 + (pct / 25) * (15000 - 5000);
    } else if (pct <= 50) {
      amt = 15000 + ((pct - 25) / 25) * (50000 - 15000);
    } else if (pct <= 75) {
      amt = 50000 + ((pct - 50) / 25) * (100000 - 50000);
    } else {
      amt = 100000 + ((pct - 75) / 25) * (250000 - 100000);
    }
    return Math.round(amt / 1000) * 1000;
  };

  // Get matching package for any given dollar amount
  const getPackageForAmount = (amount: number): InvestorPackage => {
    if (amount < 15000) return INVESTOR_PACKAGES_DATA[0]; // Bronze (Q1)
    if (amount < 50000) return INVESTOR_PACKAGES_DATA[1]; // Silver (Q2)
    if (amount < 100000) return INVESTOR_PACKAGES_DATA[2]; // Gold (Q3)
    return INVESTOR_PACKAGES_DATA[3]; // Platinum (Q4)
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = parseFloat(e.target.value) || 0;
    const newAmount = percentToAmount(pct);
    setInvestAmount(newAmount);
    setSelectedPackage(getPackageForAmount(newAmount));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value) || 0;
    val = Math.max(5000, Math.min(250000, val));
    setInvestAmount(val);
    setSelectedPackage(getPackageForAmount(val));
  };

  const handlePackageClick = (pkg: InvestorPackage) => {
    setSelectedPackage(pkg);
    if (pkg.id === 'bronze') {
      setInvestAmount(5000);
    } else if (pkg.id === 'silver') {
      setInvestAmount(25000);
    } else if (pkg.id === 'gold') {
      setInvestAmount(50000);
    } else if (pkg.id === 'platinum') {
      setInvestAmount(100000);
    }
  };

  // Profit Margin assumed for calculation
  const COMPANY_NET_MARGIN = 0.11; // 11% average MEP profit margin

  // Calculate dynamic projected returns over 5 Years
  const calculateProjections = () => {
    const data = [];
    let cumulativeReturns = 0;

    const revenues = [
      simulationYearlyRevenue.y1,
      simulationYearlyRevenue.y2,
      simulationYearlyRevenue.y3,
      simulationYearlyRevenue.y4,
      simulationYearlyRevenue.y5
    ];

    for (let i = 0; i < 5; i++) {
      const year = i + 1;
      let yearlyReturn = 0;

      if (selectedPackage.type === 'Fixed Interest') {
        // Simple Fixed rate per year
        yearlyReturn = investAmount * selectedPackage.rateValue;
      } else {
        // Shadow Equity (Profit Share of Company Net Profits)
        // Profit share is linked to selected package share percentage.
        // E.g. Gold is 5% profit share on 50k - 99k. Platinum is 10% on 100k+
        const companyRevenue = revenues[i];
        const companyNetProfit = companyRevenue * COMPANY_NET_MARGIN;
        
        // Let's scale down profit share if they invest less than the platinum/gold tiers
        // For example: if they invest $50,000 in Gold (which gives 5%), they get 5% of profit.
        // If they invest $75,000, they get proportional (75k/50k)*5%? Or flat.
        // Let's assume flat rate percentage defined by package, or scaled slightly. Let's do flat.
        yearlyReturn = companyNetProfit * selectedPackage.rateValue;
      }

      cumulativeReturns += yearlyReturn;

      data.push({
        year: `Year ${year}`,
        'Principal Capital': investAmount,
        'Yearly Distribution': Math.round(yearlyReturn),
        'Cumulative Return': Math.round(cumulativeReturns),
        'Total Portfolio Value': Math.round(investAmount + cumulativeReturns)
      });
    }

    return data;
  };

  const projectionData = calculateProjections();
  const finalYearReturn = projectionData[4]['Cumulative Return'];
  const finalPortfolioValue = projectionData[4]['Total Portfolio Value'];
  const roiPercentage = ((finalYearReturn / investAmount) * 100).toFixed(1);

  return (
    <div className="space-y-8 bg-bg-surface border border-line-hairline rounded p-6 sm:p-8 text-left">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line-hairline pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accent-gold" />
            Interactive ROI Model
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Simulate your estimated quarterly returns and total 5-year yields based on our growth forecast.
          </p>
        </div>
        
        <div className="bg-bg-elevated py-1.5 px-3 rounded border border-line-hairline text-xs font-mono flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span>Secured Return Structures</span>
        </div>
      </div>

      {/* Package Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {INVESTOR_PACKAGES_DATA.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;
          return (
            <button
              key={pkg.id}
              onClick={() => handlePackageClick(pkg)}
              className={`p-4 rounded border text-left flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                isSelected
                  ? 'bg-brand-steel border-accent-gold ring-1 ring-accent-gold'
                  : 'bg-bg-elevated border-line-hairline hover:border-text-muted hover:bg-bg-surface-hover'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent-gold rounded-full pulse-slow" />
              )}
              <div>
                <span className="text-[9px] font-mono uppercase text-text-muted block">
                  {pkg.type}
                </span>
                <h4 className="font-display font-bold text-sm text-text-primary mt-1">
                  {pkg.name}
                </h4>
              </div>
              
              <div className="mt-4">
                <span className="text-xs font-mono text-accent-gold font-semibold">
                  {pkg.rateLabel}
                </span>
                <span className="text-[10px] text-text-secondary block mt-0.5">
                  Min: ${pkg.minInvestment.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Investment Amount Input & Slider */}
      <div className="bg-bg-base border border-line-hairline p-5 rounded space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
              Adjust Investment Capital
            </label>
            <p className="text-[10px] text-text-muted">
              Select any amount within the package boundaries.
            </p>
          </div>
          
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-accent-gold font-bold">
              $
            </span>
            <input
              type="number"
              min={5000}
              max={250000}
              step="1000"
              value={investAmount}
              onChange={handleInputChange}
              className="w-full bg-bg-surface text-text-primary pl-7 pr-4 py-2 rounded border border-line-hairline text-sm font-mono focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
            />
          </div>
        </div>

        {/* Quarter-Based Range Slider */}
        <div className="space-y-3 pt-1">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={amountToPercent(investAmount)}
              onChange={handleSliderChange}
              className="w-full accent-accent-gold cursor-pointer h-2.5 bg-bg-surface rounded border border-line-hairline"
            />
          </div>

          {/* Quarter Indicators & Threshold Labels */}
          <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono text-center">
            {INVESTOR_PACKAGES_DATA.map((pkg, idx) => {
              const isCurrentTier = selectedPackage.id === pkg.id;
              const quarterTitles = ['Q1 (Bronze)', 'Q2 (Silver)', 'Q3 (Gold)', 'Q4 (Platinum)'];
              const rangeLabels = ['$5k - $15k', '$15k - $50k', '$50k - $100k', '$100k - $250k'];
              return (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageClick(pkg)}
                  className={`py-1.5 px-1 rounded transition-all cursor-pointer border ${
                    isCurrentTier
                      ? 'bg-accent-gold/20 border-accent-gold text-accent-gold font-bold shadow-xs'
                      : 'bg-bg-elevated border-line-hairline/60 text-text-muted hover:text-text-secondary hover:border-text-muted'
                  }`}
                >
                  <span className="block font-bold">{quarterTitles[idx]}</span>
                  <span className="block text-[9px] opacity-75">{rangeLabels[idx]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calculator Projections Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Statistics Output Panel */}
        <div className="md:col-span-5 bg-bg-elevated p-5 rounded border border-line-hairline space-y-4 self-stretch flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest font-bold block border-b border-line-hairline pb-2">
              SIMULATED PERFORMANCE SUMMARY
            </span>
            
            <div>
              <span className="text-[10px] font-mono text-text-muted block">INVESTED CAPITAL</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                ${investAmount.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-muted block">5-YEAR NET RETURN</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-accent-gold">
                  +${finalYearReturn.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-text-muted block">PROJECTED ROI</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                  {roiPercentage}%
                </span>
              </div>
            </div>

            <div className="border-t border-line-hairline/60 pt-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                  Payout Frequency:
                </span>
                <span className="font-mono text-text-primary font-semibold">{selectedPackage.payoutFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-accent-gold" />
                  Distribution Style:
                </span>
                <span className="font-mono text-text-primary font-semibold">{selectedPackage.type}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectPackage(selectedPackage.id, investAmount)}
            className="w-full bg-accent-gold hover:bg-accent-gold-dark text-bg-base font-display font-bold text-xs uppercase tracking-wider py-3 rounded mt-4 transition-colors flex items-center justify-center gap-1.5"
          >
            Apply with this Package Setup
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Chart Projections */}
        <div className="md:col-span-7 bg-bg-elevated p-4 rounded border border-line-hairline">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-3 pl-1 font-bold">
            Cumulative Returns Timeline & Capital Accumulation
          </span>
          
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={projectionData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5D5D63" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#5D5D63" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F1F22" opacity={0.6} />
                <XAxis 
                  dataKey="year" 
                  stroke="#9E9EA5" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#1F1F22' }}
                />
                <YAxis 
                  stroke="#9E9EA5" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#1F1F22' }}
                  tickFormatter={(val) => `$${(val / 1000)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121214', 
                    borderColor: '#1F1F22',
                    borderRadius: '4px',
                    color: '#F5F5F7',
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    fontSize: '11px'
                  }} 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="Cumulative Return" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorReturn)" 
                  name="Projected Distributions"
                />
                <Area 
                  type="monotone" 
                  dataKey="Principal Capital" 
                  stroke="#5D5D63" 
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#colorCapital)" 
                  name="Base Capital Repayment"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 text-[10px] font-mono mt-3 text-text-secondary border-t border-line-hairline/40 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 bg-[#D4AF37]" /> Cumulative Projected Return
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 border-t border-dashed border-[#5D5D63]" /> Repayable Principal Capital
            </span>
          </div>
        </div>

      </div>

      {/* Fine-print notice */}
      <div className="text-[10px] font-sans text-text-muted leading-relaxed border-t border-line-hairline/40 pt-4 bg-bg-surface">
        <strong>Disclaimers & Scenario Assumptions:</strong> Projections assume standard 11% corporate net margins for shadow equity packages (Gold, Platinum), aligned with historical commercial HVACR sales pipeline data. Annual revenue growth represents the transition from the Year 1 private pipeline (Arsenal BG, $600K range) to the Year 2-5 public set-aside bid models. This simulator is illustrative and does not represent an absolute guarantee of company performance.
      </div>

    </div>
  );
}
