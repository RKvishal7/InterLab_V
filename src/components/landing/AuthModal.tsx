import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Button, SecondaryButton, IconButton } from '../../design-system/Button';
import { Input } from '../../design-system/FormControls';
import { useApp } from '../../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  onSuccess,
}) => {
  const { navigate, userProfile, updateUserProfile } = useApp();
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'signup' && fullName) {
      updateUserProfile({
        fullName,
        email: email || 'student@university.edu',
        university: university || 'University Student',
      });
    }
    onClose();
    if (onSuccess) {
      onSuccess();
    } else {
      navigate({ view: 'discover' });
    }
  };

  const handleDemoStudentLogin = () => {
    updateUserProfile({
      fullName: 'Alex Chen',
      email: 'alex.chen@berkeley.edu',
      university: 'UC Berkeley (Class of 2026)',
    });
    onClose();
    if (onSuccess) {
      onSuccess();
    } else {
      navigate({ view: 'discover' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm max-w-md w-full p-6 sm:p-8 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2E2DE]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center text-xs font-mono font-bold">
              IL
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A1C1E]">
                {tab === 'login' ? 'Student Sign In' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-[#8A8A85]">
                {tab === 'login' ? 'Access your virtual workplace simulations' : 'Join 50,000+ students gaining real experience'}
              </p>
            </div>
          </div>

          <IconButton
            icon={<X className="w-4 h-4" />}
            label="Close modal"
            variant="ghost"
            onClick={onClose}
          />
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#E2E2DE] mb-5">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 text-center transition-colors ${
              tab === 'login'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 text-center transition-colors ${
              tab === 'signup'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
            }`}
          >
            Register Student
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'signup' && (
            <>
              <Input
                label="Full Name"
                placeholder="e.g. Alex Chen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="University or College"
                placeholder="e.g. UC Berkeley"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </>
          )}

          <Input
            label="Student Email"
            type="email"
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {tab === 'login' ? 'Sign In to Workspace' : 'Create Free Account'}
            </Button>
          </div>
        </form>

        {/* Demo Fast Login Option */}
        <div className="mt-5 pt-4 border-t border-[#E2E2DE] space-y-2.5 text-center">
          <div className="text-xs text-[#8A8A85] font-mono">
            Fast Preview:
          </div>
          <button
            type="button"
            onClick={handleDemoStudentLogin}
            className="w-full py-2 px-3 rounded-sm bg-[#F2F1EE] border border-[#E2E2DE] hover:bg-[#EAE8E4] text-xs font-mono font-semibold text-[#1A1C1E] transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#3E51FF]" />
            <span>Launch Instant Demo as Alex Chen (Student)</span>
          </button>

          <div className="pt-2 text-center text-xs text-[#484B4F]">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate({ view: tab === 'login' ? 'login' : 'signup' });
              }}
              className="text-xs text-[#8A8A85] hover:text-[#1A1C1E] underline decoration-[#E2E2DE]"
            >
              Open dedicated full-page {tab === 'login' ? 'Sign In' : 'Sign Up'} &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
