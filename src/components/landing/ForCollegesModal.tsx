import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Building, Send, ShieldCheck } from 'lucide-react';
import { Button, SecondaryButton, IconButton } from '../../design-system/Button';
import { Input, Select, Textarea } from '../../design-system/FormControls';

interface ForCollegesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForCollegesModal: React.FC<ForCollegesModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [studentsCount, setStudentsCount] = useState('500-2000');
  const [department, setDepartment] = useState('Computer Science / Engineering');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E2DE]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1A1C1E]">
                InternLab for Colleges & Universities
              </h3>
              <p className="text-xs text-[#8A8A85]">
                Integrate industry workplace simulations into your academic curriculum.
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

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#1A1C1E]">
              Inquiry Received
            </h4>
            <p className="text-sm text-[#484B4F] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#1A1C1E]">{contactName || 'Colleague'}</span>. Our Academic Partnerships Director will reach out to <span className="font-semibold text-[#1A1C1E]">{email || 'your email'}</span> within 1 business day with institutional trial access.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={onClose}>
                Return to InternLab
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Value Proposition Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE]">
                <div className="text-xs font-bold text-[#1A1C1E] mb-1">ABET / Curricular Align</div>
                <div className="text-[11px] text-[#8A8A85]">Maps to real project-based capstone requirements.</div>
              </div>
              <div className="p-3 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE]">
                <div className="text-xs font-bold text-[#1A1C1E] mb-1">Canvas / LTI Ready</div>
                <div className="text-[11px] text-[#8A8A85]">Single sign-on and automated gradebook sync.</div>
              </div>
              <div className="p-3 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE]">
                <div className="text-xs font-bold text-[#1A1C1E] mb-1">Career Center Analytics</div>
                <div className="text-[11px] text-[#8A8A85]">Track student outcome metrics & job placements.</div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="University / College Name"
                  placeholder="e.g. Stanford University"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  required
                />
                <Input
                  label="Faculty / Administrator Name"
                  placeholder="e.g. Dr. Eleanor Vance"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Institutional Email (.edu preferred)"
                  type="email"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Select
                  label="Academic Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  options={[
                    { value: 'Computer Science / Engineering', label: 'Computer Science / Engineering' },
                    { value: 'Data Science & Statistics', label: 'Data Science & Statistics' },
                    { value: 'Business & Management', label: 'Business & Management' },
                    { value: 'Design & Human-Computer Interaction', label: 'Design & HCI' },
                    { value: 'Career Services / Experiential Learning', label: 'Career Services Center' },
                  ]}
                />
              </div>

              <Textarea
                label="Course / Program Goals"
                placeholder="Describe your student cohort or specific simulation tracks of interest..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />

              <div className="pt-4 border-t border-[#E2E2DE] flex items-center justify-between">
                <span className="text-xs text-[#8A8A85] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#115E59]" />
                  <span>FERPA Compliant Data Handling</span>
                </span>

                <div className="flex items-center gap-2">
                  <SecondaryButton type="button" onClick={onClose}>
                    Cancel
                  </SecondaryButton>
                  <Button type="submit" variant="primary" rightIcon={<Send className="w-3.5 h-3.5" />}>
                    Request Academic Pilot
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
