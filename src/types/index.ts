export type CareerTrackId = 
  | 'software-engineering'
  | 'data-science-ai'
  | 'artificial-intelligence'
  | 'product-management'
  | 'uiux-design'
  | 'digital-marketing'
  | 'business-strategy'
  | 'financial-analysis'
  | 'cybersecurity'
  | 'cloud-devops'
  | 'cloud-computing';

export interface CareerTrackInfo {
  id: CareerTrackId;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  averageStartingSalary: string;
  inDemandSkills: string[];
  totalSimulations: number;
}

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SupervisorPersona {
  id: string;
  name: string;
  title: string;
  department: string;
  companyName: string;
  avatarUrl: string;
  bio: string;
  communicationStyle: 'direct_technical' | 'supportive_mentoring' | 'executive_strategic' | 'meticulous_analytical';
  systemInstructionPrompt: string;
}

export interface SimulatedEmail {
  id: string;
  senderName: string;
  senderTitle: string;
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  timestamp: string;
  body: string;
  attachments?: { name: string; size: string; type: string }[];
  isImportant?: boolean;
}

export interface RubricCriterion {
  id: string;
  title: string;
  weightPercentage: number;
  description: string;
  evaluationGuide: string;
}

export type DeliverableType = 'code' | 'document' | 'design-spec' | 'financial-sheet' | 'security-report' | 'presentation';

export interface SimulationTask {
  id: string;
  milestoneId: string;
  title: string;
  deliverableType: DeliverableType;
  estimatedMinutes: number;
  objective: string;
  instructionsMarkdown: string;
  starterTemplate?: string;
  referenceMaterials?: { title: string; url?: string; summary: string }[];
  rubricCriteria: RubricCriterion[];
}

export interface WeeklyMilestone {
  weekNumber: number;
  id: string;
  title: string;
  theme: string;
  overview: string;
  simulatedEmails: SimulatedEmail[];
  tasks: SimulationTask[];
  skillsTaught: string[];
}

export interface VirtualInternship {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  companyTier: 'Fortune 500' | 'High-Growth Tech' | 'Venture Capital' | 'Global Consulting';
  companyLocation: string;
  companyDescription: string;
  trackId: CareerTrackId;
  difficulty: ExperienceLevel;
  durationWeeks: number;
  estimatedTotalHours: number;
  badgeTitle: string;
  summary: string;
  detailedOverview: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  toolsUsed: string[];
  supervisor: SupervisorPersona;
  milestones: WeeklyMilestone[];
  graduatesCount: number;
  rating: number;
  pricingTier?: 'free' | 'premium';
  projectsCount?: number;
}

export interface CriterionScore {
  criterionId: string;
  criterionTitle: string;
  scorePercent: number; // 0 - 100
  feedback: string;
}

export interface ReviewResult {
  reviewId: string;
  reviewedAt: string;
  reviewerName: string;
  reviewerTitle: string;
  overallScore: number; // 0 - 100
  passed: boolean;
  summaryFeedback: string;
  strengths: string[];
  areasForImprovement: string[];
  criteriaScores: CriterionScore[];
  actionableNextSteps: string[];
}

export interface TaskSubmission {
  taskId: string;
  milestoneId: string;
  submittedAt: string;
  content: string; // code or markdown or written response
  notesForSupervisor?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'needs_revision';
  review?: ReviewResult;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'supervisor' | 'system';
  senderName: string;
  timestamp: string;
  text: string;
  isStreaming?: boolean;
  thinkingContent?: string;
}

export interface PortfolioArtifact {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  trackId: CareerTrackId;
  projectTitle: string;
  deliverableType: DeliverableType;
  completedDate: string;
  summary: string;
  keySkills: string[];
  score: number;
  credentialUrl: string;
}

export interface Certificate {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  studentName: string;
  issueDate: string;
  credentialId: string;
  verificationCode: string;
  skillsCertified: string[];
  totalHoursCompleted: number;
}

export interface EnrolledInternshipProgress {
  internshipId: string;
  enrolledDate: string;
  status: 'active' | 'completed' | 'paused';
  currentWeekNumber: number;
  completedTaskIds: string[];
  submissions: Record<string, TaskSubmission>;
  chatHistory: ChatMessage[];
  completedAt?: string;
  finalScore?: number;
}

export interface OnboardingAnswers {
  primaryGoal: string;
  university: string;
  degree: string;
  currentYear: string;
  careerInterests: string[];
  skills: string[];
  experienceLevel: ExperienceLevel;
  experienceQuote?: string;
  weeklyAvailability: '3–5 hours' | '5–10 hours' | '10+ hours';
  completedAt?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  headline: string;
  bio: string;
  targetCareerTrack?: CareerTrackId;
  experienceLevel: ExperienceLevel;
  weeklyHourCommitment: number;
  interests: string[];
  onboardingData?: OnboardingAnswers;
  enrolledInternships: Record<string, EnrolledInternshipProgress>;
  portfolio: PortfolioArtifact[];
  certificates: Certificate[];
  stats: {
    simulationsCompleted: number;
    hoursLogged: number;
    skillsMastered: number;
    averageReviewScore: number;
  };
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    createdAt: string;
    userMetadata?: Record<string, any>;
  };
  accessToken: string;
  expiresAt: number;
}

export type AppRoute = 
  | { view: 'dashboard'; tab?: 'overview' | 'my-internships' | 'tasks' | 'projects' | 'career-progress' | 'certificates' | 'profile' | 'settings'; internshipId?: string }
  | { view: 'landing' }
  | { view: 'login'; redirectAfter?: string }
  | { view: 'signup' }
  | { view: 'forgot-password' }
  | { view: 'design-system' }
  | { view: 'architecture' }
  | { view: 'discover'; trackFilter?: CareerTrackId | 'all' }
  | { view: 'internship-detail'; internshipId: string }
  | { view: 'onboarding'; step?: number }
  | { view: 'recommended-internships' }
  | { view: 'workspace'; internshipId: string; activeTab?: 'briefing' | 'inbox' | 'tasks' | 'team-chat' | 'submit' }
  | { view: 'project-feedback'; projectId?: string; internshipId?: string; taskId?: string }
  | { view: 'review-hub'; internshipId: string; taskId?: string }
  | { view: 'portfolio' }
  | { view: 'career-progress' }
  | { view: 'completion-celebration'; internshipId?: string }
  | { view: 'verify-certificate'; certificateId?: string }
  | { view: 'certificate'; certificateId: string }
  | { view: 'my-learning' }
  | { view: 'universities' }
  | { view: 'college-dashboard'; tab?: 'overview' | 'students' | 'programs' | 'analytics' | 'reports' | 'settings'; programFilter?: string; studentId?: string };
