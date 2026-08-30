import { 
  CareerTrackInfo, 
  VirtualInternship, 
  UserProfile, 
  PortfolioArtifact, 
  Certificate 
} from '../types';

export const CAREER_TRACKS: CareerTrackInfo[] = [
  {
    id: 'software-engineering',
    name: 'Software Development',
    shortDescription: 'Build scalable backend services, distributed systems, and modern web architectures.',
    fullDescription: 'Experience the day-to-day workflow of software engineers at top technology companies. Work with production codebases, write unit tests, handle code reviews, and ship robust features.',
    iconName: 'Code',
    averageStartingSalary: '$115,000 / yr',
    inDemandSkills: ['JavaScript', 'TypeScript', 'React', 'Python', 'SQL', 'Git', 'Docker'],
    totalSimulations: 8,
  },
  {
    id: 'data-science-ai',
    name: 'Data Science',
    shortDescription: 'Analyze complex datasets, build ML models, and engineer predictive pipelines.',
    fullDescription: 'Solve real-world business problems using statistical modeling, exploratory data analysis, machine learning algorithms, and modern AI/LLM evaluation techniques.',
    iconName: 'Database',
    averageStartingSalary: '$112,000 / yr',
    inDemandSkills: ['Python', 'SQL', 'Pandas & NumPy', 'Machine Learning', 'Excel', 'Tableau'],
    totalSimulations: 6,
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    shortDescription: 'Develop LLM pipelines, autonomous agents, prompt architectures, and RAG evaluation systems.',
    fullDescription: 'Build enterprise-grade AI applications, evaluate model safety and accuracy, orchestrate vector retrieval systems, and fine-tune specialized workflows.',
    iconName: 'Sparkles',
    averageStartingSalary: '$125,000 / yr',
    inDemandSkills: ['Python', 'LLM Chains', 'Prompt Engineering', 'Vector DBs', 'PyTorch', 'Git'],
    totalSimulations: 6,
  },
  {
    id: 'uiux-design',
    name: 'UI/UX Design',
    shortDescription: 'Design intuitive workflows, structured design systems, and accessible user experiences.',
    fullDescription: 'Solve intricate UX challenges in high-density enterprise software and consumer applications. Build interactive prototypes, wireframes, component libraries, and usability test plans.',
    iconName: 'Layout',
    averageStartingSalary: '$98,000 / yr',
    inDemandSkills: ['Figma', 'User Research', 'Design Systems', 'HTML', 'CSS', 'Wireframing'],
    totalSimulations: 5,
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    shortDescription: 'Execute multi-channel growth campaigns, performance marketing, and conversion funnel optimization.',
    fullDescription: 'Manage real-world customer acquisition strategies, analyze CAC/LTV cohorts, optimize Google & Meta ad campaigns, and author high-converting brand positioning copy.',
    iconName: 'Megaphone',
    averageStartingSalary: '$88,000 / yr',
    inDemandSkills: ['Growth Analytics', 'SEO / SEM', 'Conversion Optimization', 'Excel', 'Copywriting', 'A/B Testing'],
    totalSimulations: 4,
  },
  {
    id: 'business-strategy',
    name: 'Business',
    shortDescription: 'Analyze market opportunities, corporate operations, unit economics, and growth strategy.',
    fullDescription: 'Step into the role of a Strategic Business Analyst. Structure market entry roadmaps, conduct competitive intelligence, model operational unit economics, and deliver C-suite presentations.',
    iconName: 'TrendingUp',
    averageStartingSalary: '$96,000 / yr',
    inDemandSkills: ['Business Strategy', 'Excel Modeling', 'Market Research', 'Slide Decks', 'KPI Tracking'],
    totalSimulations: 5,
  },
  {
    id: 'financial-analysis',
    name: 'Finance',
    shortDescription: 'Perform valuation models, financial risk assessment, and quantitative data analytics.',
    fullDescription: 'Simulate high-stakes investment banking, corporate financial planning, and quantitative risk modeling. Work with financial statements, discounted cash flow (DCF) models, and risk indicators.',
    iconName: 'DollarSign',
    averageStartingSalary: '$105,000 / yr',
    inDemandSkills: ['Excel', 'Financial Modeling', 'DCF Valuation', 'Python', 'SQL', 'Accounting'],
    totalSimulations: 5,
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    shortDescription: 'Investigate incident alerts, analyze vulnerability surfaces, and author security playbooks.',
    fullDescription: 'Act as a frontline Security Operations Center (SOC) analyst. Triage security alerts, analyze phishing payloads, evaluate server logs, and draft hardening remediations.',
    iconName: 'ShieldCheck',
    averageStartingSalary: '$102,000 / yr',
    inDemandSkills: ['Log Analysis', 'Threat Hunting', 'Incident Triage', 'Network Security', 'Python', 'Git'],
    totalSimulations: 4,
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    shortDescription: 'Deploy containerized microservices, automate CI/CD pipelines, and manage cloud infrastructure.',
    fullDescription: 'Work with AWS/GCP architecture, Kubernetes clusters, Terraform IaC, and zero-downtime deployment pipelines as a Cloud Platform and DevOps engineer.',
    iconName: 'Cloud',
    averageStartingSalary: '$118,000 / yr',
    inDemandSkills: ['AWS / GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git', 'Linux'],
    totalSimulations: 5,
  },
  {
    id: 'product-management',
    name: 'Product Management',
    shortDescription: 'Define product strategy, craft PRDs, prioritize roadmaps, and align cross-functional teams.',
    fullDescription: 'Step into the shoes of an Associate Product Manager. Conduct user research, write comprehensive specifications, balance technical debt with feature velocity, and track product analytics.',
    iconName: 'Briefcase',
    averageStartingSalary: '$108,000 / yr',
    inDemandSkills: ['PRD Writing', 'Figma', 'User Research', 'Agile Roadmaps', 'SQL', 'Data Analytics'],
    totalSimulations: 5,
  },
];

export const VIRTUAL_INTERNSHIPS: VirtualInternship[] = [
  {
    id: 'intern-cloudscale-backend',
    slug: 'cloudscale-distributed-backend',
    title: 'Distributed Backend Engineering Simulation',
    companyName: 'CloudScale Systems',
    companyTier: 'High-Growth Tech',
    companyLocation: 'San Francisco, CA (Remote Simulation)',
    companyDescription: 'CloudScale provides hyper-scale distributed infrastructure and edge computing tools powering over 40 million API requests per minute.',
    trackId: 'software-engineering',
    difficulty: 'Intermediate',
    durationWeeks: 3,
    estimatedTotalHours: 18,
    badgeTitle: 'Distributed Systems Practitioner',
    summary: 'Architect resilient microservice endpoints, implement sliding-window rate limiters, and diagnose latency bottlenecks under production traffic spikes.',
    detailedOverview: `Welcome to CloudScale Systems. As a backend engineering intern on the Core Platform Team, you will work directly on mission-critical platform components.

During this 3-week simulation, you will receive ticket assignments, code review feedback, and simulated Slack requests from your Engineering Manager and Senior Staff Engineers. You'll tackle real distributed systems challenges that mirror actual engineering sprint deliverables.`,
    whatYouWillLearn: [
      'Design high-throughput REST & gRPC endpoint contracts with comprehensive type safety',
      'Implement atomic Redis-based rate limiting algorithms (Sliding Window Log & Token Bucket)',
      'Construct automated benchmark tests to detect memory leaks and concurrency race conditions',
      'Author formal Post-Mortem Incident Root Cause Analysis (RCA) documents',
    ],
    prerequisites: ['Basic understanding of HTTP APIs', 'Familiarity with TypeScript, JavaScript, or Python', 'Basic data structure knowledge'],
    toolsUsed: ['TypeScript / Node.js', 'Redis', 'PostgreSQL', 'Jest / Vitest', 'Docker'],
    graduatesCount: 1420,
    rating: 4.92,
    supervisor: {
      id: 'sup-elena-rostova',
      name: 'Elena Rostova',
      title: 'Principal Distributed Systems Engineer',
      department: 'Platform Architecture & Core Ingress',
      companyName: 'CloudScale Systems',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: '12 years in distributed storage systems and low-latency infrastructure. Passionate about rigorous architectural thinking and clean concurrency models.',
      communicationStyle: 'direct_technical',
      systemInstructionPrompt: 'Be a supportive but technically precise senior engineer. Emphasize algorithmic efficiency, idempotency, failure modes, and clear documentation.',
    },
    milestones: [
      {
        weekNumber: 1,
        id: 'ms-cs-week-1',
        title: 'Core API Specification & Data Layer Schema',
        theme: 'System Architecture & Interface Contracts',
        overview: 'Establish the data model and schema contracts for our new high-throughput analytics ingestion microservice.',
        skillsTaught: ['API Design', 'Schema Normalization', 'Input Validation'],
        simulatedEmails: [
          {
            id: 'em-cs-101',
            senderName: 'Elena Rostova',
            senderTitle: 'Principal Distributed Systems Engineer',
            senderEmail: 'elena.rostova@cloudscale.internal',
            recipientEmail: 'intern@cloudscale.internal',
            subject: 'Welcome to the Platform Team & Week 1 Priorities',
            timestamp: 'Monday 09:15 AM',
            isImportant: true,
            body: `Hi and welcome to the team!

We're kicking off our new Tenant Metrics Ingestion service. Before we write the processing pipeline, we need a clean, validated API specification and database schema that can handle bursty traffic without lock contention.

Review the architectural notes attached and submit your schema design and endpoint request/response contracts. Let me know in the team channel if you have questions on partition keys.

Best,
Elena`,
          },
          {
            id: 'em-cs-102',
            senderName: 'Marcus Vance',
            senderTitle: 'Staff DevOps & Reliability Lead',
            senderEmail: 'marcus.vance@cloudscale.internal',
            recipientEmail: 'intern@cloudscale.internal',
            subject: 'SLO and Latency Targets for New Service',
            timestamp: 'Monday 11:30 AM',
            body: `Quick heads up: our p99 latency target for the ingestion endpoint is 45ms. Please make sure your schema indexing avoids full table scans on tenant_id lookups.`,
          },
        ],
        tasks: [
          {
            id: 'task-cs-1',
            milestoneId: 'ms-cs-week-1',
            title: 'Design Ingestion API Contracts & TypeScript Interface Schema',
            deliverableType: 'code',
            estimatedMinutes: 90,
            objective: 'Write complete TypeScript interface contracts and JSON schema validation rules for the metrics ingest payload.',
            instructionsMarkdown: `### Technical Requirements:
1. Define the TypeScript interfaces for \`IngestMetricPayload\`, \`MetricDimension\`, \`BatchIngestResponse\`, and \`ValidationError\`.
2. Implement a runtime validation function \`validateMetricPayload(data: unknown): ValidationResult\` that checks:
   - \`tenantId\` is a valid UUIDv4 string.
   - \`metricName\` is alphanumeric with dot notation (e.g. \`api.response.time_ms\`).
   - \`timestamp\` is an ISO-8601 string not older than 15 minutes in the past and not in the future.
   - \`value\` is a finite floating point number.
   - \`dimensions\` has a maximum of 10 key-value string pairs.
3. Write 3 unit test cases covering valid batches, malformed timestamps, and payload overflows.`,
            starterTemplate: `// CloudScale Ingestion Contract - Week 1 Deliverable
export interface MetricDimension {
  key: string;
  value: string;
}

export interface IngestMetricPayload {
  tenantId: string;
  metricName: string;
  value: number;
  timestamp: string;
  dimensions?: Record<string, string>;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  sanitizedPayload?: IngestMetricPayload;
}

export function validateMetricPayload(input: unknown): ValidationResult {
  // TODO: Implement your validation logic here
  return { isValid: false, errors: ['Not implemented'] };
}
`,
            rubricCriteria: [
              {
                id: 'rc-cs-1',
                title: 'Data Validation Completeness',
                weightPercentage: 40,
                description: 'Verifies all edge cases (UUID format, timestamps, finite numbers, dimension bounds).',
                evaluationGuide: 'Full score requires thorough edge case coverage and clean error messaging.',
              },
              {
                id: 'rc-cs-2',
                title: 'Type Safety & Interface Ergonomics',
                weightPercentage: 30,
                description: 'Clear, extensible TypeScript type definitions without any `any` types.',
                evaluationGuide: 'High score for strict typing and logical separation.',
              },
              {
                id: 'rc-cs-3',
                title: 'Code Quality & Test Assertions',
                weightPercentage: 30,
                description: 'Clean formatting, idiomatic style, and robust test cases.',
                evaluationGuide: 'Full points if tests cover both happy path and adversarial inputs.',
              },
            ],
          },
        ],
      },
      {
        weekNumber: 2,
        id: 'ms-cs-week-2',
        title: 'Sliding-Window Rate Limiting Engine',
        theme: 'Concurrency & Ingress Protection',
        overview: 'Build an atomic rate limiter to safeguard our APIs against distributed denial of service and noisy neighbor tenants.',
        skillsTaught: ['Redis Key Design', 'Sliding Window Algorithm', 'Concurrency Handling'],
        simulatedEmails: [
          {
            id: 'em-cs-201',
            senderName: 'Elena Rostova',
            senderTitle: 'Principal Distributed Systems Engineer',
            senderEmail: 'elena.rostova@cloudscale.internal',
            recipientEmail: 'intern@cloudscale.internal',
            subject: 'Week 2 Deliverable: Rate Limiting Middleware',
            timestamp: 'Monday 09:00 AM',
            isImportant: true,
            body: `Great job on the schema last week!

This week we're implementing the rate limiter. We evaluated fixed-window counters, but they suffer from burst boundary issues. We want a Sliding Window Log or Sliding Window Counter implementation.

Keep in mind that multiple servers will be evaluating limits simultaneously, so your operations must be atomic.`,
          },
        ],
        tasks: [
          {
            id: 'task-cs-2',
            milestoneId: 'ms-cs-week-2',
            title: 'Implement Sliding Window Rate Limiter Module',
            deliverableType: 'code',
            estimatedMinutes: 120,
            objective: 'Implement an in-memory / Redis-compatible sliding window rate limiter class that returns remaining quota and retry-after headers.',
            instructionsMarkdown: `### Technical Requirements:
1. Implement the \`SlidingWindowRateLimiter\` class.
2. Support configurable limits (e.g. 100 requests per 60-second window).
3. Compute exact \`remainingTokens\`, \`resetTimeMs\`, and \`isAllowed\` status.
4. Provide clean eviction of expired timestamps to prevent memory leaks.`,
            starterTemplate: `export interface RateLimitConfig {
  maxRequests: number;
  windowSizeMs: number;
}

export interface RateLimitResult {
  isAllowed: boolean;
  remainingRequests: number;
  resetTimeMs: number;
  retryAfterSeconds?: number;
}

export class SlidingWindowRateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(private config: RateLimitConfig) {}

  public checkLimit(key: string, now: number = Date.now()): RateLimitResult {
    // TODO: Implement sliding window evaluation and cleanup
    return {
      isAllowed: true,
      remainingRequests: this.config.maxRequests,
      resetTimeMs: now + this.config.windowSizeMs,
    };
  }
}
`,
            rubricCriteria: [
              {
                id: 'rc-cs-2-1',
                title: 'Algorithm Correctness',
                weightPercentage: 50,
                description: 'Accurately calculates requests within the sliding duration without boundary spikes.',
                evaluationGuide: 'Must handle precision boundary cases.',
              },
              {
                id: 'rc-cs-2-2',
                title: 'Memory & Performance Optimization',
                weightPercentage: 30,
                description: 'Prunes old records efficiently and prevents unbounded memory growth.',
                evaluationGuide: 'Eviction should be clean.',
              },
              {
                id: 'rc-cs-2-3',
                title: 'Standard HTTP Headers Integration',
                weightPercentage: 20,
                description: 'Calculates X-RateLimit-Remaining and Retry-After headers correctly.',
                evaluationGuide: 'Values must match RFC guidelines.',
              },
            ],
          },
        ],
      },
      {
        weekNumber: 3,
        id: 'ms-cs-week-3',
        title: 'Production Incident Post-Mortem & Architecture Hardening',
        theme: 'Reliability Engineering & Root Cause Analysis',
        overview: 'Analyze a simulated cascade outage, identify the database connection exhaustion cause, and author a hardening proposal.',
        skillsTaught: ['Incident Response', 'Post-Mortem Authoring', 'Circuit Breakers'],
        simulatedEmails: [
          {
            id: 'em-cs-301',
            senderName: 'Marcus Vance',
            senderTitle: 'Staff DevOps & Reliability Lead',
            senderEmail: 'marcus.vance@cloudscale.internal',
            recipientEmail: 'intern@cloudscale.internal',
            subject: 'URGENT: Post-Mortem required for Sev-1 Ingestion Degradation',
            timestamp: 'Tuesday 02:45 PM',
            isImportant: true,
            body: `Team,

Yesterday at 14:12 UTC we experienced a 24-minute Sev-1 degradation where 18% of metrics ingestion requests timed out. The root issue was upstream connection pool starvation caused by a slow database retry storm.

We need our intern to assemble the formal Incident Post-Mortem document and propose mitigation architectures (e.g. circuit breakers, exponential backoff with jitter).`,
          },
        ],
        tasks: [
          {
            id: 'task-cs-3',
            milestoneId: 'ms-cs-week-3',
            title: 'Author Production Incident Post-Mortem & Resiliency Plan',
            deliverableType: 'document',
            estimatedMinutes: 90,
            objective: 'Write an executive and technical Post-Mortem documenting the timeline, root cause, impact, and 4 prevention action items.',
            instructionsMarkdown: `### Required Sections in your Post-Mortem Document:
1. **Executive Summary**: 2-3 sentences summarizing the outage duration, impacted systems, and user impact.
2. **Incident Timeline**: Chronological log of events from trigger to resolution.
3. **5-Whys Root Cause Analysis**: Step-by-step breakdown of why connection pools were exhausted.
4. **Immediate Mitigations vs Long-Term Architecture Hardening**:
   - Client retry policy with jitter
   - Circuit breaker pattern (Closed, Open, Half-Open)
   - Connection pool bulkhead isolation
5. **Action Items & Ownership Matrix**: Table of preventative tasks with priority ratings (P0, P1, P2).`,
            starterTemplate: `# Production Incident Post-Mortem
**Incident Reference**: INC-8492
**Date of Incident**: 2026-08-15
**Severity**: SEV-1 (High Impact)
**Author**: Engineering Intern, Core Platform

## 1. Executive Summary
[Write 2-3 sentences summarizing the incident]

## 2. Root Cause Analysis (5-Whys)
1. Why did the API return 504 Gateway Timeouts? ->
2. Why were worker threads blocked? ->
3. Why was the database connection pool depleted? ->
4. Why did queries take 12x longer? ->
5. Why was there no backoff threshold? ->

## 3. Resiliency Architecture Proposals
- Circuit Breaker Implementation:
- Connection Pool Partitioning:
- Backoff with Full Jitter:

## 4. Action Items (Preventative Work)
| Priority | Action Item | Owner | Target Date |
|---|---|---|---|
| P0 | | | |
| P1 | | | |
`,
            rubricCriteria: [
              {
                id: 'rc-cs-3-1',
                title: 'Technical Depth of Root Cause Analysis',
                weightPercentage: 40,
                description: 'Accurately diagnoses database connection starvation and retry storm dynamics.',
                evaluationGuide: 'Must show clear understanding of distributed systems failure modes.',
              },
              {
                id: 'rc-cs-3-2',
                title: 'Actionability of Resiliency Mitigations',
                weightPercentage: 40,
                description: 'Proposes realistic, industry-standard architectural safeguards (jitter, circuit breaking).',
                evaluationGuide: 'Proposals should be concrete and technically sound.',
              },
              {
                id: 'rc-cs-3-3',
                title: 'Clarity & Executive Communication',
                weightPercentage: 20,
                description: 'Professional tone, structured formatting, and precise terminology.',
                evaluationGuide: 'Editorial quality suitable for engineering VP review.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'intern-apex-quant',
    slug: 'apex-quant-risk-analyst',
    title: 'Quantitative Research & Risk Analyst Simulation',
    companyName: 'Apex Quantitative Capital',
    companyTier: 'Fortune 500',
    companyLocation: 'New York, NY (Remote Simulation)',
    companyDescription: 'Apex Quantitative Capital manages $18B in global multi-asset quantitative strategies utilizing algorithmic execution and statistical arbitrage.',
    trackId: 'financial-analysis',
    difficulty: 'Intermediate',
    durationWeeks: 3,
    estimatedTotalHours: 16,
    badgeTitle: 'Quantitative Risk Analyst',
    summary: 'Construct portfolio Value-at-Risk (VaR) models, evaluate tail-risk drawdowns under simulated market stress, and present executive risk reports.',
    detailedOverview: `Experience the high-stakes environment of institutional quantitative finance. As a Quantitative Research Intern at Apex, you will work with trading desks and risk management committees.`,
    whatYouWillLearn: [
      'Calculate Parametric, Historical, and Monte Carlo Value-at-Risk (VaR)',
      'Conduct scenario stress testing (e.g. 2008 Lehman shock, 2020 Liquidity Crunch)',
      'Evaluate Sharpe, Sortino, and Maximum Drawdown performance metrics',
      'Deliver concise executive risk memorandums for Portfolio Managers',
    ],
    prerequisites: ['Basic statistics and probability', 'Understanding of equities and fixed income', 'Comfort with spreadsheet / mathematical formulas'],
    toolsUsed: ['Python / Pandas', 'Financial Modeling Sheets', 'LaTeX / Markdown', 'Matplotlib / D3'],
    graduatesCount: 980,
    rating: 4.88,
    supervisor: {
      id: 'sup-david-chen',
      name: 'David Chen, CFA',
      title: 'Managing Director, Quantitative Risk Management',
      department: 'Global Multi-Asset Risk',
      companyName: 'Apex Quantitative Capital',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Former hedge fund portfolio manager with 16 years leading quantitative risk architecture. Focused on non-normal return distributions and tail events.',
      communicationStyle: 'meticulous_analytical',
      systemInstructionPrompt: 'Be a precise, analytical finance leader. Expect rigorous statistical justification, attention to portfolio tail risks, and clean executive summaries.',
    },
    milestones: [
      {
        weekNumber: 1,
        id: 'ms-aq-week-1',
        title: 'Portfolio Return Distribution & Value-at-Risk (VaR)',
        theme: 'Statistical Risk Measurement',
        overview: 'Model daily historical returns and compute 95% and 99% 1-day Value-at-Risk metrics for a $50M multi-asset portfolio.',
        skillsTaught: ['VaR Calculation', 'Normal Distribution vs Fat Tails', 'Sharpe Ratio'],
        simulatedEmails: [
          {
            id: 'em-aq-101',
            senderName: 'David Chen, CFA',
            senderTitle: 'Managing Director, Risk Management',
            senderEmail: 'dchen@apexcap.internal',
            recipientEmail: 'intern@apexcap.internal',
            subject: 'Portfolio Alpha-7 Risk Audit Assignment',
            timestamp: 'Monday 08:30 AM',
            isImportant: true,
            body: `Welcome to Apex.

The Investment Committee is reviewing risk allocations for Portfolio Alpha-7 ($50M AUM, 60% Tech Equities, 25% US Treasuries, 15% Commodity Futures).

I need your initial report analyzing the 1-day 95% and 99% VaR using both Historical Simulation and Parametric approaches. Note any skewness or kurtosis that makes a pure Gaussian assumption dangerous.

Best,
David`,
          },
        ],
        tasks: [
          {
            id: 'task-aq-1',
            milestoneId: 'ms-aq-week-1',
            title: 'Value-at-Risk (VaR) Calculation & Analysis Report',
            deliverableType: 'financial-sheet',
            estimatedMinutes: 90,
            objective: 'Compute portfolio volatility, correlation matrix, and compare Historical vs Parametric VaR with written risk notes.',
            instructionsMarkdown: `### Deliverable Requirements:
1. Provide the mathematical calculations for Portfolio Variance given weights $w = [0.60, 0.25, 0.15]$.
2. Calculate Parametric 1-day 95% VaR ($Z = 1.645$) and 99% VaR ($Z = 2.326$).
3. Detail why Historical Simulation reveals greater tail loss than standard Normal distribution due to kurtosis.
4. Write a 200-word risk commentary for the Chief Investment Officer.`,
            starterTemplate: `# Executive Risk Memorandum: Portfolio Alpha-7 VaR
**Prepared For**: Investment Risk Committee
**Analyst**: Quantitative Risk Intern
**Date**: August 2026

## 1. Key Risk Metrics Summary
- **Portfolio AUM**: $50,000,000
- **Daily Portfolio Volatility ($\sigma_p$)**: 1.24%
- **Annualized Sharpe Ratio**: 1.82

## 2. Value-at-Risk (VaR) Comparative Table
| Metric | Parametric (Normal) | Historical Simulation | Variance ($) |
|---|---|---|---|
| 1-Day 95% VaR | $ | $ | $ |
| 1-Day 99% VaR | $ | $ | $ |

## 3. Tail Risk & Kurtosis Findings
[Analyze why fat tails impact the 99% confidence threshold]

## 4. Recommendations for Capital Buffer
[State clear hedge or cash buffer recommendations]
`,
            rubricCriteria: [
              {
                id: 'rc-aq-1',
                title: 'Mathematical Accuracy',
                weightPercentage: 40,
                description: 'Correct application of portfolio variance, standard deviations, and Z-scores.',
                evaluationGuide: 'Calculations must be precise.',
              },
              {
                id: 'rc-aq-2',
                title: 'Understanding of Distributional Realities',
                weightPercentage: 35,
                description: 'Clear articulation of why financial markets exhibit leptokurtic (fat-tailed) behavior.',
                evaluationGuide: 'Insightful comparison between parametric and historical methods.',
              },
              {
                id: 'rc-aq-3',
                title: 'Executive Financial Writing',
                weightPercentage: 25,
                description: 'Crisp, professional institutional finance terminology.',
                evaluationGuide: 'Clear and actionable tone.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'intern-vanguard-pm',
    slug: 'vanguard-associate-product-manager',
    title: 'Associate Product Manager Workplace Simulation',
    companyName: 'Vanguard Health Technologies',
    companyTier: 'High-Growth Tech',
    companyLocation: 'Boston, MA (Remote Simulation)',
    companyDescription: 'Vanguard Health builds next-generation clinical workflows and patient engagement portals used by 120+ hospital networks across North America.',
    trackId: 'product-management',
    difficulty: 'Beginner',
    durationWeeks: 3,
    estimatedTotalHours: 14,
    badgeTitle: 'Certified Associate Product Manager',
    summary: 'Lead patient portal feature discovery, write comprehensive Product Requirement Documents (PRDs), and resolve sprint trade-offs.',
    detailedOverview: `Step into the fast-paced role of an Associate Product Manager in healthtech. You will balance clinical compliance, user empathy, and engineering constraints.`,
    whatYouWillLearn: [
      'Write structured, unambiguous PRDs with detailed user stories and acceptance criteria',
      'Define North Star Metrics, leading indicators, and feature engagement funnels',
      'Conduct stakeholder alignment across clinical, legal, and engineering teams',
      'Facilitate RICE prioritization scoring for backlog sprint planning',
    ],
    prerequisites: ['Strong written communication', 'Analytical thinking', 'User empathy'],
    toolsUsed: ['Product Spec Frameworks', 'User Story Mapping', 'RICE Scoring', 'Figma Wireframe Review'],
    graduatesCount: 1650,
    rating: 4.95,
    supervisor: {
      id: 'sup-sarah-jenkins',
      name: 'Sarah Jenkins',
      title: 'VP of Product, Patient Experience',
      department: 'Core Digital Health Products',
      companyName: 'Vanguard Health Technologies',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Former healthcare operator and product leader with 10+ years launching patient-centric mobile and web platforms.',
      communicationStyle: 'executive_strategic',
      systemInstructionPrompt: 'Be an insightful, strategic product mentor. Push for customer empathy, clear success metrics, ruthless prioritization, and edge-case handling.',
    },
    milestones: [
      {
        weekNumber: 1,
        id: 'ms-vh-week-1',
        title: 'User Problem Framing & Product Requirements Document (PRD)',
        theme: 'Problem Definition & Feature Specification',
        overview: 'Define the scope and specification for our new Caregiver Proxy Access feature enabling family members to view lab records securely.',
        skillsTaught: ['PRD Writing', 'User Story Authoring', 'Acceptance Criteria'],
        simulatedEmails: [
          {
            id: 'em-vh-101',
            senderName: 'Sarah Jenkins',
            senderTitle: 'VP of Product',
            senderEmail: 'sarah.jenkins@vanguardhealth.internal',
            recipientEmail: 'intern@vanguardhealth.internal',
            subject: 'Q3 Priority: Caregiver Proxy Access PRD',
            timestamp: 'Monday 09:30 AM',
            isImportant: true,
            body: `Hi! Welcome to the Vanguard Product Org.

Our hospital partners have flagged a major pain point: elderly patients struggle to navigate complex post-operative medication schedules without a trusted family caregiver.

We're kicking off the "Caregiver Proxy Authorization" initiative. I'd like you to author the initial PRD. Pay special attention to HIPAA authorization workflows and consent revocation.

Looking forward to your draft!

Sarah`,
          },
        ],
        tasks: [
          {
            id: 'task-vh-1',
            milestoneId: 'ms-vh-week-1',
            title: 'Author Comprehensive Caregiver Proxy Access PRD',
            deliverableType: 'document',
            estimatedMinutes: 80,
            objective: 'Write a complete PRD covering Problem Statement, Target Personas, User Stories (with Gherkin syntax), Success Metrics, and Out of Scope boundaries.',
            instructionsMarkdown: `### PRD Structural Requirements:
1. **Problem Statement & Opportunity**: Quantify the patient/caregiver drop-off.
2. **Target Personas**: Patient (Primary Owner) & Authorized Caregiver (Proxy).
3. **User Stories & Acceptance Criteria**: Minimum 3 user stories formatted in *Given-When-Then* structure.
4. **Success Metrics**: North Star Metric (e.g. 30-Day Post-Op Medication Adherence) and secondary health metrics.
5. **Security & Privacy Guardrails**: How consent is granted, authenticated, and revoked.`,
            starterTemplate: `# Product Requirements Document: Caregiver Proxy Access
**Author**: Associate Product Manager Intern
**Status**: Draft for Engineering & Legal Review
**Target Release**: Q3 2026

## 1. Background & Problem Statement
[Describe why patients and caregivers struggle today]

## 2. Target Personas
- **Persona A (Elderly Patient - Helen, 74)**:
- **Persona B (Designated Caregiver - Mark, 45)**:

## 3. Key User Stories & Acceptance Criteria
### Story 1: Patient Grants Access
- **As a** patient, **I want to** invite my daughter via email/SMS, **so that** she can view my discharge instructions.
- **Acceptance Criteria**:
  - *Given* Helen is logged into her verified portal,
  - *When* she enters Mark's phone number and selects "Read-Only Medication Records",
  - *Then* a two-factor verification code is dispatched to Mark within 10 seconds.

### Story 2: Caregiver Access & Audit Trail
[Write Story 2]

## 4. Metrics & Success Criteria
- **North Star Metric**:
- **Guardrail Metric**:

## 5. Non-Functional & Regulatory Constraints
- HIPAA Consent Logging:
- Revocation SLA: Immediate (< 1 second)
`,
            rubricCriteria: [
              {
                id: 'rc-vh-1',
                title: 'User Story Clarity & Acceptance Criteria',
                weightPercentage: 40,
                description: 'Unambiguous requirements that engineers can build against without guesswork.',
                evaluationGuide: 'High score for strict Gherkin format and edge cases.',
              },
              {
                id: 'rc-vh-2',
                title: 'Strategic Metrics & Problem Definition',
                weightPercentage: 35,
                description: 'Measurable, relevant KPIs tied directly to business and health outcomes.',
                evaluationGuide: 'Clearly distinguishes leading vs lagging indicators.',
              },
              {
                id: 'rc-vh-3',
                title: 'Completeness & Boundary Management',
                weightPercentage: 25,
                description: 'Explicit definition of what is out of scope to avoid scope creep.',
                evaluationGuide: 'Demonstrates professional product discipline.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'intern-linearity-design',
    slug: 'linearity-product-design-systems',
    title: 'Product Design & Design Systems Simulation',
    companyName: 'Linearity Studio',
    companyTier: 'High-Growth Tech',
    companyLocation: 'Berlin, Germany (Remote Simulation)',
    companyDescription: 'Linearity builds high-performance vector design, animation, and UI authoring software for 3M+ creative professionals globally.',
    trackId: 'uiux-design',
    difficulty: 'Intermediate',
    durationWeeks: 3,
    estimatedTotalHours: 15,
    badgeTitle: 'Design Systems Specialist',
    summary: 'Structure scalable multi-tier design tokens, design dense enterprise data tables, and conduct WCAG AA accessibility compliance audits.',
    detailedOverview: `Join the Linearity Studio Product Design group. You will tackle complex interface ergonomics, component state matrices, and spatial design system tokens.`,
    whatYouWillLearn: [
      'Build semantic 3-tier design token architectures (Global, Semantic, Component)',
      'Design high-density data tables with sorting, filtering, and responsive row actions',
      'Audit color contrast ratios and keyboard navigation according to WCAG 2.1 AA standards',
      'Create comprehensive design handover documentation for front-end developers',
    ],
    prerequisites: ['Basic Figma knowledge', 'Understanding of UI components (buttons, inputs, modals)', 'Design curiosity'],
    toolsUsed: ['Figma', 'Design Tokens Spec', 'WCAG Contrast Tools', 'Component Anatomy'],
    graduatesCount: 820,
    rating: 4.90,
    supervisor: {
      id: 'sup-maya-lin',
      name: 'Maya Lin-Kowalski',
      title: 'Principal Design Systems Architect',
      department: 'Core Experience & Design Infrastructure',
      companyName: 'Linearity Studio',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Pioneer in token-driven multi-platform design systems. Passionate about typography hierarchy, accessibility, and microscopic design details.',
      communicationStyle: 'supportive_mentoring',
      systemInstructionPrompt: 'Be an encouraging, detail-oriented design mentor. Focus on spacing math, optical alignment, WCAG contrast, and systematic consistency.',
    },
    milestones: [
      {
        weekNumber: 1,
        id: 'ms-lin-week-1',
        title: 'Design Token Architecture & Component Tokenization',
        theme: 'Design Infrastructure & Tokens',
        overview: 'Create a scalable JSON token schema bridging Figma styles with CSS custom properties across light and dark themes.',
        skillsTaught: ['Design Tokens', 'Color Contrast Ratios', 'Developer Handover'],
        simulatedEmails: [
          {
            id: 'em-lin-101',
            senderName: 'Maya Lin-Kowalski',
            senderTitle: 'Principal Design Systems Architect',
            senderEmail: 'maya@linearity.internal',
            recipientEmail: 'intern@linearity.internal',
            subject: 'Welcome! Week 1: Enterprise Token Architecture',
            timestamp: 'Monday 10:00 AM',
            isImportant: true,
            body: `Hello and welcome to Linearity Studio!

We are unifying our Web and Desktop design system tokens. Your first project is building out the semantic token structure for our interactive states (Default, Hover, Active, Disabled, Focus-Visible).

Check out the starter specification and make sure all text colors pass WCAG AA 4.5:1 minimum contrast.

Warmly,
Maya`,
          },
        ],
        tasks: [
          {
            id: 'task-lin-1',
            milestoneId: 'ms-lin-week-1',
            title: 'Design Token Architecture Specification & Component Matrix',
            deliverableType: 'design-spec',
            estimatedMinutes: 75,
            objective: 'Define a 3-tier design token JSON specification and document component state rules for primary/secondary buttons and form inputs.',
            instructionsMarkdown: `### Specification Deliverable Requirements:
1. **Token Hierarchy**: Define Global primitives (e.g. \`color.slate.900\`), Semantic roles (e.g. \`color.text.primary\`), and Component-scoped tokens (e.g. \`button.primary.bg\`).
2. **Interactive States**: Provide color values, border tokens, and focus ring outlines for 5 distinct component states.
3. **Accessibility Audit Table**: List contrast ratios for all foreground/background pairings.`,
            starterTemplate: `# Design System Specification: Core Interactive Tokens
**System Version**: 2.4.0
**Author**: Product Design Intern

## 1. Token Taxonomy & Schema
\`\`\`json
{
  "color": {
    "brand": {
      "primary": { "value": "#1D4ED8", "type": "color" },
      "primary-hover": { "value": "#1E40AF", "type": "color" }
    },
    "text": {
      "primary": { "value": "{color.slate.900}", "type": "color" },
      "secondary": { "value": "{color.slate.600}", "type": "color" },
      "inverse": { "value": "#FFFFFF", "type": "color" }
    }
  }
}
\`\`\`

## 2. Component State Matrix (Primary Button)
| State | Background Token | Text Token | Border / Focus |
|---|---|---|---|
| Default | \`color.brand.primary\` | \`color.text.inverse\` | None |
| Hover | | | |
| Active (Pressed) | | | |
| Focus-Visible | | | 2px solid offset |
| Disabled | | | |

## 3. WCAG 2.1 AA Contrast Compliance
- Text Primary on Surface Default: **12.4:1** (Pass AAA)
- Text Secondary on Surface Default: **5.1:1** (Pass AA)
`,
            rubricCriteria: [
              {
                id: 'rc-lin-1',
                title: 'Token Structure & Taxonomy',
                weightPercentage: 40,
                description: 'Logical 3-tier layering with proper aliases and variable references.',
                evaluationGuide: 'Demonstrates deep grasp of design system engineering.',
              },
              {
                id: 'rc-lin-2',
                title: 'Accessibility & Contrast Ratios',
                weightPercentage: 35,
                description: 'All color combinations meet or exceed 4.5:1 WCAG AA standards.',
                evaluationGuide: 'Mathematically verified contrast calculations.',
              },
              {
                id: 'rc-lin-3',
                title: 'Engineering Handover Usability',
                weightPercentage: 25,
                description: 'Clear documentation format readily usable by front-end engineers.',
                evaluationGuide: 'Clean formatting, no ambiguity in state behaviors.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'intern-cybershield-soc',
    slug: 'cybershield-soc-analyst',
    title: 'SOC Analyst & Incident Response Trainee',
    companyName: 'CyberShield Global',
    companyTier: 'Fortune 500',
    companyLocation: 'Washington, D.C. (Remote Simulation)',
    companyDescription: 'CyberShield Global delivers managed threat detection and offensive security assessments to defense, banking, and critical infrastructure clients.',
    trackId: 'cybersecurity',
    difficulty: 'Intermediate',
    durationWeeks: 3,
    estimatedTotalHours: 18,
    badgeTitle: 'Certified Incident Responder',
    summary: 'Triage SIEM alert queues, analyze malicious email headers and PowerShell payloads, and formulate rapid containment remediation plans.',
    detailedOverview: `Defend enterprise networks against modern threat actors. Work alongside Senior Incident Handlers analyzing log telemetry, suspicious process trees, and persistence mechanisms.`,
    whatYouWillLearn: [
      'Deconstruct email MIME headers and SPF/DKIM/DMARC authentication failures',
      'Analyze Windows Event Logs (Event ID 4624, 4688, 7045) for lateral movement',
      'Map observed adversary tactics to the MITRE ATT&CK framework',
      'Author formal incident triage and containment runbooks',
    ],
    prerequisites: ['Basic networking concepts (IP, DNS, Ports)', 'Operating system fundamentals', 'Analytical mindset'],
    toolsUsed: ['Log Analysis', 'Wireshark concepts', 'MITRE ATT&CK Matrix', 'Threat Hunting Playbooks'],
    graduatesCount: 760,
    rating: 4.89,
    supervisor: {
      id: 'sup-alex-ramirez',
      name: 'Alex Ramirez, CISSP',
      title: 'Senior Incident Commander',
      department: 'Managed Threat Defense & Triage',
      companyName: 'CyberShield Global',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: '14 years in threat intelligence and incident response. Former SOC director leading defense against advanced persistent threat (APT) groups.',
      communicationStyle: 'direct_technical',
      systemInstructionPrompt: 'Be a sharp, urgent, and technically precise security lead. Emphasize MITRE ATT&CK mapping, evidence preservation, and fast containment.',
    },
    milestones: [
      {
        weekNumber: 1,
        id: 'ms-cs-sec-1',
        title: 'Phishing Ingestion & Malicious Payload Deobfuscation',
        theme: 'Email Security & Initial Access Analysis',
        overview: 'Analyze raw email artifacts from an executive spear-phishing attempt and deobfuscate an encoded PowerShell downloader payload.',
        skillsTaught: ['MIME Header Forensics', 'PowerShell Deobfuscation', 'MITRE ATT&CK T1566'],
        simulatedEmails: [
          {
            id: 'em-sec-101',
            senderName: 'Alex Ramirez, CISSP',
            senderTitle: 'Senior Incident Commander',
            senderEmail: 'aramirez@cybershield.internal',
            recipientEmail: 'intern@cybershield.internal',
            subject: 'URGENT Alert: CFO Spear-Phishing Artifact for Triage',
            timestamp: 'Monday 07:45 AM',
            isImportant: true,
            body: `Intern Team,

Our email gateway flagged an anomalous invoice message sent to the CFO. The SPF record was soft-failed and DKIM failed entirely.

I need you to parse the raw headers, extract the sending IP and relay path, and deobfuscate the base64-encoded command string attached in the macro. Complete the initial triage report ASAP.

Alex`,
          },
        ],
        tasks: [
          {
            id: 'task-sec-1',
            milestoneId: 'ms-cs-sec-1',
            title: 'Author SOC Incident Triage Report: Spear-Phishing Artifact',
            deliverableType: 'security-report',
            estimatedMinutes: 90,
            objective: 'Analyze email headers, evaluate DKIM/SPF anomalies, extract malicious C2 indicators of compromise (IOCs), and document the MITRE ATT&CK mapping.',
            instructionsMarkdown: `### Incident Report Requirements:
1. **Header Analysis**: Identify the True Originating IP, Return-Path, and Authentication-Results failure reasons.
2. **Deobfuscated Script Analysis**: Analyze the simulated command payload: \`powershell -nop -w hidden -enc JABjAGwAaQBlAG4AdAAg... \`
3. **Indicators of Compromise (IOCs)**: Tabulate IP addresses, domains, and SHA-256 hashes.
4. **MITRE ATT&CK Mapping**: Identify Techniques (e.g. T1566.001 Spearphishing Attachment, T1059.001 PowerShell).
5. **Recommended Containment**: Host isolation, firewall IP blocklist, and email tenant purge commands.`,
            starterTemplate: `# SOC Incident Triage Report: INC-2026-089
**Analyst**: Incident Response Trainee
**Classification**: High (Initial Access Attempt)
**Status**: Contained / Under Remediation

## 1. Executive Incident Summary
[Brief description of the adversary attack vector and impact]

## 2. Technical Header Forensics
- **Sender Claimed**: accounting@vendor-billing-corp.com
- **Originating Relay IP**: 198.51.100.42 (Autonomous System: AS9182 HostEurope)
- **SPF Verification**: FAIL
- **DKIM Signature**: INVALID_SIGNATURE

## 3. Payload Deobfuscation & Analysis
\`\`\`powershell
# Deobfuscated Command Output:
$c2 = "http://198.51.100.42:8080/stage2.bin"
# Analysis of what the script attempts to execute:
\`\`\`

## 4. Indicators of Compromise (IOCs)
| Type | Value | Context |
|---|---|---|
| IP | 198.51.100.42 | Attacker C2 Server |
| Domain | invoice-portal-update.org | Phishing Link |
| Hash (SHA-256) | | Malicious PDF Attachment |

## 5. Immediate Containment & Remediation Actions
1. Firewall Block Rule:
2. Endpoint Isolation:
3. Exchange Mailbox Purge:
`,
            rubricCriteria: [
              {
                id: 'rc-sec-1',
                title: 'Technical Forensic Depth',
                weightPercentage: 40,
                description: 'Accurately parses headers, mail authentication records, and payload mechanics.',
                evaluationGuide: 'Demonstrates true SOC analyst investigative skills.',
              },
              {
                id: 'rc-sec-2',
                title: 'MITRE ATT&CK & IOC Hygiene',
                weightPercentage: 35,
                description: 'Accurate technique identification and clean, actionable IOC data formatting.',
                evaluationGuide: 'Follows industry cyber threat intelligence standards.',
              },
              {
                id: 'rc-sec-3',
                title: 'Containment Actionability',
                weightPercentage: 25,
                description: 'Concrete, pragmatic steps to isolate affected endpoints and block adversary relays.',
                evaluationGuide: 'Direct commands and security policy recommendations.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'intern-cortex-ai',
    slug: 'cortex-ai-systems-engineer',
    title: 'Generative AI & LLM Systems Simulation',
    companyName: 'Cortex Intelligence Labs',
    companyTier: 'High-Growth Tech',
    companyLocation: 'San Francisco, CA (Remote Simulation)',
    companyDescription: 'Cortex builds enterprise retrieval-augmented generation (RAG) platforms and autonomous agent evaluation frameworks for Fortune 500 enterprises.',
    trackId: 'artificial-intelligence',
    difficulty: 'Intermediate',
    durationWeeks: 3,
    estimatedTotalHours: 16,
    badgeTitle: 'LLM Systems Practitioner',
    summary: 'Build semantic chunking pipelines, evaluate vector embeddings against hallucination benchmarks, and author guardrail policies for autonomous agents.',
    detailedOverview: `Experience the cutting edge of applied AI engineering. As an AI Systems Intern at Cortex Labs, you will work on RAG architecture, vector search optimization, and synthetic evaluation pipelines.`,
    whatYouWillLearn: [
      'Design context-aware semantic document chunking and metadata enrichment pipelines',
      'Benchmark dense vector embeddings against sparse BM25 hybrid search',
      'Implement structured JSON function-calling schema validators for multi-turn agents',
      'Author LLM evaluation rubrics assessing factual accuracy, latency, and token efficiency',
    ],
    prerequisites: ['Python proficiency', 'Basic understanding of transformer embeddings and vector databases', 'API integration basics'],
    toolsUsed: ['Python / PyTorch', 'Vector Embeddings', 'RAG Triad Metrics', 'JSON Schema', 'Git'],
    graduatesCount: 1120,
    rating: 4.96,
    supervisor: {
      id: 'sup-dr-aravind-nair',
      name: 'Dr. Aravind Nair',
      title: 'Head of Applied AI Research',
      department: 'Enterprise AI & Agentic Systems',
      companyName: 'Cortex Intelligence Labs',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'PhD in NLP from Stanford. 10+ years deploying large-scale neural search and generative AI pipelines.',
      communicationStyle: 'direct_technical',
      systemInstructionPrompt: 'Be a visionary yet rigorous AI research leader. Require benchmark data, latency metrics, and guardrail validations for every AI design.',
    },
    milestones: [],
  },
  {
    id: 'intern-neura-analytics',
    slug: 'neura-data-science-analytics',
    title: 'Customer Data Science & Predictive Churn Modeling',
    companyName: 'NeuraHealth Analytics',
    companyTier: 'High-Growth Tech',
    companyLocation: 'Boston, MA (Remote Simulation)',
    companyDescription: 'NeuraHealth provides predictive behavioral analytics and patient adherence platforms for clinical health systems.',
    trackId: 'data-science-ai',
    difficulty: 'Beginner',
    durationWeeks: 3,
    estimatedTotalHours: 14,
    badgeTitle: 'Data Science Specialist',
    summary: 'Perform exploratory data analysis (EDA), engineer behavioral cohort features in SQL/Pandas, and train predictive machine learning classifiers.',
    detailedOverview: `Step into data science in healthcare tech. Analyze 250,000+ patient engagement records to identify early risk factors of subscription churn and therapy discontinuation.`,
    whatYouWillLearn: [
      'Write complex SQL window functions and cohort aggregations',
      'Conduct statistical hypothesis testing and feature correlation matrices in Python',
      'Train, evaluate, and calibrate Logistic Regression and Random Forest models (ROC-AUC > 0.88)',
      'Translate model feature importances into executive business recommendations',
    ],
    prerequisites: ['Python basics (Pandas, NumPy)', 'Familiarity with SQL queries', 'Basic statistics'],
    toolsUsed: ['Python / Pandas', 'SQL Analytics', 'Scikit-Learn', 'Matplotlib / Seaborn', 'Jupyter'],
    graduatesCount: 1540,
    rating: 4.91,
    supervisor: {
      id: 'sup-samira-patel',
      name: 'Samira Patel',
      title: 'Principal Data Scientist',
      department: 'Behavioral Insights & Machine Learning',
      companyName: 'NeuraHealth Analytics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Specialist in predictive customer modeling and medical analytics with 9 years turning messy telemetry into actionable ML pipelines.',
      communicationStyle: 'supportive_mentoring',
      systemInstructionPrompt: 'Be an encouraging data science mentor. Emphasize data hygiene, leak-free validation splits, and business impact interpretation.',
    },
    milestones: [],
  },
  {
    id: 'intern-omnicloud-infra',
    slug: 'omnicloud-cloud-platform-devops',
    title: 'Cloud Infrastructure & Kubernetes SRE Simulation',
    companyName: 'OmniCloud Global',
    companyTier: 'Fortune 500',
    companyLocation: 'Seattle, WA (Remote Simulation)',
    companyDescription: 'OmniCloud powers multi-cloud resilience and container orchestration platforms for global fintech and SaaS enterprises.',
    trackId: 'cloud-computing',
    difficulty: 'Intermediate',
    durationWeeks: 3,
    estimatedTotalHours: 16,
    badgeTitle: 'Cloud Platform Engineer',
    summary: 'Write declarative Terraform infrastructure modules, configure Kubernetes Helm charts with auto-scaling, and build zero-downtime CI/CD pipelines.',
    detailedOverview: `Experience the fast-paced world of Cloud Engineering and SRE. Work with Kubernetes deployments, container security scanning, and automated canary rollouts.`,
    whatYouWillLearn: [
      'Write modular Terraform IaC for multi-region VPC and compute architectures',
      'Configure Kubernetes deployments with Horizontal Pod Autoscalers (HPA) and resource limits',
      'Set up GitHub Actions CI/CD pipelines with automated container vulnerability scanning',
      'Configure Prometheus alerts and Grafana latency dashboards',
    ],
    prerequisites: ['Basic Linux/Bash navigation', 'Familiarity with Docker & Git', 'Basic networking'],
    toolsUsed: ['Docker', 'Kubernetes / Helm', 'Terraform', 'AWS / GCP Concepts', 'CI/CD Pipelines'],
    graduatesCount: 890,
    rating: 4.93,
    supervisor: {
      id: 'sup-jordan-blake',
      name: 'Jordan Blake',
      title: 'Staff Site Reliability Engineer',
      department: 'Core Cloud Platforms',
      companyName: 'OmniCloud Global',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: '11 years scaling Kubernetes clusters and building developer platforms across AWS and GCP.',
      communicationStyle: 'direct_technical',
      systemInstructionPrompt: 'Be a pragmatic SRE mentor. Focus on zero-downtime rollouts, idempotency, and defense-in-depth infrastructure security.',
    },
    milestones: [],
  },
  {
    id: 'intern-kinetic-growth',
    slug: 'kinetic-growth-marketing-analytics',
    title: 'Performance Marketing & Growth Funnel Simulation',
    companyName: 'Kinetic Velocity',
    companyTier: 'High-Growth Tech',
    companyLocation: 'New York, NY (Remote Simulation)',
    companyDescription: 'Kinetic is an enterprise B2B SaaS platform accelerating revenue operations for over 4,000 global subscription businesses.',
    trackId: 'digital-marketing',
    difficulty: 'Beginner',
    durationWeeks: 2,
    estimatedTotalHours: 12,
    badgeTitle: 'Growth Marketing Analyst',
    summary: 'Analyze multi-touch attribution models, execute A/B landing page split tests, and optimize paid acquisition campaigns to lower Customer Acquisition Cost (CAC).',
    detailedOverview: `Work as a Growth Marketing Intern in high-velocity tech. You will audit user acquisition channels, craft high-converting ad copy and landing page tests, and calculate LTV:CAC ratios.`,
    whatYouWillLearn: [
      'Calculate payback period, blended CAC, and customer lifetime value (LTV)',
      'Design high-converting A/B copy and UX experiments with statistical significance',
      'Build multi-touch attribution reports across Search, Paid Social, and Organic channels',
      'Formulate comprehensive quarterly growth experiment roadmaps',
    ],
    prerequisites: ['Analytical curiosity', 'Basic spreadsheet/Excel skills', 'Strong copywriting intuition'],
    toolsUsed: ['Growth Analytics', 'Excel / Sheets', 'A/B Testing Frameworks', 'SEO & Ad Specs'],
    graduatesCount: 940,
    rating: 4.87,
    supervisor: {
      id: 'sup-claire-duvall',
      name: 'Claire Duvall',
      title: 'VP of Growth & Demand Gen',
      department: 'Marketing Operations & Growth',
      companyName: 'Kinetic Velocity',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Growth leader with 12+ years scaling SaaS companies from Series A to IPO through data-driven performance marketing.',
      communicationStyle: 'executive_strategic',
      systemInstructionPrompt: 'Be a high-energy, metrics-driven growth mentor. Insist on clear CAC/LTV math, crisp messaging hypotheses, and rapid experimental iteration.',
    },
    milestones: [],
  },
  {
    id: 'intern-stride-consulting',
    slug: 'stride-business-strategy-consulting',
    title: 'Strategic Operations & Market Expansion Simulation',
    companyName: 'Stride Advisory Partners',
    companyTier: 'Fortune 500',
    companyLocation: 'Chicago, IL (Remote Simulation)',
    companyDescription: 'Stride Advisory Partners is a premier management consulting firm advising Fortune 500 executives on digital transformation and market expansion.',
    trackId: 'business-strategy',
    difficulty: 'Beginner',
    durationWeeks: 3,
    estimatedTotalHours: 15,
    badgeTitle: 'Management Strategy Analyst',
    summary: 'Evaluate European market entry strategies, build 5-year unit economics financial models, and deliver board-ready strategic presentations.',
    detailedOverview: `Step into top-tier management consulting. As a Business Strategy Intern, you will synthesize competitive intelligence, calculate Total Addressable Market (TAM), and prepare C-suite strategic memos.`,
    whatYouWillLearn: [
      'Structure ambiguous business problems using MECE frameworks and issue trees',
      'Conduct bottom-up and top-down TAM/SAM/SOM market sizing models',
      'Model 5-year pro-forma unit economics and break-even timelines in Excel',
      'Create executive slide structures with clear action-oriented takeaways',
    ],
    prerequisites: ['Critical thinking', 'Comfort with basic Excel calculations', 'Structured writing'],
    toolsUsed: ['Excel Financial Modeling', 'MECE Frameworks', 'Executive Slide Design', 'Market Sizing'],
    graduatesCount: 1310,
    rating: 4.94,
    supervisor: {
      id: 'sup-henry-vanderbilt',
      name: 'Henry Vanderbilt',
      title: 'Senior Engagement Partner',
      department: 'Corporate Strategy & Transformation',
      companyName: 'Stride Advisory Partners',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Former McKinsey principal with 18 years advising global conglomerates on mergers, acquisitions, and organic growth strategies.',
      communicationStyle: 'meticulous_analytical',
      systemInstructionPrompt: 'Be a polished, exacting consulting mentor. Expect strict MECE logic, robust unit economics, and executive slide clarity.',
    },
    pricingTier: 'free',
    projectsCount: 3,
    milestones: [],
  },
  {
    id: 'intern-nova-frontend',
    slug: 'nova-labs-frontend-developer',
    title: 'Frontend Developer Internship',
    companyName: 'Nova Labs',
    companyTier: 'High-Growth Tech',
    companyLocation: 'San Francisco, CA (Remote Simulation)',
    companyDescription: 'Nova Labs builds modern developer tools, real-time collaboration engines, and interactive web canvas software for creative teams.',
    trackId: 'software-engineering',
    difficulty: 'Beginner',
    durationWeeks: 4,
    estimatedTotalHours: 16,
    badgeTitle: 'Frontend Systems Engineer',
    pricingTier: 'free',
    projectsCount: 4,
    summary: 'Build responsive React interface components, implement accessible design systems with Tailwind CSS, and optimize client-side bundle performance.',
    detailedOverview: `Step into a modern frontend engineering team at Nova Labs. Work on interactive dashboard widgets, asynchronous state caching with TanStack Query, and WCAG AA accessibility compliance across mobile and desktop.`,
    whatYouWillLearn: [
      'Build reusable, strictly typed React 18 component libraries with TypeScript',
      'Implement responsive layouts and fluid token scales using modern Tailwind CSS',
      'Optimize Web Vitals (LCP, FID, CLS) and component re-render trees',
      'Author Jest and React Testing Library suites with 90%+ branch coverage',
    ],
    prerequisites: ['HTML / CSS fundamentals', 'Basic JavaScript / TypeScript', 'Familiarity with React components'],
    toolsUsed: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Jest / RTL', 'Git'],
    graduatesCount: 2180,
    rating: 4.95,
    supervisor: {
      id: 'sup-chloe-zhao',
      name: 'Chloe Zhao',
      title: 'Staff Frontend Engineer & UI Architect',
      department: 'Web Platforms & Design Systems',
      companyName: 'Nova Labs',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Open-source maintainer and frontend architect with 8+ years building enterprise component libraries and high-performance web applications.',
      communicationStyle: 'supportive_mentoring',
      systemInstructionPrompt: 'Be an encouraging yet detail-oriented frontend mentor. Focus on component composability, clean CSS semantics, and accessible keyboard navigation.',
    },
    milestones: [
      {
        weekNumber: 1,
        id: 'ms-nova-1',
        title: 'Component Design Tokens & Accessible Button Matrix',
        theme: 'Design Systems & TypeScript',
        overview: 'Build a production-grade button and input component system adhering to strict WCAG 2.1 AA accessibility standards.',
        skillsTaught: ['React', 'TypeScript', 'Tailwind CSS', 'ARIA Semantics'],
        simulatedEmails: [],
        tasks: [],
      },
      {
        weekNumber: 2,
        id: 'ms-nova-2',
        title: 'Asynchronous State Management & API Data Grid',
        theme: 'Data Fetching & Caching',
        overview: 'Integrate real-time analytics feeds with optimistic UI updates, pagination, and error boundary fallbacks.',
        skillsTaught: ['State Management', 'REST APIs', 'Error Boundaries'],
        simulatedEmails: [],
        tasks: [],
      },
      {
        weekNumber: 3,
        id: 'ms-nova-3',
        title: 'Interactive Filter Builder & Canvas Visualization',
        theme: 'Complex UI Patterns',
        overview: 'Develop a drag-and-drop query filter builder with keyboard shortcuts and undo/redo history.',
        skillsTaught: ['DOM Events', 'Custom Hooks', 'Performance Profiling'],
        simulatedEmails: [],
        tasks: [],
      },
      {
        weekNumber: 4,
        id: 'ms-nova-4',
        title: 'Performance Optimization & Automated CI Test Suite',
        theme: 'Production Readiness',
        overview: 'Benchmark bundle sizes, eliminate layout thrashing, and configure automated GitHub Actions PR verification.',
        skillsTaught: ['Core Web Vitals', 'Testing Library', 'CI/CD Pipelines'],
        simulatedEmails: [],
        tasks: [],
      },
    ],
  },
  {
    id: 'intern-insightworks-data',
    slug: 'insightworks-data-analyst',
    title: 'Data Analyst Internship',
    companyName: 'InsightWorks',
    companyTier: 'Fortune 500',
    companyLocation: 'Chicago, IL (Remote Simulation)',
    companyDescription: 'InsightWorks is a global enterprise analytics consultancy delivering revenue intelligence and customer lifecycle models to Fortune 500 brands.',
    trackId: 'data-science-ai',
    difficulty: 'Intermediate',
    durationWeeks: 6,
    estimatedTotalHours: 24,
    badgeTitle: 'Enterprise Data Analyst',
    pricingTier: 'free',
    projectsCount: 5,
    summary: 'Analyze complex multi-table SQL schemas, build executive Tableau dashboards, and formulate data-driven cohort retention recommendations.',
    detailedOverview: `Experience the rigor of management-level data analytics at InsightWorks. Ingest messy multi-channel marketing data, perform cohort LTV analyses, and present board-ready strategic summaries to practice partners.`,
    whatYouWillLearn: [
      'Write advanced PostgreSQL window functions (DENSE_RANK, LEAD/LAG, NTILE)',
      'Conduct statistical hypothesis testing and feature correlation matrices in Python',
      'Design interactive executive KPI dashboards with parameter controls and drill-downs',
      'Formulate structured business problem trees using MECE frameworks',
    ],
    prerequisites: ['Proficiency in basic SQL queries (SELECT, JOIN, GROUP BY)', 'Working knowledge of Excel or Sheets', 'Curiosity for business problem solving'],
    toolsUsed: ['SQL / PostgreSQL', 'Python / Pandas', 'Tableau / BI', 'Excel Modeling', 'Git'],
    graduatesCount: 1890,
    rating: 4.93,
    supervisor: {
      id: 'sup-marcus-hayes',
      name: 'Marcus Hayes',
      title: 'Principal Analytics Director',
      department: 'Customer Intelligence & Revenue Growth',
      companyName: 'InsightWorks',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Former McKinsey data lead with 14 years turning complex enterprise relational datasets into multi-million dollar revenue transformations.',
      communicationStyle: 'meticulous_analytical',
      systemInstructionPrompt: 'Be a sharp, analytical consulting mentor. Emphasize data hygiene, metric definitions, statistical rigor, and executive storytelling.',
    },
    milestones: [],
  },
  {
    id: 'intern-studio-north-ux',
    slug: 'studio-north-ui-ux-design',
    title: 'UI/UX Design Internship',
    companyName: 'Studio North',
    companyTier: 'High-Growth Tech',
    companyLocation: 'Toronto, ON (Remote Simulation)',
    companyDescription: 'Studio North is an award-winning digital product studio crafting high-craft consumer applications and SaaS platforms for visionary startups.',
    trackId: 'uiux-design',
    difficulty: 'Beginner',
    durationWeeks: 4,
    estimatedTotalHours: 16,
    badgeTitle: 'Product Experience Designer',
    pricingTier: 'free',
    projectsCount: 4,
    summary: 'Conduct generative user interviews, build high-fidelity Figma prototypes, and establish scalable design system tokens.',
    detailedOverview: `Immerse yourself in human-centered product design at Studio North. Redesign a complex mobile onboarding journey, conduct usability tests with synthetic candidate feedback, and deliver developer-ready Figma specifications.`,
    whatYouWillLearn: [
      'Conduct user problem discovery and synthesize thematic affinity maps',
      'Create responsive auto-layout components and interactive Figma prototypes',
      'Establish WCAG 2.1 AA accessible typography scales and color tokens',
      'Write exhaustive design spec documentation and edge-case error states',
    ],
    prerequisites: ['Familiarity with Figma interface', 'Interest in visual hierarchy and typography', 'Strong empathy for user needs'],
    toolsUsed: ['Figma', 'FigJam', 'Design Tokens', 'User Testing', 'WCAG Audit'],
    graduatesCount: 1450,
    rating: 4.96,
    supervisor: {
      id: 'sup-claire-vandenberg',
      name: 'Claire Vandenberg',
      title: 'Head of Product Design',
      department: 'Experience Architecture',
      companyName: 'Studio North',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Design director with 11 years leading UX across fintech and consumer social apps. Passionate about micro-interactions and typographic rhythm.',
      communicationStyle: 'supportive_mentoring',
      systemInstructionPrompt: 'Be an inspiring design mentor. Focus on optical alignment, whitespace balance, user empathy, and frictionless interaction flows.',
    },
    milestones: [],
  },
  {
    id: 'intern-vertex-pm',
    slug: 'vertex-product-management',
    title: 'Product Management Internship',
    companyName: 'Vertex',
    companyTier: 'High-Growth Tech',
    companyLocation: 'Seattle, WA (Remote Simulation)',
    companyDescription: 'Vertex powers cloud developer productivity tools and API gateway observability for modern engineering organizations.',
    trackId: 'product-management',
    difficulty: 'Intermediate',
    durationWeeks: 5,
    estimatedTotalHours: 20,
    badgeTitle: 'Technical Product Manager',
    pricingTier: 'free',
    projectsCount: 4,
    summary: 'Lead API gateway observability feature discovery, write comprehensive PRDs with user stories, and conduct sprint RICE prioritization.',
    detailedOverview: `Experience the daily life of a Technical Product Manager at Vertex. Balance developer pain points, competitive feature gaps, and engineering capacity while preparing C-suite roadmaps and launch strategies.`,
    whatYouWillLearn: [
      'Author unambiguous Product Requirement Documents (PRDs) with acceptance criteria',
      'Execute RICE and Kano prioritization frameworks across multi-quarter roadmaps',
      'Define North Star metrics, input KPIs, and conversion telemetry schemas',
      'Facilitate cross-functional sprint planning between design, engineering, and sales',
    ],
    prerequisites: ['Strong written communication', 'Analytical mindset', 'Interest in tech products and developer workflows'],
    toolsUsed: ['PRD Frameworks', 'RICE Scoring', 'User Story Mapping', 'SQL Analytics', 'Figma Review'],
    graduatesCount: 1320,
    rating: 4.92,
    supervisor: {
      id: 'sup-arun-sharma',
      name: 'Arun Sharma',
      title: 'VP of Product Management',
      department: 'Core Developer Platform',
      companyName: 'Vertex',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Former Amazon and Stripe product leader with 13 years managing cloud platforms and developer infrastructure.',
      communicationStyle: 'executive_strategic',
      systemInstructionPrompt: 'Be an incisive, strategic product leader. Push for deep customer insights, crisp success criteria, and clear scope boundaries.',
    },
    milestones: [],
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-student-dev',
  fullName: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  headline: 'Aspiring Software Engineer & Computer Science Junior',
  bio: 'Studying Computer Science and Distributed Systems. Passionate about high-throughput APIs, cloud infrastructure, and practical workplace challenges.',
  targetCareerTrack: 'software-engineering',
  experienceLevel: 'Intermediate',
  weeklyHourCommitment: 10,
  interests: ['Distributed Systems', 'Backend Engineering', 'Cloud Computing', 'System Architecture'],
  enrolledInternships: {
    'intern-cloudscale-backend': {
      internshipId: 'intern-cloudscale-backend',
      enrolledDate: '2026-08-15',
      status: 'active',
      currentWeekNumber: 1,
      completedTaskIds: [],
      submissions: {},
      chatHistory: [
        {
          id: 'chat-init-1',
          sender: 'supervisor',
          senderName: 'Elena Rostova',
          timestamp: 'Yesterday at 09:16 AM',
          text: `Welcome to CloudScale Systems! I'm Elena, your engineering lead for this simulation.

Take a look at the Week 1 milestone briefing in your workspace. We need to lock down our Tenant Ingestion API schema and validation rules before we start writing the high-throughput ingestion workers. Let me know if you run into any questions about our SLA targets!`,
        },
      ],
    },
  },
  portfolio: [
    {
      id: 'port-sample-1',
      internshipId: 'intern-cloudscale-backend',
      internshipTitle: 'Distributed Backend Engineering Simulation',
      companyName: 'CloudScale Systems',
      trackId: 'software-engineering',
      projectTitle: 'Tenant Metrics Ingest API & TypeScript Validation Schema',
      deliverableType: 'code',
      completedDate: '2026-08-18',
      summary: 'Engineered high-throughput TypeScript validation schemas for distributed metrics ingestion with 100% test coverage over malformed payload edge cases.',
      keySkills: ['TypeScript', 'API Contracts', 'JSON Schema', 'Unit Testing'],
      score: 94,
      credentialUrl: 'https://internlab.dev/verify/credential/IL-849201-CS',
    },
  ],
  certificates: [
    {
      id: 'cert-sample-1',
      internshipId: 'intern-cloudscale-backend',
      internshipTitle: 'Distributed Backend Engineering Simulation',
      companyName: 'CloudScale Systems',
      studentName: 'Alex Morgan',
      issueDate: 'August 2026',
      credentialId: 'IL-CS-2026-94821',
      verificationCode: '8F9A-4E2B-9C01-7D4F',
      skillsCertified: ['Distributed Systems', 'API Contracts', 'Sliding Window Rate Limiting', 'Post-Mortem Analysis'],
      totalHoursCompleted: 18,
    },
  ],
  stats: {
    simulationsCompleted: 1,
    hoursLogged: 18,
    skillsMastered: 8,
    averageReviewScore: 94,
  },
};
