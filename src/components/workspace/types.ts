export type WorkspaceViewTab = 'brief' | 'preview' | 'submission' | 'resources' | 'discussion';

export interface TaskRequirement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tag: 'UI' | 'Logic' | 'Responsive' | 'Accessibility';
}

export interface WorkspaceDeliverableState {
  githubUrl: string;
  liveUrl: string;
  screenshots: string[];
  documentation: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Design files' | 'Documentation' | 'Reference materials';
  format: string;
  description: string;
  sizeOrLink: string;
  iconName: string;
}
