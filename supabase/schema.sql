-- ======================================================================================
-- INTERNLAB PRODUCTION DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Includes full entity definitions, Row Level Security (RLS) policies, triggers & seeds
-- ======================================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ======================================================================================
-- 2. TABLE DEFINITIONS
-- ======================================================================================

-- --------------------------------------------------------------------------------------
-- PROFILES: Student & User identity linked to Supabase Auth (auth.users)
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  college TEXT,
  degree TEXT,
  education_year TEXT,
  experience_level TEXT DEFAULT 'Beginner',
  weekly_availability TEXT DEFAULT '5–10 hours',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- CAREER_INTERESTS: Track student interest areas & engineering paths
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- SKILLS: Master competency and technical skills directory
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- USER_SKILLS: Verified and declared student skills with proficiency ratings
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency TEXT NOT NULL DEFAULT 'Intermediate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, skill_id)
);

-- --------------------------------------------------------------------------------------
-- INTERNSHIP_CATEGORIES: Tracks (Software Eng, AI, Data Science, Product, etc.)
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internship_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- INTERNSHIPS: High-fidelity virtual workplace simulations
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internships (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES public.internship_categories(id) ON DELETE SET NULL,
  duration TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Intermediate',
  company_name TEXT NOT NULL,
  thumbnail TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- INTERNSHIP_MODULES: Sprint/weekly milestones within a simulation
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internship_modules (
  id TEXT PRIMARY KEY,
  internship_id TEXT NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- TASKS: Practical deliverables and engineering tasks assigned in a module
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES public.internship_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL DEFAULT 'Intermediate',
  estimated_time TEXT NOT NULL DEFAULT '2-3 hours',
  deadline_days INTEGER NOT NULL DEFAULT 7,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- USER_INTERNSHIPS: Student enrollment and overall simulation progress
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  internship_id TEXT NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed', 'paused')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, internship_id)
);

-- --------------------------------------------------------------------------------------
-- TASK_PROGRESS: Granular status tracking per assigned task
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.task_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'completed', 'blocked')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, task_id)
);

-- --------------------------------------------------------------------------------------
-- PROJECT_SUBMISSIONS: Deliverable submissions (code, repo, live demo, document)
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  github_url TEXT,
  live_url TEXT,
  description TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- PROJECT_FEEDBACK: Multi-dimensional rubric evaluations and supervisor remarks
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.project_submissions(id) ON DELETE CASCADE,
  overall_score NUMERIC NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  code_quality NUMERIC CHECK (code_quality >= 0 AND code_quality <= 100),
  problem_solving NUMERIC CHECK (problem_solving >= 0 AND problem_solving <= 100),
  ui_ux NUMERIC CHECK (ui_ux >= 0 AND ui_ux <= 100),
  documentation NUMERIC CHECK (documentation >= 0 AND documentation <= 100),
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  improvements JSONB NOT NULL DEFAULT '[]'::jsonb,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------------------------
-- CERTIFICATES: Verified completion credentials with public verification hash
-- --------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  internship_id TEXT NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  certificate_id TEXT NOT NULL UNIQUE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  verification_status TEXT NOT NULL DEFAULT 'issued' CHECK (verification_status IN ('issued', 'verified', 'revoked'))
);

-- ======================================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ======================================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_career_interests_user ON public.career_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill ON public.user_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_internships_category ON public.internships(category_id);
CREATE INDEX IF NOT EXISTS idx_internships_is_active ON public.internships(is_active);
CREATE INDEX IF NOT EXISTS idx_modules_internship ON public.internship_modules(internship_id);
CREATE INDEX IF NOT EXISTS idx_tasks_module ON public.tasks(module_id);
CREATE INDEX IF NOT EXISTS idx_user_internships_user ON public.user_internships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_internships_status ON public.user_internships(user_id, status);
CREATE INDEX IF NOT EXISTS idx_task_progress_user ON public.task_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_task_progress_status ON public.task_progress(user_id, status);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.project_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_task ON public.project_submissions(task_id);
CREATE INDEX IF NOT EXISTS idx_feedback_submission ON public.project_feedback(submission_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON public.certificates(certificate_id);

-- ======================================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures students can only access and modify their own progress and submissions.
-- Public catalogs (internships, tasks, skills) are read-only to authorized clients.
-- ======================================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------------------
-- PROFILES POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- --------------------------------------------------------------------------------------
-- CAREER_INTERESTS POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can read own career interests"
  ON public.career_interests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own career interests"
  ON public.career_interests FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------------------------
-- SKILLS POLICIES (Public read catalog)
-- --------------------------------------------------------------------------------------
CREATE POLICY "Skills are readable by everyone"
  ON public.skills FOR SELECT
  USING (true);

-- --------------------------------------------------------------------------------------
-- USER_SKILLS POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can read own skills"
  ON public.user_skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON public.user_skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON public.user_skills FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON public.user_skills FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------------------
-- INTERNSHIP_CATEGORIES POLICIES (Public read catalog)
-- --------------------------------------------------------------------------------------
CREATE POLICY "Categories are readable by everyone"
  ON public.internship_categories FOR SELECT
  USING (true);

-- --------------------------------------------------------------------------------------
-- INTERNSHIPS, MODULES & TASKS POLICIES (Public read catalog for active simulations)
-- --------------------------------------------------------------------------------------
CREATE POLICY "Active internships are readable by everyone"
  ON public.internships FOR SELECT
  USING (is_active = true);

CREATE POLICY "Internship modules are readable by everyone"
  ON public.internship_modules FOR SELECT
  USING (true);

CREATE POLICY "Tasks are readable by everyone"
  ON public.tasks FOR SELECT
  USING (true);

-- --------------------------------------------------------------------------------------
-- USER_INTERNSHIPS POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can view own enrolled internships"
  ON public.user_internships FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in internships"
  ON public.user_internships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own internship progress"
  ON public.user_internships FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------------------------
-- TASK_PROGRESS POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can view own task progress"
  ON public.task_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task progress"
  ON public.task_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own task progress"
  ON public.task_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------------------------
-- PROJECT_SUBMISSIONS POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can view own submissions"
  ON public.project_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON public.project_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON public.project_submissions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------------------------
-- PROJECT_FEEDBACK POLICIES
-- --------------------------------------------------------------------------------------
CREATE POLICY "Users can view feedback for own submissions"
  ON public.project_feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.project_submissions
      WHERE public.project_submissions.id = public.project_feedback.submission_id
        AND public.project_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "System / Authenticated users can insert feedback for own submissions"
  ON public.project_feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.project_submissions
      WHERE public.project_submissions.id = public.project_feedback.submission_id
        AND public.project_submissions.user_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------------------
-- CERTIFICATES POLICIES
-- --------------------------------------------------------------------------------------
-- Users can view their own certificates, OR anyone can verify valid certificates by certificate_id
CREATE POLICY "Certificates are viewable by owner or verifier"
  ON public.certificates FOR SELECT
  USING (
    auth.uid() = user_id 
    OR verification_status IN ('issued', 'verified')
  );

CREATE POLICY "Users can record own certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ======================================================================================
-- 5. AUTH TRIGGER: Auto-create Profile on Signup
-- Automatically synchronizes metadata from auth.users to public.profiles table
-- ======================================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    avatar_url,
    college,
    degree,
    education_year,
    experience_level,
    weekly_availability,
    created_at
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/initials/svg?seed=' || encode(new.email::bytea, 'hex') || '&backgroundColor=1a1c1e&textColor=ffffff'),
    COALESCE(new.raw_user_meta_data->>'college', new.raw_user_meta_data->>'university', 'University Partner'),
    COALESCE(new.raw_user_meta_data->>'degree', 'Bachelor of Science in Computer Science'),
    COALESCE(new.raw_user_meta_data->>'education_year', 'Senior (Year 4)'),
    COALESCE(new.raw_user_meta_data->>'experience_level', 'Intermediate'),
    COALESCE(new.raw_user_meta_data->>'weekly_availability', '5–10 hours'),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    college = COALESCE(EXCLUDED.college, profiles.college);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ======================================================================================
-- 6. INITIAL SEED DATA
-- Pre-populates categories, core skills, virtual internships, modules, and tasks
-- ======================================================================================

-- Categories
INSERT INTO public.internship_categories (id, name, description)
VALUES 
  ('11111111-1111-1111-1111-111111111101', 'Software Engineering', 'Full-stack, backend microservices, distributed systems, and modern frontend development.'),
  ('11111111-1111-1111-1111-111111111102', 'Data Science & AI', 'Predictive modeling, deep learning, LLM fine-tuning, and exploratory data analysis.'),
  ('11111111-1111-1111-1111-111111111103', 'Product Management', 'Product requirement documents, metric teardowns, user research, and roadmapping.'),
  ('11111111-1111-1111-1111-111111111104', 'UI/UX Design', 'Design systems, high-fidelity prototypes, user journeys, and usability audits.'),
  ('11111111-1111-1111-1111-111111111105', 'Cloud & DevOps', 'Infrastructure-as-Code, Kubernetes clustering, CI/CD pipelines, and cloud observability.')
ON CONFLICT (name) DO NOTHING;

-- Skills
INSERT INTO public.skills (name, category)
VALUES 
  ('TypeScript', 'Frontend'),
  ('React', 'Frontend'),
  ('Node.js', 'Backend'),
  ('Python', 'Data Science'),
  ('PostgreSQL', 'Database'),
  ('Supabase', 'Backend'),
  ('Docker', 'DevOps'),
  ('Kubernetes', 'DevOps'),
  ('System Architecture', 'Architecture'),
  ('Machine Learning', 'AI'),
  ('Figma', 'Design'),
  ('Product Analytics', 'Product')
ON CONFLICT (name) DO NOTHING;

-- Internships
INSERT INTO public.internships (id, title, description, category_id, duration, difficulty, company_name, thumbnail, is_active)
VALUES
  (
    'sim-swe-novalabs-01',
    'Frontend Platform Engineering & Component Architecture',
    'Architect a high-performance React component library and interactive product discovery flow for an enterprise e-commerce platform.',
    '11111111-1111-1111-1111-111111111101',
    '4 Weeks',
    'Intermediate',
    'Nova Labs',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    true
  ),
  (
    'sim-ai-apexdata-02',
    'Applied LLM Pipeline & Semantic Search Engine',
    'Build an enterprise retrieval-augmented generation (RAG) pipeline with vector embeddings and prompt engineering evaluations.',
    '11111111-1111-1111-1111-111111111102',
    '5 Weeks',
    'Advanced',
    'Apex Data Systems',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    true
  ),
  (
    'sim-devops-stratus-03',
    'Cloud Infrastructure Automation & CI/CD Pipelines',
    'Deploy fault-tolerant microservices onto Kubernetes clusters using Terraform, Docker, and GitHub Actions with zero-downtime canary rollouts.',
    '11111111-1111-1111-1111-111111111105',
    '3 Weeks',
    'Intermediate',
    'Stratus Cloud Solutions',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Internship Modules
INSERT INTO public.internship_modules (id, internship_id, week_number, title, description)
VALUES
  ('mod-swe-w1', 'sim-swe-novalabs-01', 1, 'Component Library Foundations', 'Establish atomic design components, accessible interactive tokens, and TypeScript contracts.'),
  ('mod-swe-w2', 'sim-swe-novalabs-01', 2, 'State Management & Performance Optimization', 'Implement optimistic mutations, virtualization, and client caching patterns.'),
  ('mod-swe-w3', 'sim-swe-novalabs-01', 3, 'End-to-End Product Flow & Checkout', 'Build resilient multi-step workflows with real-time field validations.'),
  ('mod-swe-w4', 'sim-swe-novalabs-01', 4, 'Accessibility Audit & Production Release', 'Perform WCAG AA automated testing, performance profiling, and write launch documentation.')
ON CONFLICT (id) DO NOTHING;

-- Tasks
INSERT INTO public.tasks (id, module_id, title, description, difficulty, estimated_time, deadline_days, requirements, deliverables)
VALUES
  (
    'task-swe-1-1',
    'mod-swe-w1',
    'Build Accessible Design Token & Button System',
    'Create polymorphic, keyboard-accessible button and badge primitives with strict TypeScript props and dark/light token variants.',
    'Beginner',
    '2 hours',
    5,
    '["Must support primary, secondary, and ghost variants", "Full WCAG 2.1 AA keyboard focus indicators", "Strict TypeScript interface without any types"]'::jsonb,
    '["React Component files (.tsx)", "Storybook / Visual test artifact", "GitHub repository link"]'::jsonb
  ),
  (
    'task-swe-1-2',
    'mod-swe-w1',
    'Implement Dynamic Responsive Product Card',
    'Develop an interactive e-commerce product card with image galleries, variant chips, and stock badge indicators.',
    'Intermediate',
    '3 hours',
    7,
    '["Responsive CSS grid layout", "Optimized lazy loaded image tags", "Interactive hover and selected states"]'::jsonb,
    '["ProductCard component code", "Live deployment URL", "Technical summary"]'::jsonb
  )
ON CONFLICT (id) DO NOTHING;
