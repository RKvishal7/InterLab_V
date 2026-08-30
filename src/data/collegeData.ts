export interface CollegeStudent {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
  currentInternship: string;
  company: string;
  track: string;
  progressPercent: number;
  averageScore: number;
  status: 'On Track' | 'Active' | 'Completed' | 'At-Risk';
  lastActive: string;
  lastActiveHoursAgo: number;
  completedDeliverables: number;
  totalDeliverables: number;
  riskReasons?: string[];
  skillsMastered: string[];
}

export interface CollegeProgram {
  id: string;
  name: string;
  department: string;
  term: string;
  enrolledStudents: number;
  activeInternships: number;
  completionRate: number;
  averageScore: number;
  leadFaculty: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
  recommendedTracks: string[];
}

export interface CollegeSkillMetric {
  name: string;
  category: 'Languages & Core' | 'Data & AI' | 'Product & Design' | 'Cloud & Systems';
  proficientStudentsCount: number;
  averageProficiency: number; // 0-100
  industryHiringBar: number; // 0-100
  quarterlyGrowth: number; // percentage growth e.g. +14%
  topSimulation: string;
}

export const COLLEGE_INSTITUTION_PROFILE = {
  institutionName: 'Apex Institute of Technology & Sciences',
  subDepartment: 'College of Computing & Career Accelerator',
  campusLocation: 'Boston, MA',
  academicYear: '2026–2027 Academic Year',
  directorName: 'Dr. Eleanor Vance',
  directorTitle: 'Associate Dean of Experiential Education & Corporate Partnerships',
  lmsIntegration: 'Canvas LMS + Handshake SSO (Active)',
  accreditationStatus: 'ABET & Regional Higher-Ed Verified',
};

export const COLLEGE_OVERVIEW_METRICS = {
  totalStudents: 1420,
  totalStudentsChange: '+18.4% vs last term',
  activeInternships: 864,
  activeInternshipsChange: '60.8% active engagement',
  completionRate: 88.4,
  completionRateChange: '+6.2% improvement',
  averagePerformance: 87.2,
  averagePerformanceGrade: 'A- (Proficient)',
  totalDeliverablesReviewed: 3480,
  averageTimeSpentHours: 42.5,
  corporateHiringPartners: 48,
  atRiskCount: 14,
};

export const COLLEGE_STUDENTS: CollegeStudent[] = [
  {
    id: 'stu-101',
    name: 'Alex Morgan',
    email: 'alex.morgan@apex.edu',
    studentId: 'AIT-2026-9482',
    department: 'Computer Science',
    year: 'Senior (Class of 2027)',
    currentInternship: 'Frontend Developer Virtual Internship',
    company: 'Nova Labs',
    track: 'Software Engineering',
    progressPercent: 100,
    averageScore: 89,
    status: 'Completed',
    lastActive: '2 hours ago',
    lastActiveHoursAgo: 2,
    completedDeliverables: 4,
    totalDeliverables: 4,
    skillsMastered: ['React', 'JavaScript', 'Tailwind CSS', 'WCAG AA', 'Git']
  },
  {
    id: 'stu-102',
    name: 'Jordan Rivera',
    email: 'jordan.rivera@apex.edu',
    studentId: 'AIT-2026-4190',
    department: 'Data Science & Analytics',
    year: 'Junior (Class of 2028)',
    currentInternship: 'Data Analytics & Business Intelligence',
    company: 'QuantX Capital',
    track: 'Data Science & AI',
    progressPercent: 75,
    averageScore: 94,
    status: 'On Track',
    lastActive: '4 hours ago',
    lastActiveHoursAgo: 4,
    completedDeliverables: 3,
    totalDeliverables: 4,
    skillsMastered: ['Python', 'Data Analysis', 'SQL', 'Pandas', 'Tableau']
  },
  {
    id: 'stu-103',
    name: 'Marcus Vance',
    email: 'marcus.v@apex.edu',
    studentId: 'AIT-2026-8831',
    department: 'Computer Science',
    year: 'Senior (Class of 2027)',
    currentInternship: 'Distributed Systems & Cloud Backend',
    company: 'CloudScale Systems',
    track: 'Software Engineering',
    progressPercent: 30,
    averageScore: 68,
    status: 'At-Risk',
    lastActive: '9 days ago',
    lastActiveHoursAgo: 216,
    completedDeliverables: 1,
    totalDeliverables: 4,
    riskReasons: [
      'Inactive for 9+ days',
      'Milestone 2 Rate Limiter deliverable overdue by 6 days',
      'Code quality score 68% below 75% cohort threshold'
    ],
    skillsMastered: ['Distributed Systems', 'Go', 'API Contracts']
  },
  {
    id: 'stu-104',
    name: 'Chloe Kim',
    email: 'chloe.kim@apex.edu',
    studentId: 'AIT-2026-5520',
    department: 'Human-Computer Interaction',
    year: 'Senior (Class of 2027)',
    currentInternship: 'Product Design & Design Systems',
    company: 'Nova Labs',
    track: 'UI/UX Design',
    progressPercent: 90,
    averageScore: 96,
    status: 'On Track',
    lastActive: '1 day ago',
    lastActiveHoursAgo: 24,
    completedDeliverables: 4,
    totalDeliverables: 4,
    skillsMastered: ['UI Design', 'Figma', 'Design Tokens', 'User Research', 'Design Systems']
  },
  {
    id: 'stu-105',
    name: 'Devon Wright',
    email: 'devon.w@apex.edu',
    studentId: 'AIT-2026-7241',
    department: 'Software Engineering',
    year: 'Sophomore (Class of 2029)',
    currentInternship: 'Enterprise React & State Architecture',
    company: 'FinTech Global',
    track: 'Software Engineering',
    progressPercent: 25,
    averageScore: 64,
    status: 'At-Risk',
    lastActive: '12 days ago',
    lastActiveHoursAgo: 288,
    completedDeliverables: 1,
    totalDeliverables: 4,
    riskReasons: [
      'Inactive for 12 days',
      'Failed Jest unit test suite criterion on checkout calculation',
      'Unread supervisor message from Sarah Chen'
    ],
    skillsMastered: ['JavaScript', 'Jest']
  },
  {
    id: 'stu-106',
    name: 'Priya Sharma',
    email: 'priya.s@apex.edu',
    studentId: 'AIT-2026-3392',
    department: 'Artificial Intelligence',
    year: 'Master of CS (Class of 2027)',
    currentInternship: 'Generative AI & LLM Systems',
    company: 'Nexus AI Research',
    track: 'Data Science & AI',
    progressPercent: 85,
    averageScore: 98,
    status: 'On Track',
    lastActive: '30 mins ago',
    lastActiveHoursAgo: 0.5,
    completedDeliverables: 3,
    totalDeliverables: 4,
    skillsMastered: ['Python', 'Prompt Engineering', 'RAG Architecture', 'Vector Databases', 'PyTorch']
  },
  {
    id: 'stu-107',
    name: 'Ethan Gallagher',
    email: 'ethan.g@apex.edu',
    studentId: 'AIT-2026-1184',
    department: 'Computer Science',
    year: 'Junior (Class of 2028)',
    currentInternship: 'Full-Stack Web Development',
    company: 'Vanguard Systems',
    track: 'Software Engineering',
    progressPercent: 50,
    averageScore: 82,
    status: 'Active',
    lastActive: '3 days ago',
    lastActiveHoursAgo: 72,
    completedDeliverables: 2,
    totalDeliverables: 4,
    skillsMastered: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'stu-108',
    name: 'Taylor Brooks',
    email: 'taylor.b@apex.edu',
    studentId: 'AIT-2026-6648',
    department: 'Information Systems',
    year: 'Senior (Class of 2027)',
    currentInternship: 'Cybersecurity Threat Modeling & SOC',
    company: 'Apex Sentinel',
    track: 'Cybersecurity',
    progressPercent: 15,
    averageScore: 70,
    status: 'At-Risk',
    lastActive: '7 days ago',
    lastActiveHoursAgo: 168,
    completedDeliverables: 0,
    totalDeliverables: 4,
    riskReasons: [
      'Milestone 1 Incident Response Brief not started',
      'No submission logged for 7 days'
    ],
    skillsMastered: ['Network Protocols']
  }
];

export const COLLEGE_AT_RISK_STUDENTS = COLLEGE_STUDENTS.filter(s => s.status === 'At-Risk');

export const COLLEGE_TOP_SKILLS: CollegeSkillMetric[] = [
  {
    name: 'JavaScript',
    category: 'Languages & Core',
    proficientStudentsCount: 684,
    averageProficiency: 82,
    industryHiringBar: 75,
    quarterlyGrowth: 18,
    topSimulation: 'Frontend Developer (Nova Labs)'
  },
  {
    name: 'Data Analysis',
    category: 'Data & AI',
    proficientStudentsCount: 540,
    averageProficiency: 86,
    industryHiringBar: 78,
    quarterlyGrowth: 24,
    topSimulation: 'Data Analytics (QuantX Capital)'
  },
  {
    name: 'UI Design',
    category: 'Product & Design',
    proficientStudentsCount: 420,
    averageProficiency: 84,
    industryHiringBar: 72,
    quarterlyGrowth: 15,
    topSimulation: 'Design Systems (Nova Labs)'
  },
  {
    name: 'Python',
    category: 'Data & AI',
    proficientStudentsCount: 612,
    averageProficiency: 89,
    industryHiringBar: 80,
    quarterlyGrowth: 28,
    topSimulation: 'Generative AI Systems (Nexus AI)'
  },
  {
    name: 'React',
    category: 'Languages & Core',
    proficientStudentsCount: 512,
    averageProficiency: 79,
    industryHiringBar: 76,
    quarterlyGrowth: 22,
    topSimulation: 'Enterprise React (FinTech Global)'
  },
  {
    name: 'Cloud & DevOps',
    category: 'Cloud & Systems',
    proficientStudentsCount: 388,
    averageProficiency: 81,
    industryHiringBar: 78,
    quarterlyGrowth: 31,
    topSimulation: 'Distributed Backend (CloudScale)'
  }
];

export const COLLEGE_PROGRAMS: CollegeProgram[] = [
  {
    id: 'prog-cs-capstone',
    name: 'CS Senior Experiential Capstone (Fall 2026)',
    department: 'Department of Computer Science',
    term: 'Fall 2026 (Aug – Dec)',
    enrolledStudents: 420,
    activeInternships: 388,
    completionRate: 92.4,
    averageScore: 89.2,
    leadFaculty: 'Prof. David K. Miller',
    status: 'In Progress',
    recommendedTracks: ['Software Engineering', 'Cloud & DevOps', 'Cybersecurity']
  },
  {
    id: 'prog-ds-accelerator',
    name: 'Data Science & Applied AI Immersion',
    department: 'Data Science Institute',
    term: 'Fall 2026 (Aug – Dec)',
    enrolledStudents: 310,
    activeInternships: 280,
    completionRate: 88.0,
    averageScore: 91.5,
    leadFaculty: 'Dr. Anita Roy',
    status: 'In Progress',
    recommendedTracks: ['Data Science & AI', 'Business Strategy']
  },
  {
    id: 'prog-fintech-bootcamp',
    name: 'FinTech & Quantitative Software Fellowship',
    department: 'School of Management & CS',
    term: 'Summer/Fall 2026',
    enrolledStudents: 180,
    activeInternships: 164,
    completionRate: 94.8,
    averageScore: 92.0,
    leadFaculty: 'Prof. Jonathan Vance',
    status: 'In Progress',
    recommendedTracks: ['Financial Analysis', 'Software Engineering']
  },
  {
    id: 'prog-first-year-prep',
    name: 'Pre-Placement Professional Readiness Bootcamp',
    department: 'University Career Center',
    term: 'Spring 2026',
    enrolledStudents: 510,
    activeInternships: 32,
    completionRate: 84.1,
    averageScore: 82.6,
    leadFaculty: 'Dean Eleanor Vance',
    status: 'Completed',
    recommendedTracks: ['UI/UX Design', 'Software Engineering', 'Digital Marketing']
  }
];

export const COLLEGE_FEATURES_LIST = [
  {
    title: 'Virtual Internships',
    tagline: 'Production-grade enterprise work simulations',
    description: 'Provide students with realistic, async simulations modeled directly after onboarding sprints at Fortune 500 tech companies and high-growth startups.',
    icon: 'Briefcase',
    stat: '100% Turnkey Industry Content'
  },
  {
    title: 'Student Progress Tracking',
    tagline: 'Real-time granular milestone telemetry',
    description: 'Track individual and cohort milestones with live submission status, time logs, supervisor AI feedback, and code repository commits in one central dashboard.',
    icon: 'Activity',
    stat: 'Sub-Minute Activity Sync'
  },
  {
    title: 'Skill Analytics',
    tagline: 'Objective, evidence-backed competency matrices',
    description: 'Replace subjective self-assessments with benchmarked rubric scores mapped against real-world technical hiring bars for software, data, and design.',
    icon: 'BarChart2',
    stat: 'ABET & NACE Mapped'
  },
  {
    title: 'Project-Based Learning',
    tagline: 'Four portfolio deliverables per simulation',
    description: 'Every student graduates with production-quality codebases, problem-approach-solution case studies, and verified credentials ready for recruiter review.',
    icon: 'FolderGit2',
    stat: 'Public /u/ Portfolio Routing'
  },
  {
    title: 'Placement Preparation',
    tagline: 'Accelerate career center hiring outcomes',
    description: 'Generate comprehensive employer talent dossiers, verify student readiness before campus career fairs, and connect accredited talent directly to hiring partners.',
    icon: 'Award',
    stat: '3.4x Faster Job Placements'
  }
];
