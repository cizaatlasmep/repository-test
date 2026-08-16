/**
 * Types and interfaces for Atlas MEP Group Web Application & Investor Portal
 */

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  details: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  background: string;
  avatarPlaceholder: string; // fallback visual
}

export interface CertificationItem {
  title: string;
  status: 'Certified' | 'Pending' | 'Active' | 'Reciprocal';
  description: string;
  details: string[];
}

export interface InvestorPackage {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  minInvestment: number;
  maxInvestment: number | null; // null represents no upper limit
  type: 'Fixed Interest' | 'Shadow Equity';
  rateLabel: string;
  rateValue: number; // e.g. 0.08 for 8%, 0.05 for 5%
  term: string;
  payoutFrequency: string;
  features: string[];
  description: string;
}

export interface SalesDeal {
  id: string;
  client: string;
  type: string;
  value: number;
  rep: string;
  description: string;
}

export interface RoadmapStep {
  phase: string;
  title: string;
  timeline: string;
  bulletPoints: string[];
  objective: string;
}

export interface UseOfFundsCategory {
  percentage: number;
  label: string;
  amount?: number; // calculated dynamically
  description: string;
  color: string;
}

export interface RiskFactor {
  title: string;
  type: 'Risk' | 'Protection';
  description: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: 'general' | 'investor';
  investmentTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'undecided';
  investmentAmount?: number;
  message: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}
