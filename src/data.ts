import { 
  ServiceItem, 
  TeamMember, 
  CertificationItem, 
  InvestorPackage, 
  SalesDeal, 
  RoadmapStep, 
  UseOfFundsCategory, 
  RiskFactor 
} from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'mep-contracting',
    num: '01',
    title: 'MEP Contracting Services',
    description: 'Government and Private Sector Commercial contracting is at the core of our offered solutions.',
    details: [
      'Commercial & industrial mechanical system installations',
      'Unified MEP project management and contract execution',
      'Union standard of craftsmanship with zero tolerance for error',
      'Partnerships with tier-one nationwide equipment vendors'
    ]
  },
  {
    id: 'system-design',
    num: '02',
    title: 'Complete System Design',
    description: "Our in-house engineers and partners can evaluate your existing design or build one from scratch.",
    details: [
      'Value-engineering and comprehensive cost breakdown',
      'BIM coordination & pre-fabrication efficiency analysis',
      'CDB design compliant engineering and project planning',
      'Seamless hand-off from schematic plans to active field teams'
    ]
  },
  {
    id: 'equipment-protection',
    num: '03',
    title: 'Equipment Protection & Maintenance',
    description: 'Preventative maintenance schedules curated for your specific set of high-stakes equipment.',
    details: [
      'Custom preventative maintenance contracts to maximize equipment LTV',
      'Warranty tracking and parts replacement coordination',
      'Energy efficiency audits and operational safety checklists',
      'Priority rapid-response dispatch for emergency system downtime'
    ]
  },
  {
    id: 'temporary-systems',
    num: '04',
    title: "Boilers, RTUs, & Generators",
    description: 'Temporary system deployment to keep operations running smoothly during transitions or upgrades.',
    details: [
      'Best-in-class boiler rentals and temporary heating/cooling loops',
      'Commercial Roof Top Unit (RTU) installations and quick changeouts',
      'Industrial generator rentals and backup power setup',
      'Zero-interruption operational cutovers for high-stake facility projects'
    ]
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'founder',
    name: 'President & Founder',
    role: 'USMC Veteran & Construction Manager',
    description: 'Served in the Marine Corps for nearly a decade before starting a career in Construction Management.',
    background: 'Personally managed over $300M in projects. Built Atlas on the firm belief that "Construction is a people business, where valued teams build exceptional results."',
    avatarPlaceholder: '🪖'
  },
  {
    id: 'engineering-head',
    name: 'Head of Engineering',
    role: 'Lead Mechanical Engineer, P.E.',
    description: 'Earned a degree in mechanical engineering and has designed/managed complex mechanical systems.',
    background: 'Expertise ranges from industrial steam boilers to large-scale forced air commercial heating and cooling. Bridges the gap between blueprint design and field reality.',
    avatarPlaceholder: '📐'
  },
  {
    id: 'foremen',
    name: 'Our General Foremen',
    role: 'Union Craftsmanship Leaders',
    description: 'A powerhouse of regionally-respected union field execution directors leading our trade specialists.',
    background: 'Our Mechanical GF is built by Chicago-land HVAC/piping experience. Our Electrical GF hails from Texas, specializing in commercial spaces and industrial parks. Our Plumbing GF brings deep downstate Illinois expertise from well-respected plumbing halls.',
    avatarPlaceholder: '⚡'
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Illinois BEP Certifications (MBE & VBE)',
    status: 'Pending',
    description: 'State of Illinois Business Enterprise Program certification as a Minority Business Enterprise (MBE) and Veteran Business Enterprise (VBE) is currently in final application stages.',
    details: [
      'Unlocks Illinois mandate where 30% of total State contract dollars are reserved for BEP-certified firms.',
      'Positions Atlas as a highly desirable sub-contracting partner on major general contracting bids.',
      'Reciprocal benefits with City of Chicago, Cook County, CTA, METRA, PACE, and IDOT.'
    ]
  },
  {
    title: 'Illinois Capital Development Board (CDB) Prequalified',
    status: 'Active',
    description: 'Prequalified contractor status with the Illinois Capital Development Board (CDB), authorizing Atlas to bid directly on state-funded public building, university, and infrastructure projects.',
    details: [
      'Grants prime bidding rights on state institutional, educational, and government vertical construction contracts.',
      'Establishes official state-vetted bonding capacity, financial standing, safety rating (EMR), and technical competence.',
      'Synergizes with Illinois BEP set-aside goals for prime bidding and preferred tier-one MEP subcontracting positions.'
    ]
  },
  {
    title: 'Federal SBA 8(a) & VOSB Certification',
    status: 'Pending',
    description: 'Enrolled in the SBA 8(a) Business Development pathway and the Veteran-Owned Small Business (VOSB) program for federal and VA contracting opportunities.',
    details: [
      'Access to prime federal set-asides and sole-source government contracts.',
      'Exclusive bidding rights on VA (Veterans Affairs) regional facility upgrades and HVAC projects.',
      'Travel and logistical readiness to support federal facilities across regional boundaries.'
    ]
  },
  {
    title: 'Licensed Illinois State Contractor',
    status: 'Active',
    description: 'Fully registered, bonded, and insured mechanical and general MEP contractor in the State of Illinois.',
    details: [
      'Corporate entity established, Federal EIN obtained.',
      'Active commercial HVACR pipeline ready for bid solicitation.',
      'Registered with IL Procurement Gateway (IPG) and BidBuy state portal.'
    ]
  }
];

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    phase: 'PHASE 1',
    title: 'Government and Commercial Contracting Development',
    timeline: 'Year 1 (Active)',
    bulletPoints: [
      'Establish core commercial pipeline via Arsenal BG partnership',
      'Complete enrollment in Illinois APEX Accelerator for federal/state bidding support',
      'Register as certified vendor on Illinois BidBuy and Illinois Procurement Gateway (IPG)',
      'Establish primary NIGP code profiles (909 General Construction, 912 Construction, 914 Trades, 918 Consulting)',
      'Bid on active SBSP (Small Business Set-Aside) and act as prime/subcontractor on initial public MEP contracts'
    ],
    objective: 'Fill Year 1 private/public pipeline with commercial projects while state BEP applications are processed.'
  },
  {
    phase: 'PHASE 2',
    title: 'BEP State Certification & Local Reciprocity',
    timeline: 'Year 1–2 (Processing)',
    bulletPoints: [
      'Secure formal IL BEP (MBE/VBE) certifications via Illinois Commission on Equity & Inclusion (CEI)',
      'Establish eligibility for Capitol Development Board (CDB) design & build contracts',
      'Obtain IL UCP (DBE) status for federally-funded transportation projects (IDOT, CTA, Metra, Pace)',
      'Activate reciprocal certifications with City of Chicago, Cook County, CTA, Metra, and Pace',
      'Join Minority Supplier Development Councils (CMSDC) to tap into private corporate contracting mandates'
    ],
    objective: 'Transition from general bidding to high-win-rate, exclusive minority-designated public bidding.'
  },
  {
    phase: 'PHASE 3',
    title: 'Prime Contract Expansion & Federal SBA 8(a) Pathway',
    timeline: 'Year 2–5 (Growth)',
    bulletPoints: [
      'Directly bid and win Capitol Development Board (CDB) public prime projects',
      'Expand regional footprints to municipal, county-level, and higher education public MEP contracts',
      'Activate federal SBA 8(a) program status for sole-source federal HVAC and MEP upgrades',
      'Secure corporate private sector MEP contracts through NMSDC supplier diversity portals',
      'Expand permanent in-house estimating, engineering staff, and select trade sub-consultant networks'
    ],
    objective: 'Scale Atlas into a premier multi-million dollar prime multi-trade state contractor in Illinois.'
  }
];

export const INVESTOR_PACKAGES_DATA: InvestorPackage[] = [
  {
    id: 'bronze',
    name: 'Bronze Package',
    minInvestment: 5000,
    maxInvestment: 14999,
    type: 'Fixed Interest',
    rateLabel: '8% Fixed Annual',
    rateValue: 0.08,
    term: '12-Month Minimum Term',
    payoutFrequency: 'Quarterly Distributions',
    features: [
      'Flat 8% per annum return on invested capital',
      'Quarterly interest distributions direct to investor',
      'Convertible to shadow equity option in Year 2',
      'Priority repayment from active contract revenues',
      'Annual corporate performance and accounting reports',
      'Low-risk, high-yield bond-style passive structure'
    ],
    description: 'Perfect for local and retail investors seeking secure, predictable, bond-style yields backed by government construction pipelines.'
  },
  {
    id: 'silver',
    name: 'Silver Package',
    minInvestment: 15000,
    maxInvestment: 49999,
    type: 'Fixed Interest',
    rateLabel: '10% Fixed Annual',
    rateValue: 0.10,
    term: '12-Month Minimum Term',
    payoutFrequency: 'Quarterly Distributions',
    features: [
      'Flat 10% per annum return on invested capital',
      'Quarterly interest distributions direct to investor',
      'Convertible to shadow equity in Year 2 at preferred rate',
      'Priority repayment over founder distributions',
      'Semi-annual investor performance calls with leadership team',
      'Enhanced passive yield with simple contractual structure'
    ],
    description: 'Designed for professional investors aiming for strong double-digit fixed returns with an options-based pathway to equity ownership.'
  },
  {
    id: 'gold',
    name: 'Gold Package',
    minInvestment: 50000,
    maxInvestment: 99999,
    type: 'Shadow Equity',
    rateLabel: '5% Profit Share',
    rateValue: 0.05,
    term: '5-Year Participation Window',
    payoutFrequency: 'Quarterly Distributions',
    features: [
      '5% shadow equity (profit participation) in Atlas MEP Group',
      'Distributions tied directly to quarterly net contract revenues',
      'Passive structure — no voting rights or corporate overhead liabilities',
      'Optional company buyout clause at Year 3 (1.5× invested capital)',
      'Quarterly financials + dedicated investor dashboard access',
      'Exceptional growth upside participating in public-sector contract scale'
    ],
    description: 'A milestone package for accredited investors looking to participate directly in the lucrative margins of state-level public contracting.'
  },
  {
    id: 'platinum',
    name: 'Platinum Package',
    minInvestment: 100000,
    maxInvestment: null,
    type: 'Shadow Equity',
    rateLabel: '10% Profit Share',
    rateValue: 0.10,
    term: '7-Year Participation Window',
    payoutFrequency: 'Priority Quarterly Distributions',
    features: [
      '10% shadow equity (profit participation) in Atlas MEP Group',
      'Priority distributions paid prior to Bronze and Silver calculations',
      'Passive structure — no corporate operational liability',
      'Named Advisory Seat (non-binding advisory board with founder)',
      'Monthly financials + direct face-to-face founder access',
      'Founding-level partnership offering the maximum equity upside potential'
    ],
    description: 'Reserved for cornerstone capital partners looking to work closely with the founder to scale the business and maximize long-term equity value.'
  }
];

export const SALES_DEALS_DATA: SalesDeal[] = [
  {
    id: 'deal-1',
    client: 'Commercial HVAC Client (Brett)',
    type: 'Preventative Maint.',
    value: 86600,
    rep: 'Brett',
    description: 'Long-Term Contract Value (LTV) for full preventative maintenance'
  },
  {
    id: 'deal-2',
    client: 'Commercial Building RTU Changeout',
    type: 'Commercial Project',
    value: 350392,
    rep: 'Nick',
    description: 'Single-project retrofit close'
  },
  {
    id: 'deal-3',
    client: 'Commercial Retrofit Installation',
    type: 'Commercial Project',
    value: 123832,
    rep: 'Nick',
    description: 'Single-project commercial mechanical upgrade close'
  },
  {
    id: 'deal-4',
    client: 'Commercial HVAC Contract (Brett)',
    type: 'Preventative Maint.',
    value: 65720,
    rep: 'Brett',
    description: 'Long-Term Contract Value for ongoing preventative HVAC services'
  },
  {
    id: 'deal-5',
    client: 'Commercial Boiler Changeout',
    type: 'Commercial Project',
    value: 126455,
    rep: 'Brett',
    description: 'Single-project commercial boiler replacement close'
  },
  {
    id: 'deal-6',
    client: 'Local Office Mechanical Retrofit',
    type: 'Commercial Project',
    value: 27790,
    rep: 'Nick',
    description: 'Single-project light commercial mechanical installation close'
  }
];

export const USE_OF_FUNDS_DATA: UseOfFundsCategory[] = [
  {
    percentage: 30,
    label: 'Software & Technology',
    description: 'BEAM AI, Procore, Revit, estimating and engineering software suites critical for modern project designs, estimating speed, and digital client billing.',
    color: '#D4AF37' // Classic Gold
  },
  {
    percentage: 20,
    label: 'Marketing & Bid Prep',
    description: 'RFP/RFQ response drafting, proposal writing support, downstate regional outreach, and active SDR retainer via Arsenal BG HVACR pipeline.',
    color: '#AA842C' // Darker Metallic Gold
  },
  {
    percentage: 20,
    label: 'Working Capital',
    description: 'Liquidity bridge to carry trade labor, material purchases, and operational overhead during standard 30-60 day state and government payment cycles.',
    color: '#8B6F28' // Bronze Gold
  },
  {
    percentage: 10,
    label: 'Certifications & Compliance',
    description: 'BEP certification applications, IDHR (IL Dept of Human Rights) registrations, bonding guarantees, and professional liability insurance structures.',
    color: '#C5A059' // Sand Gold
  },
  {
    percentage: 10,
    label: 'Legal & Professional',
    description: 'LLC structural maintenance, Promissory Note legal reviews, SEC regulatory filing checks, and professional certified construction accounting setup.',
    color: '#E5C158' // Bright Brass Gold
  },
  {
    percentage: 10,
    label: 'Reserve / Contingency',
    description: 'Strategic liquidity buffer to handle unexpected initial material spikes, delayed state awards, or start-up contingency scenarios.',
    color: '#2E2E32' // Off-Black Charcoal
  }
];

export const RISK_FACTORS_DATA: RiskFactor[] = [
  {
    title: 'Early-stage company structural risks',
    type: 'Risk',
    description: 'The company is in its initial market-entry phase with a short history under the Atlas LLC name.'
  },
  {
    title: 'Obligation-backed interest repayments',
    type: 'Protection',
    description: 'Fixed-rate packages (Bronze and Silver) are contractually backed promissory notes — obligations due regardless of company profit margins.'
  },
  {
    title: 'Government award timelines and delays',
    type: 'Risk',
    description: 'State Capital Development Board (CDB) projects may experience administrative bottlenecks or bid protests.'
  },
  {
    title: 'Priority repayment on first contract revenue',
    type: 'Protection',
    description: 'Promissory agreements state that fixed-rate investors receive priority repayment directly from active project cash inflows.'
  },
  {
    title: 'Regulatory cert approvals not guaranteed',
    type: 'Risk',
    description: 'Although highly qualified, MBE/VBE State BEP and Federal SBA 8(a) applications are currently pending formal government board review.'
  },
  {
    title: 'Waterfall payout structural safety',
    type: 'Protection',
    description: 'All shadow equity distribution structures mandate that investor profit payouts occur prior to any founder capital draws.'
  },
  {
    title: 'Capacity limits of single-owner operation',
    type: 'Risk',
    description: 'As a lean, owner-operated model in Year 1, rapid contract scale could stress logistical and managerial capacities.'
  },
  {
    title: 'Transparent accountability reporting',
    type: 'Protection',
    description: 'All seed investors receive detailed quarterly financial packages, project logs, and corporate balance sheets to track progress.'
  }
];
