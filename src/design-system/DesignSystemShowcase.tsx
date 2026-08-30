import React, { useState } from 'react';
import { 
  Type, 
  Palette, 
  MousePointerClick, 
  CheckSquare, 
  Layers, 
  LayoutGrid, 
  Sliders, 
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Code2,
  Terminal,
  Activity,
  User,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import { DESIGN_TOKENS } from './tokens';
import { 
  DisplayHeading, 
  PageHeading, 
  SectionHeading, 
  CardTitle, 
  BodyText, 
  Label, 
  Caption, 
  CodeText 
} from './Typography';
import { 
  Button, 
  PrimaryButton, 
  SecondaryButton, 
  GhostButton, 
  DestructiveButton, 
  AccentButton, 
  IconButton 
} from './Button';
import { 
  FormField, 
  Input, 
  Select, 
  SearchField, 
  Checkbox, 
  Radio, 
  Toggle, 
  Textarea 
} from './FormControls';
import { 
  StatusLabel, 
  DifficultyBadge, 
  ProgressIndicator, 
  CompletionIndicator, 
  ScoreBadge 
} from './StatusComponents';
import { 
  PageContainer, 
  SectionContainer, 
  DashboardSidebar 
} from './LayoutComponents';
import { 
  InternshipPreviewCard, 
  TaskItemRow, 
  AnalyticsPanel, 
  ProjectPreviewCard 
} from './CardContainers';

type TabSection = 
  | 'overview' 
  | 'typography' 
  | 'colors' 
  | 'spacing' 
  | 'buttons' 
  | 'forms' 
  | 'status' 
  | 'cards' 
  | 'layouts';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabSection>('overview');

  // Interactive Form States
  const [searchVal, setSearchVal] = useState('');
  const [inputVal, setInputVal] = useState('distributed-tracing-v2');
  const [selectVal, setSelectVal] = useState('swe');
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [radioVal, setRadioVal] = useState('option-1');
  const [toggleVal, setToggleVal] = useState(true);
  const [textareaVal, setTextareaVal] = useState('Implemented high-throughput Kafka pipeline with idempotent message consumer.');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [simProgress, setSimProgress] = useState(65);

  const tabs = [
    { id: 'overview', label: 'Design System Overview', icon: Layers },
    { id: 'typography', label: 'Typography Hierarchy', icon: Type },
    { id: 'colors', label: 'Semantic Colors', icon: Palette },
    { id: 'spacing', label: 'Spacing & Tokens', icon: Sliders },
    { id: 'buttons', label: 'Button System', icon: MousePointerClick },
    { id: 'forms', label: 'Form Components', icon: CheckSquare },
    { id: 'status', label: 'Status & Badges', icon: Activity },
    { id: 'cards', label: 'Card & Container System', icon: LayoutGrid },
  ];

  return (
    <PageContainer size="wide">
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-[#E2E2DE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#1A1C1E] text-white text-xs font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>INTERNLAB DESIGN SYSTEM v1.0</span>
            </div>
            <DisplayHeading className="text-2xl sm:text-3xl lg:text-4xl">
              Design Foundations & Component System
            </DisplayHeading>
            <BodyText variant="muted" className="mt-1 max-w-2xl">
              Consistent typography, semantic colors, geometric form controls, status markers, and differentiated containers built for high-fidelity workplace simulations.
            </BodyText>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-sm bg-[#F2F1EE] border border-[#E2E2DE] text-xs font-mono text-[#1A1C1E]">
              Zero-Slop Standard • Crisp 1px Borders
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto mt-6 pt-2 pb-1 border-t border-[#E2E2DE]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabSection)}
                className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6">
              <div className="w-8 h-8 rounded-xs bg-[#F2F1EE] text-[#1A1C1E] flex items-center justify-center mb-4 border border-[#E2E2DE]">
                <Type className="w-4 h-4" />
              </div>
              <SectionHeading className="mb-2">Editorial Authority</SectionHeading>
              <BodyText variant="secondary" size="small">
                Carefully calculated typography scales with Plus Jakarta Sans and JetBrains Mono. Line heights set to 1.5–1.6 for maximum scannability and professional credibility.
              </BodyText>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6">
              <div className="w-8 h-8 rounded-xs bg-[#F2F1EE] text-[#1A1C1E] flex items-center justify-center mb-4 border border-[#E2E2DE]">
                <Palette className="w-4 h-4" />
              </div>
              <SectionHeading className="mb-2">Warm Stone & Ink</SectionHeading>
              <BodyText variant="secondary" size="small">
                Warm off-white stone canvas (#F9F8F6), deep matte ink (#1A1C1E), crisp 1px borders (#E2E2DE), and electric cobalt (#3E51FF) used strictly for interactive affordances.
              </BodyText>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6">
              <div className="w-8 h-8 rounded-xs bg-[#F2F1EE] text-[#1A1C1E] flex items-center justify-center mb-4 border border-[#E2E2DE]">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <SectionHeading className="mb-2">Differentiated Containers</SectionHeading>
              <BodyText variant="secondary" size="small">
                Replaces uniform floating cards with distinct containers: tabular task rows, telemetry stat boxes, preview cards, and milestone drawers.
              </BodyText>
            </div>
          </div>

          {/* Core Foundations Matrix */}
          <SectionContainer
            title="Design System Component Inventory"
            caption="Explore all 8 foundational pillars below or navigate via the tabs above."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '1. Typography', desc: 'Display, Page, Section, Card, Body, Labels, Captions', tab: 'typography' },
                { title: '2. Color System', desc: 'Primary, Secondary, Accent, Background, Surface, States', tab: 'colors' },
                { title: '3. Spacing Tokens', desc: 'Mathematical scales (4px to 80px), 1px border rules', tab: 'spacing' },
                { title: '4. Button System', desc: 'Primary, Secondary, Ghost, Destructive, Icon button', tab: 'buttons' },
                { title: '5. Form Controls', desc: 'Input, Select, Search, Checkbox, Radio, Toggle, Textarea', tab: 'forms' },
                { title: '6. Status & Badges', desc: 'Difficulty badges, Progress bars, Status markers, Scores', tab: 'status' },
                { title: '7. Card Containers', desc: 'Internship preview, Task row, Telemetry, Project artifact', tab: 'cards' },
                { title: '8. Layout Modules', desc: 'PageContainer, SectionContainer, Navigation, Sidebar', tab: 'overview' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab(item.tab as TabSection)}
                  className="p-4 rounded-sm bg-[#FFFFFF] border border-[#E2E2DE] hover:border-[#1A1C1E] transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1C1E] group-hover:text-[#3E51FF] transition-colors mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#8A8A85] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-semibold text-[#1A1C1E]">
                    <span>Inspect Specs</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 2: TYPOGRAPHY */}
      {activeTab === 'typography' && (
        <div className="space-y-8">
          <SectionContainer
            title="Typography Hierarchy & Optical Weights"
            caption="Defined using Plus Jakarta Sans for UI hierarchy and JetBrains Mono for telemetry/code."
          >
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm divide-y divide-[#E2E2DE]">
              {/* Display Heading */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A85] mb-2">
                  <span>DisplayHeading (H1)</span>
                  <span>40px / 1.12 / 800 Weight / -0.03em tracking</span>
                </div>
                <DisplayHeading>
                  Virtual Internship Workplace Platform
                </DisplayHeading>
              </div>

              {/* Page Heading */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A85] mb-2">
                  <span>PageHeading (H2)</span>
                  <span>30px / 1.2 / 700 Weight / -0.025em tracking</span>
                </div>
                <PageHeading>
                  High-Throughput Order Matching Engine Simulation
                </PageHeading>
              </div>

              {/* Section Heading */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A85] mb-2">
                  <span>SectionHeading (H3)</span>
                  <span>20px / 1.3 / 700 Weight / -0.02em tracking</span>
                </div>
                <SectionHeading>
                  Milestone 2: Deliverables & Executive Briefing
                </SectionHeading>
              </div>

              {/* Card Title */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A85] mb-2">
                  <span>CardTitle (H4)</span>
                  <span>16px / 1.35 / 600 Weight / -0.015em tracking</span>
                </div>
                <CardTitle>
                  Task 2.1: Implement Kafka Partition Key Strategy
                </CardTitle>
              </div>

              {/* Body Text Primary */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A85] mb-2">
                  <span>BodyText (Primary)</span>
                  <span>15px / 1.6 / 400 Weight / Color #1A1C1E</span>
                </div>
                <BodyText variant="primary">
                  Review the system design document and simulated code repo. Ensure strict sequential message processing for concurrent user trades while avoiding hot partitions in the distributed broker cluster.
                </BodyText>
              </div>

              {/* Body Text Secondary */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A85] mb-2">
                  <span>BodyText (Secondary)</span>
                  <span>15px / 1.6 / 400 Weight / Color #484B4F</span>
                </div>
                <BodyText variant="secondary">
                  Your supervisor will review the pull request based on idempotency handling, test coverage, and benchmark latency before certifying the milestone completion.
                </BodyText>
              </div>

              {/* Label & Caption */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-mono text-[#8A8A85] mb-2">Label (Uppercase Tracking)</div>
                  <Label required>Simulated Repository Branch</Label>
                  <BodyText size="small" variant="muted" className="mt-1">
                    Used for form inputs, telemetry headers, and state badges.
                  </BodyText>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#8A8A85] mb-2">Caption & CodeText</div>
                  <div className="flex items-center gap-2">
                    <Caption variant="muted">Last synchronized 2m ago</Caption>
                    <CodeText>git checkout feature/kafka-broker</CodeText>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 3: COLOR SYSTEM */}
      {activeTab === 'colors' && (
        <div className="space-y-8">
          <SectionContainer
            title="Semantic Color Palette"
            caption="High-contrast editorial neutrals, subtle state tints, and electric cobalt accent."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Neutral & Brand */}
              <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-4">
                <h4 className="text-sm font-bold text-[#1A1C1E] mb-3">Core Neutrals & Canvas</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#1A1C1E] text-white">
                    <div>
                      <div className="text-xs font-bold">Primary Ink</div>
                      <div className="text-[11px] opacity-80">Text primary & dark buttons</div>
                    </div>
                    <span className="font-mono text-xs">#1A1C1E</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#F9F8F6] text-[#1A1C1E] border border-[#E2E2DE]">
                    <div>
                      <div className="text-xs font-bold">Stone Canvas</div>
                      <div className="text-[11px] text-[#8A8A85]">Global application canvas</div>
                    </div>
                    <span className="font-mono text-xs">#F9F8F6</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE]">
                    <div>
                      <div className="text-xs font-bold">Secondary Surface</div>
                      <div className="text-[11px] text-[#8A8A85]">Subtle inset panels & wells</div>
                    </div>
                    <span className="font-mono text-xs">#F2F1EE</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#FFFFFF] text-[#1A1C1E] border border-[#E2E2DE]">
                    <div>
                      <div className="text-xs font-bold">Card & Container</div>
                      <div className="text-[11px] text-[#8A8A85]">Pure clean container surface</div>
                    </div>
                    <span className="font-mono text-xs">#FFFFFF</span>
                  </div>
                </div>
              </div>

              {/* Accent & Interactive */}
              <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-4">
                <h4 className="text-sm font-bold text-[#1A1C1E] mb-3">Accent & Precision Tints</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#3E51FF] text-white">
                    <div>
                      <div className="text-xs font-bold">Electric Cobalt</div>
                      <div className="text-[11px] opacity-90">Action highlight & active states</div>
                    </div>
                    <span className="font-mono text-xs">#3E51FF</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#2D3FE6] text-white">
                    <div>
                      <div className="text-xs font-bold">Accent Hover</div>
                      <div className="text-[11px] opacity-90">Hover action tint</div>
                    </div>
                    <span className="font-mono text-xs">#2D3FE6</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#EEF0FF] text-[#3E51FF] border border-[#C7D2FE]">
                    <div>
                      <div className="text-xs font-bold">Accent Subtle</div>
                      <div className="text-[11px] text-[#3E51FF]/80">Selection & badge backgrounds</div>
                    </div>
                    <span className="font-mono text-xs">#EEF0FF</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-white text-[#1A1C1E] border border-[#E2E2DE]">
                    <div>
                      <div className="text-xs font-bold">Border Regular</div>
                      <div className="text-[11px] text-[#8A8A85]">Hairline 1px dividers</div>
                    </div>
                    <span className="font-mono text-xs">#E2E2DE</span>
                  </div>
                </div>
              </div>

              {/* Feedback States */}
              <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-4">
                <h4 className="text-sm font-bold text-[#1A1C1E] mb-3">Feedback & State Colors</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1]">
                    <div>
                      <div className="text-xs font-bold">Success State</div>
                      <div className="text-[11px] opacity-90">Completed tasks & passed rubrics</div>
                    </div>
                    <span className="font-mono text-xs">#115E59</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                    <div>
                      <div className="text-xs font-bold">Warning / Review</div>
                      <div className="text-[11px] opacity-90">In review & pending supervisor</div>
                    </div>
                    <span className="font-mono text-xs">#854D0E</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]">
                    <div>
                      <div className="text-xs font-bold">Danger / Action Needed</div>
                      <div className="text-[11px] opacity-90">Revision required & errors</div>
                    </div>
                    <span className="font-mono text-xs">#991B1B</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xs bg-[#F2F1EE] text-[#484B4F] border border-[#E2E2DE]">
                    <div>
                      <div className="text-xs font-bold">Neutral / Draft</div>
                      <div className="text-[11px] text-[#8A8A85]">Locked or pending milestones</div>
                    </div>
                    <span className="font-mono text-xs">#8A8A85</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 4: SPACING SYSTEM */}
      {activeTab === 'spacing' && (
        <div className="space-y-8">
          <SectionContainer
            title="Consistent Spacing Tokens & Mathematical Rhythms"
            caption="Step ratio tokens aligned to 4px base increments for proportional balance."
          >
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6">
              <div className="space-y-4">
                {[
                  { token: 'spacing.1', px: '4px', usage: 'Tight icon gaps, badge padding' },
                  { token: 'spacing.2', px: '8px', usage: 'Button vertical padding, compact form gaps' },
                  { token: 'spacing.3', px: '12px', usage: 'Card inner element gaps, input vertical spacing' },
                  { token: 'spacing.4', px: '16px', usage: 'Standard container inner padding, button horizontal padding' },
                  { token: 'spacing.5', px: '20px', usage: 'Card padding, modal section margins' },
                  { token: 'spacing.6', px: '24px', usage: 'Major grid gaps, section header margin bottom' },
                  { token: 'spacing.8', px: '32px', usage: 'Module vertical spacing, section dividing whitespace' },
                  { token: 'spacing.12', px: '48px', usage: 'Major view section dividers' },
                  { token: 'spacing.16', px: '64px', usage: 'Page container top/bottom margins' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-xs font-mono">
                    <div className="w-28 text-[#1A1C1E] font-bold">{item.token}</div>
                    <div className="w-16 text-[#8A8A85]">{item.px}</div>
                    <div className="flex-1 flex items-center">
                      <div
                        className="h-4 bg-[#1A1C1E] rounded-2xs"
                        style={{ width: item.px }}
                      />
                    </div>
                    <div className="text-right text-[#484B4F] hidden sm:block">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 5: BUTTON SYSTEM */}
      {activeTab === 'buttons' && (
        <div className="space-y-8">
          <SectionContainer
            title="Button System & Geometric Radii"
            caption="Crisp 3px-4px radius buttons (not pill-shaped) with defined sizes, states, and icon configurations."
          >
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6 space-y-8">
              
              {/* Variant Matrix */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-4">
                  1. Button Style Variants
                </h4>
                <div className="flex flex-wrap items-center gap-4">
                  <PrimaryButton>Primary Button</PrimaryButton>
                  <SecondaryButton>Secondary Button</SecondaryButton>
                  <AccentButton>Accent Cobalt</AccentButton>
                  <GhostButton>Ghost Button</GhostButton>
                  <DestructiveButton>Destructive Action</DestructiveButton>
                </div>
              </div>

              {/* Size Matrix */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-4">
                  2. Button Sizes (Small, Medium, Large)
                </h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small (30px)</Button>
                  <Button size="md">Medium (36px)</Button>
                  <Button size="lg">Large (44px)</Button>
                </div>
              </div>

              {/* Interactive States & Icons */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                    3. Interactive States & Loading
                  </h4>
                  <SecondaryButton
                    size="sm"
                    onClick={() => setButtonLoading(!buttonLoading)}
                  >
                    Toggle Loading State
                  </SecondaryButton>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    isLoading={buttonLoading}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Submit Deliverable
                  </Button>

                  <SecondaryButton
                    isLoading={buttonLoading}
                    leftIcon={<ExternalLink className="w-4 h-4" />}
                  >
                    Open Simulated IDE
                  </SecondaryButton>

                  <Button disabled>
                    Disabled Action
                  </Button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-4">
                  4. Geometric Icon Buttons (1:1 Aspect Ratio)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton icon={<Zap className="w-4 h-4" />} label="Quick action" variant="primary" />
                  <IconButton icon={<Search className="w-4 h-4" />} label="Search" variant="secondary" />
                  <IconButton icon={<ExternalLink className="w-4 h-4" />} label="External" variant="ghost" />
                  <IconButton icon={<Shield className="w-4 h-4" />} label="Security" variant="destructive" />
                </div>
              </div>

            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 6: FORM COMPONENTS */}
      {activeTab === 'forms' && (
        <div className="space-y-8">
          <SectionContainer
            title="Geometric Form Controls"
            caption="High-precision inputs, selects, toggles, and wrapped fields with validation states."
          >
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6 space-y-6 max-w-3xl">
              
              {/* Search Field */}
              <div>
                <Label className="mb-1.5">Search Component</Label>
                <SearchField
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onClear={() => setSearchVal('')}
                  placeholder="Filter by skill, track, or company..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Standard Input */}
                <FormField
                  label="Deliverable Artifact Identifier"
                  required
                  helperText="Format: org/repo-branch-v1"
                >
                  <Input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                </FormField>

                {/* Select Dropdown */}
                <FormField label="Career Simulation Track" optional>
                  <Select
                    value={selectVal}
                    onChange={(e) => setSelectVal(e.target.value)}
                    options={[
                      { value: 'swe', label: 'Software Engineering (Backend & Cloud)' },
                      { value: 'quant', label: 'Quantitative Finance (Trading Engine)' },
                      { value: 'pm', label: 'Product Management (Growth Strategy)' },
                    ]}
                  />
                </FormField>
              </div>

              {/* Textarea with char count */}
              <FormField
                label="Executive Summary & Technical Defense"
                required
                helperText="Explain the architectural tradeoffs made in your solution."
              >
                <Textarea
                  value={textareaVal}
                  onChange={(e) => setTextareaVal(e.target.value)}
                  rows={3}
                  charCount={{ current: textareaVal.length, max: 300 }}
                />
              </FormField>

              {/* Checkboxes & Radios */}
              <div className="pt-4 border-t border-[#E2E2DE] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-3">Verification Checkboxes</Label>
                  <div className="space-y-3">
                    <Checkbox
                      checked={checkbox1}
                      onChange={(e) => setCheckbox1(e.target.checked)}
                      label="Automated Test Suite Passed"
                      description="12/12 unit tests and benchmark latency < 15ms"
                    />
                    <Checkbox
                      checked={checkbox2}
                      onChange={(e) => setCheckbox2(e.target.checked)}
                      label="Supervisor Code Review Sign-off"
                      description="Simulated mentor reviewed pull request"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-3">Deployment Target Selection</Label>
                  <div className="space-y-3">
                    <Radio
                      name="deploy-target"
                      checked={radioVal === 'option-1'}
                      onChange={() => setRadioVal('option-1')}
                      label="Staging Production Sandbox"
                      description="Simulated AWS ECS cluster"
                    />
                    <Radio
                      name="deploy-target"
                      checked={radioVal === 'option-2'}
                      onChange={() => setRadioVal('option-2')}
                      label="Local Microservice Mock"
                      description="Ephemeral container instance"
                    />
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="pt-4 border-t border-[#E2E2DE]">
                <Toggle
                  checked={toggleVal}
                  onChange={setToggleVal}
                  label="Simulated Slack & Email Notifications"
                  description="Receive live supervisor feedback messages in your simulation inbox"
                />
              </div>

            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 7: STATUS COMPONENTS */}
      {activeTab === 'status' && (
        <div className="space-y-8">
          <SectionContainer
            title="Status Indicators & Badges"
            caption="Clear indicators for simulation progression, difficulty levels, and rubric scores."
          >
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6 space-y-6">
              
              {/* Difficulty Badges */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-3">
                  1. Difficulty Badges with Level Indicators
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <DifficultyBadge difficulty="Beginner" />
                  <DifficultyBadge difficulty="Intermediate" />
                  <DifficultyBadge difficulty="Advanced" />
                  <DifficultyBadge difficulty="Expert" />
                </div>
              </div>

              {/* Status Labels */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-3">
                  2. Semantic Task & Milestone Status Labels
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusLabel status="not-started" />
                  <StatusLabel status="in-progress" />
                  <StatusLabel status="submitted" />
                  <StatusLabel status="needs-revision" />
                  <StatusLabel status="passed" />
                  <StatusLabel status="locked" />
                </div>
              </div>

              {/* Rubric Score Badges & Seals */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-3">
                  3. Rubric Scores & Completion Indicators
                </h4>
                <div className="flex flex-wrap items-center gap-4">
                  <ScoreBadge score={96} />
                  <ScoreBadge score={78} />
                  <ScoreBadge score={55} />
                  <CompletionIndicator completed={true} score={94} />
                  <CompletionIndicator completed={false} />
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="pt-4 border-t border-[#E2E2DE]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                    4. Linear Progress Indicators
                  </h4>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setSimProgress(Math.max(0, simProgress - 15))}>-15%</Button>
                    <Button size="sm" variant="secondary" onClick={() => setSimProgress(Math.min(100, simProgress + 15))}>+15%</Button>
                  </div>
                </div>
                <div className="space-y-4 max-w-xl">
                  <ProgressIndicator
                    progress={simProgress}
                    totalSteps={12}
                    completedSteps={Math.round((simProgress / 100) * 12)}
                    label="Internship Progression"
                    size="md"
                  />
                  <ProgressIndicator
                    progress={100}
                    label="Milestone 1 Completed"
                    size="sm"
                  />
                </div>
              </div>

            </div>
          </SectionContainer>
        </div>
      )}

      {/* TAB 8: CARD SYSTEM */}
      {activeTab === 'cards' && (
        <div className="space-y-8">
          <SectionContainer
            title="Differentiated Visual Containers"
            caption="Intelligent layout hierarchy avoiding uniform floating cards. Demonstrates 4 specific container archetypes."
          >
            <div className="space-y-8">
              
              {/* Archetype 1: Internship Preview Card */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                    Archetype 1: Internship Preview Container
                  </h4>
                  <span className="text-xs text-[#8A8A85]">Rich metadata & career track badge</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InternshipPreviewCard
                    id="sim-swe-1"
                    title="Distributed Systems & Resilient Queue Architecture"
                    companyName="Apex Systems"
                    companyTier="Tier 1 Tech"
                    track="Software Engineering"
                    difficulty="Advanced"
                    summary="Engineer high-throughput async processing pipelines handling 50k events/sec with guaranteed idempotency and Kafka partition balancing."
                    durationWeeks={4}
                    estimatedHours={28}
                    rating={4.9}
                    skills={['Go', 'Apache Kafka', 'Distributed Systems', 'Docker']}
                    enrolled={true}
                    progress={65}
                  />

                  <InternshipPreviewCard
                    id="sim-quant-1"
                    title="Low-Latency Order Book & Trade Matching Engine"
                    companyName="Vanguard Quant"
                    companyTier="Top Tier Quant"
                    track="Quantitative Finance"
                    difficulty="Expert"
                    summary="Construct a deterministic limit order book matching engine in C++ with microsecond execution times and benchmark profiling."
                    durationWeeks={6}
                    estimatedHours={42}
                    rating={5.0}
                    skills={['C++', 'Market Microstructure', 'Latency Profiling', 'CMake']}
                    enrolled={false}
                  />
                </div>
              </div>

              {/* Archetype 2: Task Item Row (Dense workplace row) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                    Archetype 2: Task Item Row (Dense Tabular Simulation Unit)
                  </h4>
                  <span className="text-xs text-[#8A8A85]">Avoids nested cards in task lists</span>
                </div>
                <div className="space-y-2">
                  <TaskItemRow
                    id="task-1"
                    orderNumber={1}
                    title="Construct In-Memory Order Book Data Structure"
                    deliverableType="code"
                    estimatedMinutes={45}
                    status="passed"
                    score={98}
                  />
                  <TaskItemRow
                    id="task-2"
                    orderNumber={2}
                    title="Handle Price-Time Priority Matching Algorithm"
                    deliverableType="code"
                    estimatedMinutes={60}
                    status="in-progress"
                    active={true}
                  />
                  <TaskItemRow
                    id="task-3"
                    orderNumber={3}
                    title="Executive Benchmark Summary & Cache Optimization Report"
                    deliverableType="document"
                    estimatedMinutes={30}
                    status="not-started"
                  />
                </div>
              </div>

              {/* Archetype 3: Analytics Telemetry Panel */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                    Archetype 3: Telemetry & Analytics Panel
                  </h4>
                  <span className="text-xs text-[#8A8A85]">Flat, crisp 1px borders with metric deltas</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AnalyticsPanel
                    label="Completed Simulations"
                    value="4 Tracks"
                    delta={{ value: '+2 this month', positive: true }}
                    icon={Award}
                  />
                  <AnalyticsPanel
                    label="Rubric Average"
                    value="94.2%"
                    delta={{ value: '+3.5% vs peer median', positive: true }}
                    icon={Activity}
                  />
                  <AnalyticsPanel
                    label="Practical Lab Hours"
                    value="114 hrs"
                    caption="Verified runtime code output"
                    icon={Terminal}
                  />
                  <AnalyticsPanel
                    label="Portfolio Artifacts"
                    value="8 Projects"
                    caption="Indexed on verified ledger"
                    icon={Code2}
                  />
                </div>
              </div>

              {/* Archetype 4: Project Preview Showcase */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                    Archetype 4: Verified Proof-of-Work Project Showcase
                  </h4>
                  <span className="text-xs text-[#8A8A85]">Portfolio credential artifact</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProjectPreviewCard
                    title="Sub-Millisecond LOB Engine with Level 2 Market Feeds"
                    companyName="Vanguard Quant"
                    internshipTitle="Quantitative Trading Simulation"
                    completedAt="2026-08-15"
                    score={97}
                    summary="Constructed a lock-free limit order book handling 100k events/sec in under 850 nanoseconds, verified against live historical tick datasets."
                    skills={['C++20', 'Google Benchmark', 'Cache Alignment', 'SIMD']}
                  />

                  <ProjectPreviewCard
                    title="Distributed S3-Compatible Object Store with Raft Consensus"
                    companyName="Apex Systems"
                    internshipTitle="Cloud Infrastructure Simulation"
                    completedAt="2026-08-22"
                    score={95}
                    summary="Implemented Raft consensus log replication with leader election and automated network partition self-healing."
                    skills={['Go', 'Raft Algorithm', 'gRPC', 'Protobuf']}
                  />
                </div>
              </div>

            </div>
          </SectionContainer>
        </div>
      )}
    </PageContainer>
  );
};
