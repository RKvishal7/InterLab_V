import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  GitPullRequest, 
  Layers, 
  BookOpen, 
  TrendingUp, 
  Check, 
  Copy, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  ArrowRight,
  Code2,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { 
  MentorCapability, 
  MentorMessage, 
  ContextualPrompt 
} from './types';
import { 
  CONTEXTUAL_PROMPTS_BY_VIEW, 
  MENTOR_PROFILE 
} from './mentorKnowledgeBase';

export const MentorAssistantPanel: React.FC = () => {
  const { 
    isMentorOpen, 
    closeMentor, 
    activeMentorThread, 
    isMentorThinking, 
    sendMentorPrompt, 
    clearActiveMentorThread,
    route,
    mentorOptions
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<MentorCapability | 'all'>('all');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMentorOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isMentorOpen, activeMentorThread.messages, isMentorThinking]);

  if (!isMentorOpen) return null;

  const currentView = activeMentorThread.contextView;
  const contextualPrompts: ContextualPrompt[] = CONTEXTUAL_PROMPTS_BY_VIEW[currentView] || CONTEXTUAL_PROMPTS_BY_VIEW.general;

  const filteredPrompts = selectedCapability === 'all' 
    ? contextualPrompts 
    : contextualPrompts.filter(p => p.capability === selectedCapability);

  const handleSend = (text: string, capability?: MentorCapability) => {
    if (!text.trim() || isMentorThinking) return;
    sendMentorPrompt(text, capability);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputVal);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const capabilityIcons: Record<MentorCapability, React.ReactNode> = {
    'explain-task': <HelpCircle className="w-3.5 h-3.5 text-[#3E51FF]" />,
    'hint': <Lightbulb className="w-3.5 h-3.5 text-amber-600" />,
    'breakdown': <Layers className="w-3.5 h-3.5 text-indigo-600" />,
    'review-approach': <GitPullRequest className="w-3.5 h-3.5 text-emerald-600" />,
    'resources': <BookOpen className="w-3.5 h-3.5 text-sky-600" />,
    'improvements': <TrendingUp className="w-3.5 h-3.5 text-teal-600" />,
    'general': <MessageSquare className="w-3.5 h-3.5 text-[#5A5C60]" />,
  };

  const capabilityLabels: Record<MentorCapability, string> = {
    'explain-task': 'Explain Task',
    'hint': 'Provide Hint',
    'breakdown': 'Break Down Problem',
    'review-approach': 'Review Approach',
    'resources': 'Learning Resources',
    'improvements': 'Improvement Tips',
    'general': 'General Guidance',
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end transition-opacity duration-200"
      id="mentor-assistant-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMentor();
      }}
    >
      <div 
        className={`bg-[#FAF9F7] text-[#1A1C1E] h-full shadow-2xl border-l border-[#D5D3CB] flex flex-col transition-all duration-300 ${
          isExpanded ? 'w-full max-w-3xl' : 'w-full sm:w-[460px]'
        }`}
        id="mentor-assistant-panel"
      >
        {/* 1. Header: Professional Mentor Identity */}
        <div className="p-4 bg-white border-b border-[#E5E3DC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-sm bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-sm tracking-tight border border-[#D5D3CB]">
                {MENTOR_PROFILE.avatarInitials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#1A1C1E]">{MENTOR_PROFILE.name}</span>
                <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold tracking-wider bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
                  {MENTOR_PROFILE.company}
                </span>
              </div>
              <div className="text-[11px] text-[#5A5C60] flex items-center gap-1.5">
                <span>{MENTOR_PROFILE.role}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{MENTOR_PROFILE.status}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={clearActiveMentorThread}
              title="Clear active conversation"
              className="p-1.5 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
              id="mentor-clear-thread"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse panel' : 'Expand panel'}
              className="p-1.5 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors hidden sm:block"
              id="mentor-toggle-expand"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={closeMentor}
              className="p-1.5 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
              id="mentor-close-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Context Breadcrumb & Active Scope */}
        <div className="px-4 py-2.5 bg-[#F2F1EE] border-b border-[#E5E3DC] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase rounded-xs bg-white text-[#1A1C1E] border border-[#D5D3CB]">
              Context
            </span>
            <span className="font-semibold text-[#3A3C40] truncate">
              {activeMentorThread.contextTitle}
            </span>
          </div>
          <div className="shrink-0 text-[10px] text-[#5A5C60] font-mono">
            {currentView === 'workspace' ? 'Task Guidance' : currentView === 'project-feedback' ? 'Review Analysis' : 'Trajectory'}
          </div>
        </div>

        {/* 3. Capability Filter Tabs */}
        <div className="px-4 py-2 bg-white border-b border-[#E5E3DC] overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          <button
            onClick={() => setSelectedCapability('all')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-xs transition-colors whitespace-nowrap ${
              selectedCapability === 'all'
                ? 'bg-[#1A1C1E] text-white'
                : 'bg-[#F2F1EE] text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
          >
            All Questions
          </button>
          {(['explain-task', 'hint', 'breakdown', 'review-approach', 'resources', 'improvements'] as MentorCapability[]).map((cap) => (
            <button
              key={cap}
              onClick={() => setSelectedCapability(cap)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                selectedCapability === cap
                  ? 'bg-[#1A1C1E] text-white'
                  : 'bg-[#F9F8F6] text-[#5A5C60] hover:text-[#1A1C1E] border border-[#E5E3DC]'
              }`}
            >
              {capabilityIcons[cap]}
              <span>{capabilityLabels[cap]}</span>
            </button>
          ))}
        </div>

        {/* 4. Structured Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5" id="mentor-messages-container">
          {activeMentorThread.messages.map((msg, index) => {
            const isUser = msg.sender === 'user';

            return (
              <div 
                key={msg.id || index}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Header */}
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  {!isUser && (
                    <div className="w-5 h-5 rounded-xs bg-[#1A1C1E] text-white font-bold text-[9px] flex items-center justify-center">
                      SC
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-[#1A1C1E]">
                    {isUser ? 'You' : msg.senderName}
                  </span>
                  <span className="text-[10px] text-[#8A8A85]">
                    {msg.timestamp}
                  </span>
                  {msg.capability && msg.capability !== 'general' && (
                    <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-[#F2F1EE] text-[#5A5C60] border border-[#E5E3DC] rounded-xs">
                      {capabilityLabels[msg.capability]}
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div 
                  className={`p-4 rounded-xs text-xs leading-relaxed max-w-[95%] sm:max-w-[88%] ${
                    isUser 
                      ? 'bg-[#1A1C1E] text-white' 
                      : 'bg-white text-[#1A1C1E] border border-[#D5D3CB] shadow-2xs'
                  }`}
                >
                  <div className="space-y-3 whitespace-pre-line font-normal">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => {
                      // Check for markdown headers
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={pIdx} className={`font-bold text-xs uppercase tracking-wider pt-1 ${isUser ? 'text-white' : 'text-[#1A1C1E]'}`}>
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      return (
                        <p key={pIdx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Code Snippets if any */}
                  {msg.codeSnippets && msg.codeSnippets.length > 0 && (
                    <div className="mt-3.5 space-y-3">
                      {msg.codeSnippets.map((snippet, sIdx) => {
                        const snippetKey = `snippet-${msg.id}-${sIdx}`;
                        const isCopied = copiedCodeId === snippetKey;

                        return (
                          <div 
                            key={sIdx}
                            className="rounded-xs overflow-hidden border border-[#2B2D31] bg-[#1A1C1E] text-white"
                          >
                            <div className="px-3 py-1.5 bg-[#2B2D31] flex items-center justify-between text-[11px] font-mono text-[#D5D3CB]">
                              <div className="flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5 text-[#3E51FF]" />
                                <span>{snippet.label || snippet.language}</span>
                              </div>
                              <button
                                onClick={() => handleCopyCode(snippet.code, snippetKey)}
                                className="flex items-center gap-1 text-[10px] text-[#A0A2A8] hover:text-white transition-colors"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-3 text-[11px] font-mono overflow-x-auto leading-relaxed text-[#F2F1EE] bg-[#141517]">
                              <code>{snippet.code}</code>
                            </pre>
                            {snippet.explanation && (
                              <div className="px-3 py-1.5 bg-[#1E2024] border-t border-[#2B2D31] text-[10px] text-[#9A9C9F]">
                                💡 {snippet.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Curated Resources if any */}
                  {msg.resources && msg.resources.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-[#E5E3DC]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A5C60] mb-2 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#3E51FF]" />
                        <span>Recommended Learning Resources</span>
                      </div>
                      <div className="space-y-1.5">
                        {msg.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 rounded-xs bg-[#FAF9F7] hover:bg-[#EEF0FF] border border-[#E5E3DC] hover:border-[#C5CAFF] transition-colors group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[11px] text-[#1A1C1E] group-hover:text-[#3E51FF]">
                                {res.title}
                              </span>
                              <ExternalLink className="w-3 h-3 text-[#8A8A85] group-hover:text-[#3E51FF]" />
                            </div>
                            {res.description && (
                              <div className="text-[10px] text-[#5A5C60] mt-0.5 line-clamp-1">
                                {res.description}
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-1 text-[9px] font-mono text-[#8A8A85]">
                              <span>{res.domain}</span>
                              <span>•</span>
                              <span className="uppercase">{res.type}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow-up Suggested Prompts */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && !isUser && index === activeMentorThread.messages.length - 1 && (
                    <div className="mt-3.5 pt-3 border-t border-[#E5E3DC]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A5C60] mb-1.5">
                        Suggested Follow-ups
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((followUp, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => handleSend(followUp)}
                            className="px-2.5 py-1 text-[10px] font-medium bg-[#FAF9F7] hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#D5D3CB] hover:border-[#C5CAFF] rounded-xs transition-colors text-left flex items-center gap-1"
                          >
                            <span>{followUp}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator (Clean, non-glowing) */}
          {isMentorThinking && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1 px-1">
                <div className="w-5 h-5 rounded-xs bg-[#1A1C1E] text-white font-bold text-[9px] flex items-center justify-center">
                  SC
                </div>
                <span className="text-[11px] font-bold text-[#1A1C1E]">Sarah Chen</span>
                <span className="text-[10px] text-[#8A8A85]">Reviewing engineering context...</span>
              </div>
              <div className="p-3.5 rounded-xs bg-white border border-[#D5D3CB] text-xs text-[#5A5C60] flex items-center gap-2.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#3E51FF] animate-pulse"></span>
                <span>Reviewing project criteria and drafting guidance...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 5. Contextual Quick Prompts Drawer */}
        <div className="p-3 bg-white border-t border-[#E5E3DC]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A5C60] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#3E51FF]" />
              <span>Contextual Prompts</span>
            </span>
            <span className="text-[10px] text-[#8A8A85]">
              {filteredPrompts.length} questions available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-32 overflow-y-auto pr-1">
            {filteredPrompts.slice(0, 4).map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleSend(prompt.promptText, prompt.capability)}
                className="p-2 text-left bg-[#FAF9F7] hover:bg-[#EEF0FF] border border-[#E5E3DC] hover:border-[#C5CAFF] rounded-xs transition-colors group flex items-start gap-1.5"
                id={`prompt-btn-${prompt.id}`}
              >
                <div className="mt-0.5 shrink-0">
                  {capabilityIcons[prompt.capability]}
                </div>
                <div className="truncate">
                  <div className="text-[11px] font-bold text-[#1A1C1E] group-hover:text-[#3E51FF] truncate">
                    {prompt.label}
                  </div>
                  {prompt.description && (
                    <div className="text-[9px] text-[#8A8A85] truncate">
                      {prompt.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 6. Composer Input */}
        <div className="p-3.5 bg-[#FAF9F7] border-t border-[#D5D3CB]">
          <div className="relative bg-white border border-[#D5D3CB] rounded-xs focus-within:border-[#1A1C1E] focus-within:ring-1 focus-within:ring-[#1A1C1E] transition-all">
            <textarea
              ref={inputRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${MENTOR_PROFILE.name} about requirements, architecture, or code...`}
              rows={2}
              className="w-full p-2.5 text-xs text-[#1A1C1E] placeholder-[#8A8A85] bg-transparent resize-none focus:outline-none"
              id="mentor-input-textarea"
            />
            <div className="px-2.5 pb-2 flex items-center justify-between">
              <span className="text-[10px] text-[#8A8A85]">
                Press <kbd className="font-mono bg-[#F2F1EE] px-1 rounded-xs border border-[#E5E3DC]">Enter ↵</kbd> to ask
              </span>
              <button
                onClick={() => handleSend(inputVal)}
                disabled={!inputVal.trim() || isMentorThinking}
                className="px-3 py-1 bg-[#1A1C1E] hover:bg-black disabled:bg-[#D5D3CB] text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                id="mentor-send-button"
              >
                <span>Ask Mentor</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
