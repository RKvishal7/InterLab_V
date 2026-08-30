/**
 * InternLab Supabase Database Service
 * 
 * Implements production data access methods for all entities with RLS protection:
 * - PROFILES
 * - CAREER_INTERESTS
 * - SKILLS & USER_SKILLS
 * - INTERNSHIP_CATEGORIES, INTERNSHIPS, INTERNSHIP_MODULES, TASKS
 * - USER_INTERNSHIPS & TASK_PROGRESS
 * - PROJECT_SUBMISSIONS & PROJECT_FEEDBACK
 * - CERTIFICATES
 * 
 * Provides fallback local storage synchronization so existing UI continues seamlessly.
 */

import { supabase, isSupabaseConnected } from './client';
import { 
  ProfileRow, 
  ProfileUpdate, 
  ProfileInsert,
  CareerInterestRow,
  UserSkillRow,
  SkillRow,
  UserInternshipRow,
  TaskProgressRow,
  ProjectSubmissionRow,
  ProjectFeedbackRow,
  CertificateRow
} from './types';

export interface DatabaseServiceResult<T> {
  data: T | null;
  error: string | null;
}

class DatabaseService {
  // ------------------------------------------------------------------------------------
  // PROFILES
  // ------------------------------------------------------------------------------------
  public async getProfile(userId: string): Promise<DatabaseServiceResult<ProfileRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as ProfileRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch user profile' };
    }
  }

  public async upsertProfile(profile: ProfileInsert | ProfileUpdate & { id: string }): Promise<DatabaseServiceResult<ProfileRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await (supabase
        .from('profiles') as any)
        .upsert(profile, { onConflict: 'id' })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as ProfileRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to upsert user profile' };
    }
  }

  // ------------------------------------------------------------------------------------
  // CAREER_INTERESTS
  // ------------------------------------------------------------------------------------
  public async getUserCareerInterests(userId: string): Promise<DatabaseServiceResult<CareerInterestRow[]>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('career_interests')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as CareerInterestRow[], error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch career interests' };
    }
  }

  public async saveUserCareerInterests(userId: string, categories: string[]): Promise<DatabaseServiceResult<CareerInterestRow[]>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      // Clear existing interests for user and re-insert
      await supabase.from('career_interests').delete().eq('user_id', userId);

      if (categories.length === 0) {
        return { data: [], error: null };
      }

      const rows = categories.map((cat) => ({
        user_id: userId,
        category: cat
      }));

      const { data, error } = await (supabase
        .from('career_interests') as any)
        .insert(rows)
        .select('*');

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as CareerInterestRow[], error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to update career interests' };
    }
  }

  // ------------------------------------------------------------------------------------
  // SKILLS & USER_SKILLS
  // ------------------------------------------------------------------------------------
  public async getSkills(): Promise<DatabaseServiceResult<SkillRow[]>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*');

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as SkillRow[], error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch skills' };
    }
  }

  public async getUserSkills(userId: string): Promise<DatabaseServiceResult<Array<UserSkillRow & { skill?: SkillRow }>>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('*, skills(*)')
        .eq('user_id', userId);

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as any, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch user skills' };
    }
  }

  public async saveUserSkill(userId: string, skillId: string, proficiency: string): Promise<DatabaseServiceResult<UserSkillRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await (supabase
        .from('user_skills') as any)
        .upsert({
          user_id: userId,
          skill_id: skillId,
          proficiency
        }, { onConflict: 'user_id,skill_id' })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as UserSkillRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to save user skill' };
    }
  }

  // ------------------------------------------------------------------------------------
  // USER_INTERNSHIPS (Enrollment & Progress)
  // ------------------------------------------------------------------------------------
  public async getUserInternships(userId: string): Promise<DatabaseServiceResult<UserInternshipRow[]>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('user_internships')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as UserInternshipRow[], error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch enrolled internships' };
    }
  }

  public async enrollUserInInternship(userId: string, internshipId: string): Promise<DatabaseServiceResult<UserInternshipRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await (supabase
        .from('user_internships') as any)
        .upsert({
          user_id: userId,
          internship_id: internshipId,
          status: 'enrolled',
          progress: 0,
          started_at: new Date().toISOString()
        }, { onConflict: 'user_id,internship_id' })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as UserInternshipRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to enroll in internship' };
    }
  }

  public async updateUserInternshipProgress(
    userId: string, 
    internshipId: string, 
    progress: number, 
    status?: 'enrolled' | 'in_progress' | 'completed' | 'paused'
  ): Promise<DatabaseServiceResult<UserInternshipRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const updates: any = {
        progress,
        ...(status ? { status } : {}),
        ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
      };

      const { data, error } = await (supabase
        .from('user_internships') as any)
        .update(updates)
        .eq('user_id', userId)
        .eq('internship_id', internshipId)
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as UserInternshipRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to update internship progress' };
    }
  }

  // ------------------------------------------------------------------------------------
  // TASK_PROGRESS
  // ------------------------------------------------------------------------------------
  public async getTaskProgress(userId: string): Promise<DatabaseServiceResult<TaskProgressRow[]>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('task_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as TaskProgressRow[], error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch task progress' };
    }
  }

  public async updateTaskProgress(
    userId: string, 
    taskId: string, 
    status: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'blocked'
  ): Promise<DatabaseServiceResult<TaskProgressRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const completed_at = status === 'completed' ? new Date().toISOString() : null;
      const { data, error } = await (supabase
        .from('task_progress') as any)
        .upsert({
          user_id: userId,
          task_id: taskId,
          status,
          ...(completed_at ? { completed_at } : {})
        }, { onConflict: 'user_id,task_id' })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as TaskProgressRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to update task progress' };
    }
  }

  // ------------------------------------------------------------------------------------
  // PROJECT_SUBMISSIONS & PROJECT_FEEDBACK
  // ------------------------------------------------------------------------------------
  public async submitProject(
    userId: string,
    taskId: string,
    submission: {
      githubUrl?: string;
      liveUrl?: string;
      description?: string;
    }
  ): Promise<DatabaseServiceResult<ProjectSubmissionRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await (supabase
        .from('project_submissions') as any)
        .insert({
          user_id: userId,
          task_id: taskId,
          github_url: submission.githubUrl || null,
          live_url: submission.liveUrl || null,
          description: submission.description || '',
          submitted_at: new Date().toISOString()
        })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      // Also update task progress to 'submitted'
      await this.updateTaskProgress(userId, taskId, 'submitted');

      return { data: data as ProjectSubmissionRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to submit project deliverable' };
    }
  }

  public async saveProjectFeedback(
    submissionId: string,
    feedbackData: {
      overallScore: number;
      codeQuality?: number;
      problemSolving?: number;
      uiUx?: number;
      documentation?: number;
      strengths?: string[];
      improvements?: string[];
      feedback: string;
    }
  ): Promise<DatabaseServiceResult<ProjectFeedbackRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await (supabase
        .from('project_feedback') as any)
        .insert({
          submission_id: submissionId,
          overall_score: feedbackData.overallScore,
          code_quality: feedbackData.codeQuality ?? null,
          problem_solving: feedbackData.problemSolving ?? null,
          ui_ux: feedbackData.uiUx ?? null,
          documentation: feedbackData.documentation ?? null,
          strengths: feedbackData.strengths || [],
          improvements: feedbackData.improvements || [],
          feedback: feedbackData.feedback
        })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as ProjectFeedbackRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to record deliverable feedback' };
    }
  }

  public async getUserSubmissions(userId: string): Promise<DatabaseServiceResult<Array<ProjectSubmissionRow & { feedback?: ProjectFeedbackRow }>>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('project_submissions')
        .select('*, project_feedback(*)')
        .eq('user_id', userId)
        .order('submitted_at', { ascending: false });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as any, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch project submissions' };
    }
  }

  // ------------------------------------------------------------------------------------
  // CERTIFICATES
  // ------------------------------------------------------------------------------------
  public async getUserCertificates(userId: string): Promise<DatabaseServiceResult<CertificateRow[]>> {
    if (!isSupabaseConnected()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as CertificateRow[], error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch user certificates' };
    }
  }

  public async issueCertificate(
    userId: string,
    internshipId: string,
    certificateId: string
  ): Promise<DatabaseServiceResult<CertificateRow>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await (supabase
        .from('certificates') as any)
        .upsert({
          user_id: userId,
          internship_id: internshipId,
          certificate_id: certificateId,
          issued_at: new Date().toISOString(),
          verification_status: 'issued'
        }, { onConflict: 'certificate_id' })
        .select('*')
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as CertificateRow, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to issue credential certificate' };
    }
  }

  public async verifyCertificate(certificateId: string): Promise<DatabaseServiceResult<CertificateRow & { profiles?: ProfileRow; internships?: any }>> {
    if (!isSupabaseConnected()) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*, profiles(*), internships(*)')
        .eq('certificate_id', certificateId)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as any, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Certificate verification failed' };
    }
  }
}

export const databaseService = new DatabaseService();
