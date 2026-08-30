import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppRoute, 
  UserProfile, 
  VirtualInternship, 
  CareerTrackInfo, 
  CareerTrackId,
  TaskSubmission,
  ReviewResult,
  ChatMessage,
  PortfolioArtifact,
  Certificate
} from '../types';
import { 
  MentorThread, 
  MentorMessage, 
  MentorOpenOptions, 
  MentorCapability, 
  MentorContextView 
} from '../components/mentor/types';
import { getCuratedMentorResponse, MENTOR_PROFILE } from '../components/mentor/mentorKnowledgeBase';
import { 
  CAREER_TRACKS, 
  VIRTUAL_INTERNSHIPS, 
  INITIAL_USER_PROFILE 
} from '../data/mockDatabase';
import { 
  authService, 
  SessionData, 
  SignUpParams, 
  SignInParams, 
  ResetPasswordParams, 
  AuthResponse 
} from '../services/auth';
import { databaseService } from '../lib/supabase/databaseService';

interface AppContextType {
  // Navigation
  route: AppRoute;
  navigate: (route: AppRoute) => void;

  // Authentication
  authSession: SessionData | null;
  isAuthenticated: boolean;
  signUp: (params: SignUpParams) => Promise<AuthResponse<SessionData>>;
  signIn: (params: SignInParams) => Promise<AuthResponse<SessionData>>;
  signInWithGoogle: () => Promise<AuthResponse<SessionData>>;
  signOut: () => Promise<void>;
  resetPassword: (params: ResetPasswordParams) => Promise<AuthResponse<{ message: string; email: string }>>;

  // Data Catalog
  tracks: CareerTrackInfo[];
  internships: VirtualInternship[];
  getInternshipById: (id: string) => VirtualInternship | undefined;
  getTrackById: (id: CareerTrackId) => CareerTrackInfo | undefined;

  // User & State
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  setUserCareerTrack: (trackId: CareerTrackId) => void;

  // Simulation Operations
  enrollInInternship: (internshipId: string) => void;
  submitTaskDeliverable: (
    internshipId: string, 
    taskId: string, 
    milestoneId: string, 
    content: string, 
    notes?: string
  ) => Promise<ReviewResult>;
  sendSupervisorMessage: (
    internshipId: string, 
    messageText: string, 
    currentTaskTitle?: string
  ) => Promise<void>;
  
  // Active Simulation Helpers
  isSubmittingReview: boolean;
  isSupervisorReplying: boolean;

  // InternLab Mentor Assistant
  isMentorOpen: boolean;
  mentorOptions: MentorOpenOptions | null;
  activeMentorThread: MentorThread;
  isMentorThinking: boolean;
  openMentor: (options?: MentorOpenOptions) => void;
  closeMentor: () => void;
  toggleMentor: (options?: MentorOpenOptions) => void;
  sendMentorPrompt: (promptText: string, capability?: MentorCapability) => Promise<void>;
  clearActiveMentorThread: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'internlab_user_profile_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<AppRoute>({ view: 'landing' });
  const [tracks] = useState<CareerTrackInfo[]>(CAREER_TRACKS);
  const [internships] = useState<VirtualInternship[]>(VIRTUAL_INTERNSHIPS);
  const [authSession, setAuthSession] = useState<SessionData | null>(() => authService.getSession());
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse user profile from local storage', e);
    }
    return INITIAL_USER_PROFILE;
  });

  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [isSupervisorReplying, setIsSupervisorReplying] = useState<boolean>(false);

  // InternLab Mentor Assistant State
  const [isMentorOpen, setIsMentorOpen] = useState<boolean>(false);
  const [mentorOptions, setMentorOptions] = useState<MentorOpenOptions | null>(null);
  const [isMentorThinking, setIsMentorThinking] = useState<boolean>(false);

  const getInitialThreadForView = (contextView: MentorContextView, contextTitle: string): MentorThread => {
    let welcomeText = `Hi ${userProfile.fullName.split(' ')[0] || 'there'}! I'm ${MENTOR_PROFILE.name}, ${MENTOR_PROFILE.role} at ${MENTOR_PROFILE.company}. I'm here as your contextual engineering mentor.`;
    let suggestedFollowUps = ['Help me understand the requirements', 'Give me a hint', 'Review my approach'];

    if (contextView === 'workspace') {
      welcomeText = `Welcome to the **Sprint 3 Workspace**! I'm ${MENTOR_PROFILE.name}. I can help you unpack the acceptance criteria, provide progressive hints without giving away solutions, break down state patterns, or review your code approach before submission.`;
      suggestedFollowUps = ['Help me understand the requirements', 'Explain the first step', 'Give me a hint for color variant state'];
    } else if (contextView === 'project-feedback') {
      welcomeText = `I've reviewed your **Sprint 3: Task 1** submission (*84 / 100 score*). Problem Solving was strong at 90, while UI/UX accessibility and image optimization have high-leverage areas for improvement. Let's discuss how to polish this to 95+!`;
      suggestedFollowUps = ['Explain my score', 'How can I improve this?', 'Show me what to learn next'];
    } else if (contextView === 'dashboard') {
      welcomeText = `Good to see you on your **InternLab Dashboard**! I'm tracking your sprint completion rate and verified skills. Let me know if you'd like guidance on daily priorities, transcript credentials, or interview portfolio framing.`;
      suggestedFollowUps = ['What should I work on today?', 'Review my internship progress', 'How to improve my skills growth?'];
    }

    return {
      id: 'thread-' + contextView + '-' + Date.now(),
      contextView,
      contextTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'welcome-msg',
          sender: 'mentor',
          senderName: MENTOR_PROFILE.name,
          senderTitle: `${MENTOR_PROFILE.role} @ ${MENTOR_PROFILE.company}`,
          timestamp: 'Just now',
          text: welcomeText,
          capability: 'general',
          suggestedFollowUps,
        },
      ],
    };
  };

  const [mentorThreads, setMentorThreads] = useState<Record<string, MentorThread>>(() => {
    try {
      const stored = localStorage.getItem('internlab_mentor_threads_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse mentor threads from localStorage', e);
    }
    return {};
  });

  const getEffectiveContextView = (): MentorContextView => {
    if (mentorOptions?.view) return mentorOptions.view;
    if (route.view === 'workspace') return 'workspace';
    if (route.view === 'project-feedback') return 'project-feedback';
    if (route.view === 'dashboard') return 'dashboard';
    return 'general';
  };

  const currentContextView = getEffectiveContextView();
  const currentContextTitle = mentorOptions?.contextTitle || 
    (currentContextView === 'workspace' ? 'Sprint 3: Responsive E-commerce Page' : 
     currentContextView === 'project-feedback' ? 'Review: Responsive Product Page (84/100)' : 
     currentContextView === 'dashboard' ? 'InternLab Engineering Trajectory' : 'Virtual Internship Workspace');

  const threadKey = currentContextView;
  const activeMentorThread: MentorThread = mentorThreads[threadKey] || getInitialThreadForView(currentContextView, currentContextTitle);

  // Persist mentor threads
  useEffect(() => {
    try {
      localStorage.setItem('internlab_mentor_threads_v1', JSON.stringify(mentorThreads));
    } catch (e) {
      console.warn('Failed to persist mentor threads', e);
    }
  }, [mentorThreads]);

  const openMentor = (options?: MentorOpenOptions) => {
    if (options) {
      setMentorOptions(options);
    }
    setIsMentorOpen(true);

    if (options?.initialPrompt) {
      sendMentorPrompt(options.initialPrompt, options.capability);
    }
  };

  const closeMentor = () => {
    setIsMentorOpen(false);
  };

  const toggleMentor = (options?: MentorOpenOptions) => {
    if (isMentorOpen) {
      setIsMentorOpen(false);
    } else {
      openMentor(options);
    }
  };

  const clearActiveMentorThread = () => {
    const newThread = getInitialThreadForView(currentContextView, currentContextTitle);
    setMentorThreads((prev) => ({
      ...prev,
      [threadKey]: newThread,
    }));
  };

  const sendMentorPrompt = async (promptText: string, capability?: MentorCapability) => {
    if (!promptText.trim()) return;

    const userMsg: MentorMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      senderName: userProfile.fullName || 'Student',
      timestamp: 'Just now',
      text: promptText,
      capability,
    };

    // Optimistically update current thread
    const currentThread = activeMentorThread;
    const updatedMessages = [...currentThread.messages, userMsg];

    setMentorThreads((prev) => ({
      ...prev,
      [threadKey]: {
        ...currentThread,
        updatedAt: new Date().toISOString(),
        messages: updatedMessages,
      },
    }));

    setIsMentorThinking(true);

    try {
      // 1. First fetch curated engineering response for guaranteed depth & formatting
      const curated = getCuratedMentorResponse(promptText, currentContextView, capability);

      // 2. Try server API if available
      let replyText = curated.text;
      let replySnippets = curated.codeSnippets;
      let replyResources = curated.resources;
      let followUps = curated.suggestedFollowUps;

      try {
        const res = await fetch('/api/mentor/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            internshipTitle: 'Nova Labs Frontend Engineering Simulation',
            supervisorName: MENTOR_PROFILE.name,
            supervisorTitle: MENTOR_PROFILE.role,
            companyName: MENTOR_PROFILE.company,
            systemPrompt: `You are ${MENTOR_PROFILE.name}, ${MENTOR_PROFILE.role} at ${MENTOR_PROFILE.company}.
You are advising a student in context: ${currentContextView} (${currentContextTitle}).
Give high-signal, professional workplace mentorship with code snippets or architectural breakdowns when helpful. Never sound like a generic chatbot.`,
            messages: updatedMessages.map(m => ({ sender: m.sender === 'user' ? 'user' : 'model', text: m.text })),
            currentTaskTitle: currentContextTitle,
            enableThinking: false,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply && !data.isFallback && data.reply.length > 50) {
            replyText = data.reply;
          }
        }
      } catch (err) {
        // Fallback gracefully to curated rich engineering response
      }

      const mentorReplyMsg: MentorMessage = {
        id: 'msg-mentor-' + Date.now(),
        sender: 'mentor',
        senderName: MENTOR_PROFILE.name,
        senderTitle: `${MENTOR_PROFILE.role} @ ${MENTOR_PROFILE.company}`,
        timestamp: 'Just now',
        text: replyText,
        capability: capability || 'general',
        codeSnippets: replySnippets,
        resources: replyResources,
        suggestedFollowUps: followUps,
      };

      setMentorThreads((prev) => {
        const thread = prev[threadKey] || currentThread;
        return {
          ...prev,
          [threadKey]: {
            ...thread,
            updatedAt: new Date().toISOString(),
            messages: [...thread.messages, mentorReplyMsg],
          },
        };
      });
    } catch (e) {
      console.error('Error handling mentor response:', e);
    } finally {
      setIsMentorThinking(false);
    }
  };

  // Sync session changes
  useEffect(() => {
    const session = authService.getSession();
    if (session) {
      setAuthSession(session);
      setUserProfile((prev) => ({
        ...prev,
        fullName: session.user.fullName || prev.fullName,
        email: session.user.email || prev.email,
        university: session.user.university || prev.university
      }));
    }
  }, []);

  const handleSignUp = async (params: SignUpParams): Promise<AuthResponse<SessionData>> => {
    const res = await authService.signUp(params);
    if (res.data) {
      setAuthSession(res.data);
      setUserProfile((prev) => ({
        ...prev,
        id: res.data!.user.id,
        fullName: res.data!.user.fullName,
        email: res.data!.user.email,
        university: res.data!.user.university || 'Student'
      }));
    }
    return res;
  };

  const handleSignIn = async (params: SignInParams): Promise<AuthResponse<SessionData>> => {
    const res = await authService.signIn(params);
    if (res.data) {
      setAuthSession(res.data);
      setUserProfile((prev) => ({
        ...prev,
        id: res.data!.user.id,
        fullName: res.data!.user.fullName,
        email: res.data!.user.email,
        university: res.data!.user.university || prev.university
      }));
    }
    return res;
  };

  const handleSignInWithGoogle = async (): Promise<AuthResponse<SessionData>> => {
    const res = await authService.signInWithGoogle();
    if (res.data) {
      setAuthSession(res.data);
      setUserProfile((prev) => ({
        ...prev,
        id: res.data!.user.id,
        fullName: res.data!.user.fullName,
        email: res.data!.user.email,
        university: res.data!.user.university || prev.university
      }));
    }
    return res;
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setAuthSession(null);
  };

  const handleResetPassword = async (params: ResetPasswordParams) => {
    return await authService.resetPassword(params);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Failed to persist user profile', e);
    }
  }, [userProfile]);

  const navigate = (newRoute: AppRoute) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInternshipById = (id: string) => {
    return internships.find((item) => item.id === id || item.slug === id);
  };

  const getTrackById = (id: CareerTrackId) => {
    return tracks.find((t) => t.id === id);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updates };
      const currentUserId = authSession?.user?.id || next.id;

      if (currentUserId) {
        databaseService.upsertProfile({
          id: currentUserId,
          full_name: next.fullName,
          email: next.email,
          college: next.onboardingData?.university || undefined,
          degree: next.onboardingData?.degree || undefined,
          education_year: next.onboardingData?.currentYear || undefined,
          experience_level: next.experienceLevel,
          weekly_availability: next.onboardingData?.weeklyAvailability || `${next.weeklyHourCommitment} hours`
        }).catch(err => {
          console.warn('Supabase profile sync notice:', err);
        });

        if (updates.interests && updates.interests.length > 0) {
          databaseService.saveUserCareerInterests(currentUserId, updates.interests).catch(err => {
            console.warn('Supabase career interests sync notice:', err);
          });
        }
      }

      return next;
    });
  };

  const setUserCareerTrack = (trackId: CareerTrackId) => {
    setUserProfile((prev) => {
      const next = {
        ...prev,
        targetCareerTrack: trackId,
      };

      const currentUserId = authSession?.user?.id || next.id;
      if (currentUserId) {
        databaseService.saveUserCareerInterests(currentUserId, [trackId]).catch(err => {
          console.warn('Supabase career interests sync notice:', err);
        });
      }

      return next;
    });
  };

  const enrollInInternship = (internshipId: string) => {
    const internship = getInternshipById(internshipId);
    if (!internship) return;

    // Persist to Supabase if authenticated
    if (authSession?.user?.id) {
      databaseService.enrollUserInInternship(authSession.user.id, internshipId).catch(err => {
        console.warn('Supabase enrollment sync notice:', err);
      });
    }

    setUserProfile((prev) => {
      if (prev.enrolledInternships[internshipId]) {
        return prev;
      }

      const initialChat: ChatMessage = {
        id: 'msg-' + Date.now(),
        sender: 'supervisor',
        senderName: internship.supervisor.name,
        timestamp: 'Just now',
        text: `Welcome to ${internship.companyName}! I'm ${internship.supervisor.name}, ${internship.supervisor.title}. I'm excited to have you on the team. Check out the Week 1 milestone briefing and let me know when you have questions on the task specs.`,
      };

      return {
        ...prev,
        enrolledInternships: {
          ...prev.enrolledInternships,
          [internshipId]: {
            internshipId,
            enrolledDate: new Date().toISOString().split('T')[0],
            status: 'active',
            currentWeekNumber: 1,
            completedTaskIds: [],
            submissions: {},
            chatHistory: [initialChat],
          },
        },
      };
    });

    navigate({ view: 'workspace', internshipId, activeTab: 'briefing' });
  };

  const submitTaskDeliverable = async (
    internshipId: string,
    taskId: string,
    milestoneId: string,
    content: string,
    notes?: string
  ): Promise<ReviewResult> => {
    setIsSubmittingReview(true);
    const internship = getInternshipById(internshipId);
    
    // Find task & rubric
    let targetTask: any = null;
    if (internship) {
      for (const m of internship.milestones) {
        const found = m.tasks.find((t) => t.id === taskId);
        if (found) {
          targetTask = found;
          break;
        }
      }
    }

    try {
      const response = await fetch('/api/submissions/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipTitle: internship?.title || 'Virtual Internship',
          companyName: internship?.companyName || 'Host Company',
          taskTitle: targetTask?.title || 'Deliverable Submission',
          deliverableType: targetTask?.deliverableType || 'document',
          taskInstructions: targetTask?.instructionsMarkdown || '',
          rubricCriteria: targetTask?.rubricCriteria || [],
          submissionContent: content,
          notesForSupervisor: notes,
        }),
      });

      const data = await response.json();
      const review: ReviewResult = data.review;

      // Persist to Supabase entities (PROJECT_SUBMISSIONS, PROJECT_FEEDBACK, TASK_PROGRESS, USER_INTERNSHIPS)
      const currentUserId = authSession?.user?.id || userProfile.id;
      if (currentUserId) {
        databaseService.submitProject(currentUserId, taskId, {
          description: content,
          githubUrl: notes?.includes('github.com') ? notes : undefined
        }).then(async (submissionRes) => {
          if (submissionRes.data?.id) {
            await databaseService.saveProjectFeedback(submissionRes.data.id, {
              overallScore: review.overallScore,
              codeQuality: review.criteriaScores?.[0]?.scorePercent,
              problemSolving: review.criteriaScores?.[1]?.scorePercent,
              uiUx: review.criteriaScores?.[2]?.scorePercent,
              documentation: review.criteriaScores?.[3]?.scorePercent,
              strengths: review.strengths,
              improvements: review.areasForImprovement,
              feedback: review.summaryFeedback
            });
          }

          await databaseService.updateTaskProgress(
            currentUserId, 
            taskId, 
            review.passed ? 'completed' : 'in_progress'
          );

          // Calculate internship total tasks and updated progress percentage
          const totalTasksInSim = internship?.milestones.reduce((acc, m) => acc + m.tasks.length, 0) || 4;
          const prevCompleted = userProfile.enrolledInternships[internshipId]?.completedTaskIds || [];
          const allCompleted = Array.from(new Set([...prevCompleted, taskId]));
          const progressPercent = Math.min(100, Math.round((allCompleted.length / totalTasksInSim) * 100));

          await databaseService.updateUserInternshipProgress(
            currentUserId,
            internshipId,
            progressPercent,
            progressPercent >= 100 ? 'completed' : 'in_progress'
          );
        }).catch(err => {
          console.warn('Supabase project submission persistence notice:', err);
        });
      }

      // Update student profile state with the submission
      setUserProfile((prev) => {
        const currentEnrollment = prev.enrolledInternships[internshipId] || {
          internshipId,
          enrolledDate: new Date().toISOString().split('T')[0],
          status: 'active',
          currentWeekNumber: 1,
          completedTaskIds: [],
          submissions: {},
          chatHistory: [],
        };

        const updatedCompleted = Array.from(
          new Set([...currentEnrollment.completedTaskIds, taskId])
        );

        const newSubmission: TaskSubmission = {
          taskId,
          milestoneId,
          submittedAt: new Date().toISOString(),
          content,
          notesForSupervisor: notes,
          status: review.passed ? 'approved' : 'needs_revision',
          review,
        };

        // Create portfolio artifact if passed
        const updatedPortfolio = [...prev.portfolio];
        if (review.passed && internship && targetTask) {
          const existingIndex = updatedPortfolio.findIndex((p) => p.internshipId === internshipId && p.projectTitle === targetTask.title);
          const artifact: PortfolioArtifact = {
            id: 'port-' + Date.now(),
            internshipId,
            internshipTitle: internship.title,
            companyName: internship.companyName,
            trackId: internship.trackId,
            projectTitle: targetTask.title,
            deliverableType: targetTask.deliverableType,
            completedDate: new Date().toISOString().split('T')[0],
            summary: review.summaryFeedback,
            keySkills: internship.toolsUsed.slice(0, 4),
            score: review.overallScore,
            credentialUrl: `https://internlab.dev/verify/credential/IL-${Date.now().toString(36).toUpperCase()}`,
          };

          if (existingIndex >= 0) {
            updatedPortfolio[existingIndex] = artifact;
          } else {
            updatedPortfolio.unshift(artifact);
          }
        }

        return {
          ...prev,
          enrolledInternships: {
            ...prev.enrolledInternships,
            [internshipId]: {
              ...currentEnrollment,
              completedTaskIds: updatedCompleted,
              submissions: {
                ...currentEnrollment.submissions,
                [taskId]: newSubmission,
              },
            },
          },
          portfolio: updatedPortfolio,
          stats: {
            ...prev.stats,
            hoursLogged: prev.stats.hoursLogged + Math.round((targetTask?.estimatedMinutes || 60) / 60),
            averageReviewScore: Math.round(
              (prev.stats.averageReviewScore + review.overallScore) / 2
            ),
          },
        };
      });

      return review;
    } catch (err) {
      console.error('Error submitting deliverable:', err);
      throw err;
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const sendSupervisorMessage = async (
    internshipId: string,
    messageText: string,
    currentTaskTitle?: string
  ): Promise<void> => {
    const internship = getInternshipById(internshipId);
    if (!internship) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      senderName: userProfile.fullName,
      timestamp: 'Just now',
      text: messageText,
    };

    // Optimistically update conversation history
    setUserProfile((prev) => {
      const enrollment = prev.enrolledInternships[internshipId];
      if (!enrollment) return prev;
      return {
        ...prev,
        enrolledInternships: {
          ...prev.enrolledInternships,
          [internshipId]: {
            ...enrollment,
            chatHistory: [...enrollment.chatHistory, userMessage],
          },
        },
      };
    });

    setIsSupervisorReplying(true);

    try {
      const enrollment = userProfile.enrolledInternships[internshipId];
      const previousMessages = enrollment ? [...enrollment.chatHistory, userMessage] : [userMessage];

      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipTitle: internship.title,
          supervisorName: internship.supervisor.name,
          supervisorTitle: internship.supervisor.title,
          companyName: internship.companyName,
          systemPrompt: internship.supervisor.systemInstructionPrompt,
          messages: previousMessages,
          currentTaskTitle,
          enableThinking: true,
        }),
      });

      const data = await response.json();
      const replyMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'supervisor',
        senderName: internship.supervisor.name,
        timestamp: 'Just now',
        text: data.reply || "I've reviewed your question. Let's make sure our approach matches the project guidelines.",
      };

      setUserProfile((prev) => {
        const enr = prev.enrolledInternships[internshipId];
        if (!enr) return prev;
        return {
          ...prev,
          enrolledInternships: {
            ...prev.enrolledInternships,
            [internshipId]: {
              ...enr,
              chatHistory: [...enr.chatHistory, replyMessage],
            },
          },
        };
      });
    } catch (e) {
      console.error('Error fetching supervisor response:', e);
    } finally {
      setIsSupervisorReplying(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        route,
        navigate,
        authSession,
        isAuthenticated: Boolean(authSession),
        signUp: handleSignUp,
        signIn: handleSignIn,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
        resetPassword: handleResetPassword,
        tracks,
        internships,
        getInternshipById,
        getTrackById,
        userProfile,
        updateUserProfile,
        setUserCareerTrack,
        enrollInInternship,
        submitTaskDeliverable,
        sendSupervisorMessage,
        isSubmittingReview,
        isSupervisorReplying,
        isMentorOpen,
        mentorOptions,
        activeMentorThread,
        isMentorThinking,
        openMentor,
        closeMentor,
        toggleMentor,
        sendMentorPrompt,
        clearActiveMentorThread,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
