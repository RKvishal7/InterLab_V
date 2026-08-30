export interface CertificateRecord {
  id: string;
  certificateId: string;
  studentName: string;
  internshipTitle: string;
  company: string;
  track: string;
  durationWeeks: number;
  durationLabel: string;
  completionDate: string;
  issueTimestamp: string;
  finalScore: number;
  scoreGrade: 'Exemplary' | 'Proficient';
  projectsCompleted: number;
  skillsDeveloped: string[];
  signature: {
    signerName: string;
    signerTitle: string;
    signerOrg: string;
  };
  hash: string;
  verifiedStatus: 'Valid' | 'Revoked' | 'NotFound';
}

export const CERTIFICATE_REGISTRY: Record<string, CertificateRecord> = {
  'IL-2026-948210': {
    id: 'cert-fe-nova',
    certificateId: 'IL-2026-948210',
    studentName: 'Alex Morgan',
    internshipTitle: 'Frontend Developer Virtual Internship',
    company: 'Nova Labs',
    track: 'Frontend Engineering Simulation',
    durationWeeks: 4,
    durationLabel: '4 Weeks (38.5 Hours Logged)',
    completionDate: 'August 28, 2026',
    issueTimestamp: '2026-08-28T16:42:10Z',
    finalScore: 89,
    scoreGrade: 'Proficient',
    projectsCompleted: 4,
    skillsDeveloped: [
      'JavaScript (ES6+)',
      'React 18 & State Architecture',
      'Git Workflow & Branch Hygiene',
      'Problem Solving & Logic Bounds',
      'UI Development & WCAG AA'
    ],
    signature: {
      signerName: 'Sarah Chen',
      signerTitle: 'Staff Frontend Mentor & Principal Architect',
      signerOrg: 'Nova Labs Engineering'
    },
    hash: 'e9c8a17b2f483c0e14a87d65b9319e7284f18376510d9f4c3a2167b5e43a9081',
    verifiedStatus: 'Valid'
  },
  'IL-2026-831940': {
    id: 'cert-fs-cloudscale',
    certificateId: 'IL-2026-831940',
    studentName: 'Alex Morgan',
    internshipTitle: 'Distributed Systems & Full-Stack Simulation',
    company: 'CloudScale Systems',
    track: 'Full-Stack Simulation',
    durationWeeks: 4,
    durationLabel: '4 Weeks (42 Hours Logged)',
    completionDate: 'August 05, 2026',
    issueTimestamp: '2026-08-05T18:15:00Z',
    finalScore: 92,
    scoreGrade: 'Exemplary',
    projectsCompleted: 4,
    skillsDeveloped: [
      'REST API Contracts',
      'Sliding Window Rate Limiting',
      'Distributed Caching',
      'System Architecture ADRs',
      'Git PR Etiquette'
    ],
    signature: {
      signerName: 'David Vance',
      signerTitle: 'Principal Systems Architect',
      signerOrg: 'CloudScale Systems Core Engine'
    },
    hash: '4f7e21a89c03b6e821d74a95c32187b409e51c89012a45f67b8e901234cdef56',
    verifiedStatus: 'Valid'
  },
  'IL-2026-772154': {
    id: 'cert-fintech-react',
    certificateId: 'IL-2026-772154',
    studentName: 'Alex Morgan',
    internshipTitle: 'Enterprise React & State Architecture',
    company: 'FinTech Global',
    track: 'Enterprise Web Simulation',
    durationWeeks: 3,
    durationLabel: '3 Weeks (30 Hours Logged)',
    completionDate: 'July 22, 2026',
    issueTimestamp: '2026-07-22T14:30:00Z',
    finalScore: 88,
    scoreGrade: 'Proficient',
    projectsCompleted: 3,
    skillsDeveloped: [
      'Deterministic Math Engines',
      'Unit Test Suites',
      'Input Sanitization',
      'Currency Localization'
    ],
    signature: {
      signerName: 'Elena Rostova',
      signerTitle: 'VP of Engineering',
      signerOrg: 'FinTech Global Platforms'
    },
    hash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    verifiedStatus: 'Valid'
  }
};
