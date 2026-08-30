export interface PortfolioProject {
  id: string;
  name: string;
  role: string;
  internship: string;
  company: string;
  track: string;
  completionDate: string;
  score: number;
  scoreGrade: 'Exemplary' | 'Proficient';
  shortDescription: string;
  skillsUsed: string[];
  imagePlaceholder: {
    badge: string;
    accentColor: string;
    type: 'ecommerce' | 'datagrid' | 'telemetry' | 'checkout';
  };
  details: {
    problem: string;
    approach: string;
    solution: string;
    challenges: string;
    keyLearnings: string;
  };
  rubricBreakdown: {
    problemSolving: number;
    codeStructure: number;
    uiUx: number;
  };
  links: {
    githubRepo: string;
    liveDemo: string;
  };
  demoDetails?: {
    techSummary: string;
    features: string[];
  };
}

export interface StudentPortfolioProfile {
  name: string;
  username: string;
  role: string;
  bio: string;
  location: string;
  availableFor: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  verifiedBadge: string;
  totalProjects: number;
  completedInternships: number;
  averageScore: number;
}

export const STUDENT_PORTFOLIO_PROFILE: StudentPortfolioProfile = {
  name: 'Alex Morgan',
  username: 'alex-morgan',
  role: 'Aspiring Frontend Developer',
  bio: 'Building practical digital experiences through real-world projects.',
  location: 'San Francisco, CA (Open to Remote)',
  availableFor: 'Junior Frontend Developer & Apprenticeship Roles',
  githubUrl: 'https://github.com/alexmorgan-dev',
  linkedinUrl: 'https://linkedin.com/in/alexmorgan-frontend',
  email: 'alex.morgan@internlab.dev',
  verifiedBadge: 'Verified InternLab Developer',
  totalProjects: 4,
  completedInternships: 3,
  averageScore: 89,
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-ecom',
    name: 'E-commerce Product Experience',
    role: 'Frontend Developer Simulation',
    internship: 'Frontend Developer Virtual Internship',
    company: 'Nova Labs',
    track: 'Frontend Engineering Track',
    completionDate: 'August 28, 2026',
    score: 84,
    scoreGrade: 'Proficient',
    shortDescription: 'Crafted a production-ready responsive product detail interface featuring dynamic color swatch synchronization, inventory stock bounds, and sticky mobile purchase CTAs.',
    skillsUsed: ['React', 'JavaScript', 'CSS', 'Tailwind CSS', 'WCAG AA Accessibility'],
    imagePlaceholder: {
      badge: 'E-Commerce UI',
      accentColor: '#3E51FF',
      type: 'ecommerce'
    },
    details: {
      problem: 'E-commerce conversion rates plummet when mobile product pages suffer from layout shifts, unresponsive swatch selections, and unclear stock boundaries during rapid user interaction.',
      approach: 'Decoupled catalog state from presentation by architecting custom React state hooks, implementing optimistic swatch updates, and structuring semantic HTML with strict ARIA attribute bindings.',
      solution: 'Engineered an accessible, high-performance product experience with synchronized image carousels, responsive quantity clamp bounds, interactive review filters, and a floating mobile CTA.',
      challenges: 'Handling out-of-stock SKU combinations without disabling the entire product flow, while preserving keyboard focus traps within modal image previews.',
      keyLearnings: 'Unidirectional data flow prevents race conditions between floating cart counters and variant selectors; WCAG 2.1 AA focus rings are critical for keyboard-only shoppers.'
    },
    rubricBreakdown: {
      problemSolving: 90,
      codeStructure: 85,
      uiUx: 78
    },
    links: {
      githubRepo: 'https://github.com/alexmorgan-dev/nova-ecommerce-experience',
      liveDemo: 'https://demo.internlab.dev/nova-ecommerce-preview'
    },
    demoDetails: {
      techSummary: 'React 18 + Tailwind CSS + Lucide Icons',
      features: [
        'Dynamic multi-color swatch synchronization with live image change',
        'Quantity bounds preventing negative or exceeding inventory orders',
        'WCAG AA accessible keyboard navigation across tabs and options',
        'Sticky mobile checkout bar with animated badge counter'
      ]
    }
  },
  {
    id: 'proj-grid',
    name: 'Administrative Inventory Data Grid',
    role: 'Frontend Developer Simulation',
    internship: 'Frontend Developer Virtual Internship',
    company: 'Nova Labs',
    track: 'Frontend Engineering Track',
    completionDate: 'August 18, 2026',
    score: 94,
    scoreGrade: 'Exemplary',
    shortDescription: 'Engineered an administrative inventory table managing 500+ SKU records with client-side sorting, debounce search, status filtering, and slide-over edit sheets.',
    skillsUsed: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Data Tables', 'Debounce Search'],
    imagePlaceholder: {
      badge: 'Data Architecture',
      accentColor: '#10B981',
      type: 'datagrid'
    },
    details: {
      problem: 'Warehouse operations teams needed to rapidly search and edit 500+ SKU items without browser frame drops or sluggish UI re-renders during high-volume queries.',
      approach: 'Implemented client-side sorting with TypeScript comparator primitives, debounced search streams (sub-16ms latency), and isolated row edit state with slide-over drawers.',
      solution: 'Built an ultra-fast React data grid supporting multi-column sorting, instant category filtering, pagination controls, and inline status badge toggling.',
      challenges: 'Managing multi-column sort state while preserving active search query filters during asynchronous row updates and modal form submissions.',
      keyLearnings: 'Memoizing table rows with useMemo and isolating row-level state eliminates unnecessary re-renders across large datasets.'
    },
    rubricBreakdown: {
      problemSolving: 96,
      codeStructure: 94,
      uiUx: 92
    },
    links: {
      githubRepo: 'https://github.com/alexmorgan-dev/nova-inventory-grid',
      liveDemo: 'https://demo.internlab.dev/nova-inventory-grid'
    },
    demoDetails: {
      techSummary: 'React 18 + TypeScript + Debounce Filter Hooks',
      features: [
        'Multi-column sort algorithm with ASC/DESC direction indicators',
        'Instant search with 200ms debounce input stream',
        'Stock level threshold indicators (In Stock, Low Stock, Reorder)',
        'Accessible slide-over drawer for instantaneous SKU edits'
      ]
    }
  },
  {
    id: 'proj-telemetry',
    name: 'REST API Telemetry & Weather Service',
    role: 'Full-Stack Engineering Simulation',
    internship: 'Distributed Systems & Full-Stack Simulation',
    company: 'CloudScale Systems',
    track: 'Full-Stack Simulation',
    completionDate: 'August 05, 2026',
    score: 92,
    scoreGrade: 'Exemplary',
    shortDescription: 'Developed real-time telemetry card fetching multi-source sensor and weather data with optimistic caching, retry backoff algorithms, and graceful network failure states.',
    skillsUsed: ['JavaScript', 'REST API', 'Async/Await', 'Error Boundaries', 'CSS'],
    imagePlaceholder: {
      badge: 'API Integration',
      accentColor: '#6366F1',
      type: 'telemetry'
    },
    details: {
      problem: 'Network fluctuations in edge telemetry sensors frequently caused unhandled Promise rejections and crashed user dashboard monitoring screens.',
      approach: 'Constructed a resilient HTTP client layer with exponential backoff retries, local caching, and fallback skeleton states.',
      solution: 'Built a real-time telemetry card fetching multi-source sensor streams with optimistic local storage fallback and zero-downtime error boundaries.',
      challenges: 'Calculating exponential jitter backoff algorithms accurately without starving concurrent API requests during network outages.',
      keyLearnings: 'Isolating asynchronous error boundaries prevents partial component failures from crashing the parent application tree.'
    },
    rubricBreakdown: {
      problemSolving: 94,
      codeStructure: 90,
      uiUx: 92
    },
    links: {
      githubRepo: 'https://github.com/alexmorgan-dev/cloudscale-telemetry-widget',
      liveDemo: 'https://demo.internlab.dev/cloudscale-telemetry'
    },
    demoDetails: {
      techSummary: 'Vanilla JS (ES6+) + REST API + Cache Storage',
      features: [
        'Exponential backoff retry with randomized jitter (1s - 8s)',
        'Optimistic cache fallback rendering previous valid readings',
        'Dynamic weather telemetry metric cards with threshold alerts',
        'Zero-dependency async fetch pipeline with offline detection'
      ]
    }
  },
  {
    id: 'proj-checkout',
    name: 'Interactive Checkout & Tiered Promo Engine',
    role: 'Enterprise Web Simulation',
    internship: 'Enterprise React & State Architecture',
    company: 'FinTech Global',
    track: 'Enterprise Web Simulation',
    completionDate: 'July 22, 2026',
    score: 88,
    scoreGrade: 'Proficient',
    shortDescription: 'Engineered robust pricing and tiered discount calculation module with strict floating-point decimal rounding rules, promo code validation, and regression unit tests.',
    skillsUsed: ['JavaScript', 'Problem Solving', 'Unit Testing', 'Input Sanitization', 'CSS'],
    imagePlaceholder: {
      badge: 'Financial Logic',
      accentColor: '#F59E0B',
      type: 'checkout'
    },
    details: {
      problem: 'Enterprise checkout flows suffered from floating-point rounding inaccuracies and promo code stacking vulnerabilities in high-volume cart transactions.',
      approach: 'Created a pure mathematical calculation engine with integer-based cent arithmetic and an automated 24-case unit testing suite.',
      solution: 'Engineered deterministic pricing, tax calculation, and tiered coupon evaluation modules with 100% test coverage across all boundary conditions.',
      challenges: 'Handling compound percentage discounts applied before vs after regional tax adjustments in multi-currency contexts.',
      keyLearnings: 'Never perform currency calculations using standard JavaScript floats; always work in integer base units and format at the presentation boundary.'
    },
    rubricBreakdown: {
      problemSolving: 92,
      codeStructure: 86,
      uiUx: 86
    },
    links: {
      githubRepo: 'https://github.com/alexmorgan-dev/fintech-checkout-engine',
      liveDemo: 'https://demo.internlab.dev/fintech-checkout'
    },
    demoDetails: {
      techSummary: 'JavaScript ES6+ + Jest Unit Suite + Form Sanitization',
      features: [
        'Integer-based currency math eliminating binary float rounding errors',
        'Tiered promo code validator (Percentage, Fixed, Free Shipping)',
        'Defensive input sanitization preventing injection in promo fields',
        'Full test suite asserting 24 enterprise edge scenarios'
      ]
    }
  }
];

export const VERIFIED_PORTFOLIO_SKILLS = [
  {
    name: 'Git',
    score: 81,
    category: 'Practices & Workflow',
    status: 'Advanced',
    evidence: '4 completed simulations with 20+ feature branches, PR reviews, and conventional commits.',
    badge: 'Advanced'
  },
  {
    name: 'Problem Solving',
    score: 76,
    category: 'Practices & Workflow',
    status: 'Proficient',
    evidence: '94% average score on algorithmic state boundaries and calculation edge cases.',
    badge: 'Proficient'
  },
  {
    name: 'JavaScript',
    score: 72,
    category: 'Languages & Core',
    status: 'Proficient',
    evidence: 'ES6+ syntax, asynchronous control flow (async/await), closures, and DOM events.',
    badge: 'Proficient'
  },
  {
    name: 'UI Development',
    score: 69,
    category: 'Languages & Core',
    status: 'Developing',
    evidence: 'Responsive Flexbox/Grid layouts, WCAG 2.1 AA contrast compliance, and semantic HTML5.',
    badge: 'Developing'
  },
  {
    name: 'React',
    score: 64,
    category: 'Languages & Core',
    status: 'Developing',
    evidence: 'Component architecture, custom hooks, unidirectional data flow, and state isolation.',
    badge: 'Developing'
  },
  {
    name: 'TypeScript',
    score: 74,
    category: 'Languages & Core',
    status: 'Proficient',
    evidence: 'Strict type safety across inventory data structures and API contracts.',
    badge: 'Proficient'
  }
];
