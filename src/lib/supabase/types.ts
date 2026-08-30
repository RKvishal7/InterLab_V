/**
 * Supabase Database Entity Definitions for InternLab
 * Reflects Postgres schema tables, columns, relationships and RLS structures.
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      career_interests: {
        Row: CareerInterestRow;
        Insert: CareerInterestInsert;
        Update: CareerInterestUpdate;
      };
      skills: {
        Row: SkillRow;
        Insert: SkillInsert;
        Update: SkillUpdate;
      };
      user_skills: {
        Row: UserSkillRow;
        Insert: UserSkillInsert;
        Update: UserSkillUpdate;
      };
      internship_categories: {
        Row: InternshipCategoryRow;
        Insert: InternshipCategoryInsert;
        Update: InternshipCategoryUpdate;
      };
      internships: {
        Row: InternshipRow;
        Insert: InternshipInsert;
        Update: InternshipUpdate;
      };
      internship_modules: {
        Row: InternshipModuleRow;
        Insert: InternshipModuleInsert;
        Update: InternshipModuleUpdate;
      };
      tasks: {
        Row: TaskRow;
        Insert: TaskInsert;
        Update: TaskUpdate;
      };
      user_internships: {
        Row: UserInternshipRow;
        Insert: UserInternshipInsert;
        Update: UserInternshipUpdate;
      };
      task_progress: {
        Row: TaskProgressRow;
        Insert: TaskProgressInsert;
        Update: TaskProgressUpdate;
      };
      project_submissions: {
        Row: ProjectSubmissionRow;
        Insert: ProjectSubmissionInsert;
        Update: ProjectSubmissionUpdate;
      };
      project_feedback: {
        Row: ProjectFeedbackRow;
        Insert: ProjectFeedbackInsert;
        Update: ProjectFeedbackUpdate;
      };
      certificates: {
        Row: CertificateRow;
        Insert: CertificateInsert;
        Update: CertificateUpdate;
      };
    };
  };
}

// --------------------------------------------------------------------------------------
// PROFILES
// --------------------------------------------------------------------------------------
export interface ProfileRow {
  id: string; // UUID primary key, matches auth.users.id
  full_name: string;
  email: string;
  avatar_url: string | null;
  college: string | null;
  degree: string | null;
  education_year: string | null;
  experience_level: string | null;
  weekly_availability: string | null;
  created_at: string;
}

export interface ProfileInsert {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  college?: string | null;
  degree?: string | null;
  education_year?: string | null;
  experience_level?: string | null;
  weekly_availability?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  full_name?: string;
  email?: string;
  avatar_url?: string | null;
  college?: string | null;
  degree?: string | null;
  education_year?: string | null;
  experience_level?: string | null;
  weekly_availability?: string | null;
}

// --------------------------------------------------------------------------------------
// CAREER_INTERESTS
// --------------------------------------------------------------------------------------
export interface CareerInterestRow {
  id: string;
  user_id: string;
  category: string;
  created_at: string;
}

export interface CareerInterestInsert {
  id?: string;
  user_id: string;
  category: string;
  created_at?: string;
}

export interface CareerInterestUpdate {
  category?: string;
}

// --------------------------------------------------------------------------------------
// SKILLS
// --------------------------------------------------------------------------------------
export interface SkillRow {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

export interface SkillInsert {
  id?: string;
  name: string;
  category: string;
  created_at?: string;
}

export interface SkillUpdate {
  name?: string;
  category?: string;
}

// --------------------------------------------------------------------------------------
// USER_SKILLS
// --------------------------------------------------------------------------------------
export interface UserSkillRow {
  id: string;
  user_id: string;
  skill_id: string;
  proficiency: string;
  created_at: string;
}

export interface UserSkillInsert {
  id?: string;
  user_id: string;
  skill_id: string;
  proficiency?: string;
  created_at?: string;
}

export interface UserSkillUpdate {
  proficiency?: string;
}

// --------------------------------------------------------------------------------------
// INTERNSHIP_CATEGORIES
// --------------------------------------------------------------------------------------
export interface InternshipCategoryRow {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface InternshipCategoryInsert {
  id?: string;
  name: string;
  description?: string | null;
  created_at?: string;
}

export interface InternshipCategoryUpdate {
  name?: string;
  description?: string | null;
}

// --------------------------------------------------------------------------------------
// INTERNSHIPS
// --------------------------------------------------------------------------------------
export interface InternshipRow {
  id: string;
  title: string;
  description: string;
  category_id: string | null;
  duration: string;
  difficulty: string;
  company_name: string;
  thumbnail: string | null;
  is_active: boolean;
  created_at: string;
}

export interface InternshipInsert {
  id: string;
  title: string;
  description: string;
  category_id?: string | null;
  duration: string;
  difficulty: string;
  company_name: string;
  thumbnail?: string | null;
  is_active?: boolean;
  created_at?: string;
}

export interface InternshipUpdate {
  title?: string;
  description?: string;
  category_id?: string | null;
  duration?: string;
  difficulty?: string;
  company_name?: string;
  thumbnail?: string | null;
  is_active?: boolean;
}

// --------------------------------------------------------------------------------------
// INTERNSHIP_MODULES
// --------------------------------------------------------------------------------------
export interface InternshipModuleRow {
  id: string;
  internship_id: string;
  week_number: number;
  title: string;
  description: string | null;
  created_at: string;
}

export interface InternshipModuleInsert {
  id: string;
  internship_id: string;
  week_number: number;
  title: string;
  description?: string | null;
  created_at?: string;
}

export interface InternshipModuleUpdate {
  week_number?: number;
  title?: string;
  description?: string | null;
}

// --------------------------------------------------------------------------------------
// TASKS
// --------------------------------------------------------------------------------------
export interface TaskRow {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  difficulty: string;
  estimated_time: string;
  deadline_days: number;
  requirements: string[];
  deliverables: string[];
  created_at: string;
}

export interface TaskInsert {
  id: string;
  module_id: string;
  title: string;
  description?: string | null;
  difficulty?: string;
  estimated_time?: string;
  deadline_days?: number;
  requirements?: string[];
  deliverables?: string[];
  created_at?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string | null;
  difficulty?: string;
  estimated_time?: string;
  deadline_days?: number;
  requirements?: string[];
  deliverables?: string[];
}

// --------------------------------------------------------------------------------------
// USER_INTERNSHIPS
// --------------------------------------------------------------------------------------
export interface UserInternshipRow {
  id: string;
  user_id: string;
  internship_id: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'paused';
  progress: number;
  started_at: string;
  completed_at: string | null;
}

export interface UserInternshipInsert {
  id?: string;
  user_id: string;
  internship_id: string;
  status?: 'enrolled' | 'in_progress' | 'completed' | 'paused';
  progress?: number;
  started_at?: string;
  completed_at?: string | null;
}

export interface UserInternshipUpdate {
  status?: 'enrolled' | 'in_progress' | 'completed' | 'paused';
  progress?: number;
  completed_at?: string | null;
}

// --------------------------------------------------------------------------------------
// TASK_PROGRESS
// --------------------------------------------------------------------------------------
export interface TaskProgressRow {
  id: string;
  user_id: string;
  task_id: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'blocked';
  started_at: string;
  completed_at: string | null;
}

export interface TaskProgressInsert {
  id?: string;
  user_id: string;
  task_id: string;
  status?: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'blocked';
  started_at?: string;
  completed_at?: string | null;
}

export interface TaskProgressUpdate {
  status?: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'blocked';
  completed_at?: string | null;
}

// --------------------------------------------------------------------------------------
// PROJECT_SUBMISSIONS
// --------------------------------------------------------------------------------------
export interface ProjectSubmissionRow {
  id: string;
  user_id: string;
  task_id: string;
  github_url: string | null;
  live_url: string | null;
  description: string | null;
  submitted_at: string;
}

export interface ProjectSubmissionInsert {
  id?: string;
  user_id: string;
  task_id: string;
  github_url?: string | null;
  live_url?: string | null;
  description?: string | null;
  submitted_at?: string;
}

export interface ProjectSubmissionUpdate {
  github_url?: string | null;
  live_url?: string | null;
  description?: string | null;
}

// --------------------------------------------------------------------------------------
// PROJECT_FEEDBACK
// --------------------------------------------------------------------------------------
export interface ProjectFeedbackRow {
  id: string;
  submission_id: string;
  overall_score: number;
  code_quality: number | null;
  problem_solving: number | null;
  ui_ux: number | null;
  documentation: number | null;
  strengths: string[];
  improvements: string[];
  feedback: string;
  created_at: string;
}

export interface ProjectFeedbackInsert {
  id?: string;
  submission_id: string;
  overall_score: number;
  code_quality?: number | null;
  problem_solving?: number | null;
  ui_ux?: number | null;
  documentation?: number | null;
  strengths?: string[];
  improvements?: string[];
  feedback: string;
  created_at?: string;
}

export interface ProjectFeedbackUpdate {
  overall_score?: number;
  code_quality?: number | null;
  problem_solving?: number | null;
  ui_ux?: number | null;
  documentation?: number | null;
  strengths?: string[];
  improvements?: string[];
  feedback?: string;
}

// --------------------------------------------------------------------------------------
// CERTIFICATES
// --------------------------------------------------------------------------------------
export interface CertificateRow {
  id: string;
  user_id: string;
  internship_id: string;
  certificate_id: string;
  issued_at: string;
  verification_status: 'issued' | 'verified' | 'revoked';
}

export interface CertificateInsert {
  id?: string;
  user_id: string;
  internship_id: string;
  certificate_id: string;
  issued_at?: string;
  verification_status?: 'issued' | 'verified' | 'revoked';
}

export interface CertificateUpdate {
  verification_status?: 'issued' | 'verified' | 'revoked';
}
