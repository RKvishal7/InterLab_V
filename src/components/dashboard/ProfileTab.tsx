import React from 'react';
import { 
  User, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  Target, 
  Clock, 
  Sparkles, 
  Shield, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileTab: React.FC = () => {
  const { userProfile, navigate } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="profile-tab-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            Student Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
            Your educational credentials, target tracks, and simulated workplace portfolio.
          </p>
        </div>

        <button
          onClick={() => alert('Profile update modal opened')}
          className="px-4 py-2 bg-[#F9F8F6] hover:bg-[#F2F1EE] text-[#1A1C1E] text-xs font-semibold rounded-xs border border-[#E2E2DE] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Main Info Card */}
      <div className="bg-white border border-[#E2E2DE] rounded-lg p-6 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-16 h-16 rounded-md bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xl font-mono shadow-xs shrink-0">
            {userProfile.fullName ? userProfile.fullName.split(' ').map(n => n[0]).join('') : 'AM'}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[#1A1C1E]">
              {userProfile.fullName || 'Alex Morgan'}
            </h3>
            <p className="text-sm text-[#5A5C60] font-medium">
              {userProfile.headline || 'Aspiring Software Engineer & Computer Science Junior'}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#8A8A85] pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{userProfile.email || 'alex.morgan@university.edu'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>B.S. Computer Science • Junior (Class of 2027)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="pt-4 border-t border-[#E2E2DE] space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
            Biography & Career Goals
          </h4>
          <p className="text-xs sm:text-sm text-[#484B4F] leading-relaxed">
            {userProfile.bio || 'Studying Computer Science and Distributed Systems. Passionate about high-throughput APIs, cloud infrastructure, and practical workplace challenges.'}
          </p>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E2DE]">
          <div className="bg-[#F9F8F6] p-3.5 rounded-md border border-[#E2E2DE]">
            <span className="text-[11px] font-mono uppercase text-[#8A8A85] block mb-1">Target Track</span>
            <div className="text-xs font-bold text-[#1A1C1E]">Software Engineering & Frontend</div>
          </div>

          <div className="bg-[#F9F8F6] p-3.5 rounded-md border border-[#E2E2DE]">
            <span className="text-[11px] font-mono uppercase text-[#8A8A85] block mb-1">Experience Level</span>
            <div className="text-xs font-bold text-[#1A1C1E]">Intermediate Student (3+ Projects)</div>
          </div>

          <div className="bg-[#F9F8F6] p-3.5 rounded-md border border-[#E2E2DE]">
            <span className="text-[11px] font-mono uppercase text-[#8A8A85] block mb-1">Weekly Commitment</span>
            <div className="text-xs font-bold text-[#1A1C1E]">10 Hours / Week (Active)</div>
          </div>
        </div>

      </div>

    </div>
  );
};
