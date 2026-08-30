import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Filter, 
  Search, 
  Tag, 
  Code2, 
  Terminal,
  AlertCircle,
  CheckCircle2,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TasksTab: React.FC = () => {
  const { navigate } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedIds, setCompletedIds] = useState<string[]>(['task-101', 'task-102']);

  const allTasks = [
    {
      id: 'task-build-product-page',
      week: 'Week 3',
      title: 'Build Product Page',
      due: 'Tomorrow',
      urgency: 'urgent',
      estimated: '2.5 hrs',
      skills: ['React 18', 'Tailwind CSS', 'State Management'],
      description: 'Implement the responsive product catalog grid with live category tags and cart drawer hook.',
      internshipTitle: 'Frontend Developer Internship',
      internshipId: 'intern-nova-frontend',
    },
    {
      id: 'task-implement-auth',
      week: 'Week 3',
      title: 'Implement Authentication',
      due: 'In 3 Days',
      urgency: 'upcoming',
      estimated: '3.0 hrs',
      skills: ['JWT', 'React Context', 'Form Validation'],
      description: 'Connect login and session persistence tokens with client-side route guard middleware.',
      internshipTitle: 'Frontend Developer Internship',
      internshipId: 'intern-nova-frontend',
    },
    {
      id: 'task-optimize-mobile',
      week: 'Week 3',
      title: 'Optimize Mobile Experience',
      due: 'In 5 Days',
      urgency: 'standard',
      estimated: '1.5 hrs',
      skills: ['WCAG AA', 'Lighthouse', 'Touch Targets'],
      description: 'Audit touch targets (min 44px) and verify zero horizontal layout overflow on 375px screens.',
      internshipTitle: 'Frontend Developer Internship',
      internshipId: 'intern-nova-frontend',
    },
    {
      id: 'task-101',
      week: 'Week 2',
      title: 'Develop Reusable Data Grid Component',
      due: 'Completed',
      urgency: 'completed',
      estimated: '4.0 hrs',
      skills: ['TypeScript', 'Generics', 'Pagination'],
      description: 'Engineered clean table component supporting sort, filter, and customizable cell formatters.',
      internshipTitle: 'Frontend Developer Internship',
      internshipId: 'intern-nova-frontend',
    },
    {
      id: 'task-102',
      week: 'Week 1',
      title: 'Design System & Typography Token Audit',
      due: 'Completed',
      urgency: 'completed',
      estimated: '3.0 hrs',
      skills: ['CSS Variables', 'Contrast Math', 'HTML5'],
      description: 'Constructed design tokens satisfying WCAG AA 4.5:1 contrast standards.',
      internshipTitle: 'Frontend Developer Internship',
      internshipId: 'intern-nova-frontend',
    },
  ];

  const toggleTask = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredTasks = allTasks.filter(task => {
    const isCompleted = completedIds.includes(task.id);
    if (filterStatus === 'pending' && isCompleted) return false;
    if (filterStatus === 'completed' && !isCompleted) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="tasks-tab-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            Tasks & Milestones
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
            Structured backlog of engineering objectives, deliverables, and automated checks.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#F2F1EE] p-1 rounded-xs border border-[#E2E2DE]">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                filterStatus === 'all' ? 'bg-white text-[#1A1C1E] shadow-2xs' : 'text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
            >
              All ({allTasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                filterStatus === 'pending' ? 'bg-white text-[#1A1C1E] shadow-2xs' : 'text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
            >
              Pending ({allTasks.length - completedIds.length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                filterStatus === 'completed' ? 'bg-white text-[#1A1C1E] shadow-2xs' : 'text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
            >
              Done ({completedIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isChecked = completedIds.includes(task.id);

          return (
            <div
              key={task.id}
              className={`p-4 rounded-lg border transition-all ${
                isChecked
                  ? 'bg-[#F9F8F6] border-[#E2E2DE] opacity-60'
                  : 'bg-white border-[#E2E2DE] hover:border-[#1A1C1E] shadow-xs'
              }`}
              id={`task-card-${task.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                
                {/* Left: Checkbox and Details */}
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-xs border flex items-center justify-center transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-[#1A1C1E] border-[#1A1C1E] text-white'
                        : 'bg-white border-[#8A8A85] hover:border-[#1A1C1E]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#F2F1EE] text-[#1A1C1E] rounded-xs border border-[#E2E2DE]">
                        {task.week}
                      </span>
                      
                      <h3 className={`text-sm sm:text-base font-bold text-[#1A1C1E] ${isChecked ? 'line-through text-[#8A8A85]' : ''}`}>
                        {task.title}
                      </h3>

                      <span className={`px-2 py-0.5 rounded-xs text-[11px] font-semibold font-mono border ${
                        task.urgency === 'urgent'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : task.urgency === 'upcoming'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : isChecked
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]'
                      }`}>
                        {isChecked ? 'Completed ✓' : `Due ${task.due}`}
                      </span>

                      <span className="text-xs font-mono text-[#8A8A85]">
                        • {task.estimated}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5A5C60]">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {task.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 bg-[#F9F8F6] border border-[#E2E2DE] text-[#1A1C1E] rounded-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-2 shrink-0 self-start">
                  {isChecked && (
                    <button
                      onClick={() => navigate({ view: 'project-feedback' })}
                      className="px-3 py-2 text-xs font-bold text-[#3E51FF] hover:bg-[#EEF0FF] border border-[#C5CAFF] rounded-xs transition-colors"
                    >
                      Review
                    </button>
                  )}
                  <button
                    onClick={() => navigate({ view: 'workspace', internshipId: task.internshipId })}
                    className="px-3.5 py-2 text-xs font-semibold text-[#1A1C1E] hover:text-white bg-[#F9F8F6] hover:bg-[#1A1C1E] border border-[#E2E2DE] rounded-xs transition-colors flex items-center gap-1"
                  >
                    <span>Open Task</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
