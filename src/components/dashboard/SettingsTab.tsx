import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Key, 
  Check, 
  Save, 
  Moon, 
  Laptop, 
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsTab: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    mentorMessages: true,
    taskDeadlines: true,
    weeklyDigest: true,
    rubricReviews: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl" id="settings-tab-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            Account & Workspace Settings
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
            Configure notification preferences, simulation environment defaults, and security credentials.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          {saved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Changes Saved' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Notifications Section */}
      <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1A1C1E] flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#3E51FF]" />
          <span>Notification & Alert Preferences</span>
        </h3>

        <div className="space-y-3 pt-2">
          {[
            { key: 'mentorMessages', label: 'Mentor & Supervisor Feedback', desc: 'Get immediate notifications when Elena Rostova or InternLab AI submits feedback.' },
            { key: 'taskDeadlines', label: 'Upcoming Milestone Reminders', desc: 'Receive reminders 24 hours and 3 hours prior to task due dates.' },
            { key: 'rubricReviews', label: 'Rubric Score & Certificate Unlocks', desc: 'Notify immediately when weekly code artifacts are graded.' },
            { key: 'weeklyDigest', label: 'Weekly Career Progress Report', desc: 'Summary of skills growth, hours logged, and top recommended simulations.' },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4 p-3 bg-[#FDFCFB] border border-[#E2E2DE] rounded-md">
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1E]">{item.label}</h4>
                <p className="text-[11px] text-[#5A5C60] mt-0.5">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={(notifications as any)[item.key]}
                onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                className="mt-1 w-4 h-4 rounded-xs border-[#8A8A85] text-[#1A1C1E] focus:ring-0 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Preferences */}
      <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1A1C1E] flex items-center gap-2">
          <Laptop className="w-4 h-4 text-[#3E51FF]" />
          <span>Simulation Workspace Defaults</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-[#1A1C1E] block mb-1">
              Default Code Editor Keybindings
            </label>
            <select className="w-full bg-[#F9F8F6] border border-[#E2E2DE] text-xs p-2 rounded-xs font-mono">
              <option>Standard VS Code</option>
              <option>Vim Mode</option>
              <option>Emacs Mode</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1A1C1E] block mb-1">
              Automated Linter on Commit
            </label>
            <select className="w-full bg-[#F9F8F6] border border-[#E2E2DE] text-xs p-2 rounded-xs font-mono">
              <option>Strict ESLint + TypeScript</option>
              <option>Standard Warnings</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
};
