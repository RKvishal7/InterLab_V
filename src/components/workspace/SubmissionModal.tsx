import React from 'react';
import { WorkspaceDeliverableState } from './types';
import { ProjectSubmissionExperience } from './ProjectSubmissionExperience';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliverables?: WorkspaceDeliverableState;
  onConfirmSubmit?: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  deliverables,
  onConfirmSubmit,
}) => {
  return (
    <ProjectSubmissionExperience
      isOpen={isOpen}
      onClose={onClose}
      onConfirmSubmit={onConfirmSubmit}
      initialDeliverables={deliverables}
    />
  );
};

