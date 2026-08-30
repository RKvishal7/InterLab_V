export type MentorCapability = 
  | 'explain-task'
  | 'hint'
  | 'breakdown'
  | 'review-approach'
  | 'resources'
  | 'improvements'
  | 'general';

export type MentorContextView = 'workspace' | 'project-feedback' | 'dashboard' | 'general';

export interface MentorResource {
  title: string;
  url: string;
  domain: string;
  type: 'doc' | 'guide' | 'spec' | 'article';
  description?: string;
}

export interface MentorCodeSnippet {
  language: string;
  code: string;
  label?: string;
  explanation?: string;
}

export interface MentorMessage {
  id: string;
  sender: 'user' | 'mentor';
  senderName: string;
  senderTitle?: string;
  timestamp: string;
  text: string;
  capability?: MentorCapability;
  codeSnippets?: MentorCodeSnippet[];
  resources?: MentorResource[];
  suggestedFollowUps?: string[];
  isThinking?: boolean;
}

export interface MentorThread {
  id: string;
  contextView: MentorContextView;
  contextTitle: string;
  internshipId?: string;
  taskId?: string;
  createdAt: string;
  updatedAt: string;
  messages: MentorMessage[];
}

export interface MentorOpenOptions {
  view?: MentorContextView;
  contextTitle?: string;
  internshipId?: string;
  taskId?: string;
  initialPrompt?: string;
  capability?: MentorCapability;
}

export interface ContextualPrompt {
  id: string;
  label: string;
  capability: MentorCapability;
  description?: string;
  promptText: string;
}
