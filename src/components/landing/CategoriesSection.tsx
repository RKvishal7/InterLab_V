import React, { useState } from 'react';
import { 
  Code, 
  Database, 
  Sparkles, 
  Layout, 
  Megaphone, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Cloud, 
  Layers, 
  ChevronRight, 
  ArrowUpRight,
  Terminal,
  Activity
} from 'lucide-react';
import { SectionHeading, CardTitle, BodyText, Caption, Label } from '../../design-system/Typography';
import { Button, SecondaryButton } from '../../design-system/Button';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string>('software-development');

  const categories = [
    {
      id: 'software-development',
      name: 'Software Development',
      simulationsCount: 28,
      icon: Code,
      highlight: 'Flagship Discipline',
      salary: '$115,000 avg entry',
      description: 'Architect distributed microservices, REST/gRPC APIs, frontend systems, and handle real GitHub pull request reviews.',
      skills: ['TypeScript', 'Node.js', 'Go', 'Distributed Queues', 'PostgreSQL', 'Docker'],
      exampleProject: 'High-Throughput Order Matching Engine with Kafka Stream Consumers',
    },
    {
      id: 'data-analytics',
      name: 'Data & Analytics',
      simulationsCount: 22,
      icon: Database,
      highlight: 'High Hiring Demand',
      salary: '$105,000 avg entry',
      description: 'Perform cohort retention modeling, ETL pipeline validation, SQL query tuning, and author executive BI dashboards.',
      skills: ['SQL Analytics', 'Python', 'Pandas', 'Tableau', 'dbt', 'A/B Testing'],
      exampleProject: 'User Churn Risk Prediction & Executive Retention Dashboard',
    },
    {
      id: 'artificial-intelligence',
      name: 'Artificial Intelligence',
      simulationsCount: 18,
      icon: Sparkles,
      highlight: 'Emerging Track',
      salary: '$125,000 avg entry',
      description: 'Engineer LLM evaluation pipelines, fine-tune embedding search, build RAG applications, and benchmark inference latency.',
      skills: ['Python', 'PyTorch', 'Vector DBs', 'RAG Pipelines', 'Prompt Engineering'],
      exampleProject: 'Enterprise Document Q&A with Vector Embeddings & Hallucination Guardrails',
    },
    {
      id: 'uiux-design',
      name: 'UI/UX Design',
      simulationsCount: 16,
      icon: Layout,
      highlight: 'Creative Track',
      salary: '$98,000 avg entry',
      description: 'Solve complex information architecture, design accessible component systems in Figma, and run usability tests.',
      skills: ['Figma Systems', 'WCAG AA Accessibility', 'User Journey Mapping', 'Design Tokens'],
      exampleProject: 'High-Density Fintech Trading Terminal & Component System',
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      simulationsCount: 14,
      icon: Megaphone,
      salary: '$88,000 avg entry',
      description: 'Develop multi-channel acquisition funnels, run live A/B ad budget tests, and model CAC vs. Customer Lifetime Value.',
      skills: ['SEO Auditing', 'Growth Funnels', 'Google Ads', 'A/B Testing', 'Retention Loops'],
      exampleProject: 'Growth Funnel Optimization & Multi-Touch Attribution Model',
    },
    {
      id: 'business',
      name: 'Business',
      simulationsCount: 15,
      icon: Briefcase,
      salary: '$95,000 avg entry',
      description: 'Draft go-to-market strategies, operational bottleneck diagnoses, vendor RFP evaluations, and board decks.',
      skills: ['Market Sizing (TAM/SAM)', 'Unit Economics', 'Operational Workflows', 'GTM Strategy'],
      exampleProject: 'B2B SaaS Go-To-Market Expansion Strategy & Board Presentation',
    },
    {
      id: 'finance',
      name: 'Finance',
      simulationsCount: 14,
      icon: TrendingUp,
      salary: '$108,000 avg entry',
      description: 'Build 3-statement financial models, discounted cash flow (DCF) valuations, and quantitative portfolio risk reports.',
      skills: ['DCF Valuation', 'LBO Modeling', 'Value at Risk (VaR)', 'Financial Statements'],
      exampleProject: 'M&A Valuation Model & Leveraged Buyout Scenario Deck',
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      simulationsCount: 12,
      icon: ShieldCheck,
      salary: '$104,000 avg entry',
      description: 'Investigate SOC alert payloads, analyze server intrusion logs, triage CVE vulnerabilities, and write hardening scripts.',
      skills: ['SIEM Log Triage', 'Threat Hunting', 'Incident Playbooks', 'Network Hardening'],
      exampleProject: 'SOC Analyst Incident Triage & Zero-Day Patch Playbook',
    },
    {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      simulationsCount: 16,
      icon: Cloud,
      salary: '$118,000 avg entry',
      description: 'Provision Terraform infrastructure-as-code, deploy Kubernetes clusters, configure IAM roles, and debug ingress gateways.',
      skills: ['Terraform', 'Kubernetes', 'AWS/GCP IAM', 'CI/CD Pipelines', 'Prometheus'],
      exampleProject: 'Multi-Region High-Availability Infrastructure with Terraform',
    },
    {
      id: 'product-management',
      name: 'Product Management',
      simulationsCount: 15,
      icon: Layers,
      salary: '$110,000 avg entry',
      description: 'Author comprehensive PRDs, prioritize feature backlogs with RICE scoring, and align cross-functional engineering teams.',
      skills: ['PRD Authoring', 'RICE Prioritization', 'User Research', 'Sprint Planning', 'Metrics'],
      exampleProject: 'Zero-to-One Product Requirement Document (PRD) & Sprint Roadmap',
    },
  ];

  const selectedCategoryData = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section id="categories" className="w-full bg-[#F9F8F6] py-16 sm:py-20 border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-2">
              Career Specializations
            </div>
            <SectionHeading className="text-2xl sm:text-3xl text-[#1A1C1E]">
              Explore 10 Industry Disciplines
            </SectionHeading>
            <BodyText variant="secondary" className="mt-1 max-w-2xl text-sm sm:text-base">
              Each discipline contains multiple structured virtual internships modeled after actual corporate onboarding programs.
            </BodyText>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#FFFFFF] border border-[#E2E2DE] text-xs font-mono text-[#1A1C1E]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>120+ Verified Simulations Available</span>
            </span>
          </div>
        </div>

        {/* Editorial Layout: Asymmetric Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Category Selector Strip (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-3 divide-y divide-[#F2F1EE]">
            <div className="px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
              Select Discipline
            </div>
            
            <div className="space-y-1 pt-2 max-h-[540px] overflow-y-auto pr-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full p-3 rounded-xs text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#1A1C1E] text-white shadow-xs'
                        : 'text-[#484B4F] hover:bg-[#F2F1EE] hover:text-[#1A1C1E]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-2xs ${
                        isSelected ? 'bg-white/15 text-white' : 'bg-[#F2F1EE] text-[#1A1C1E]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold truncate">
                          {cat.name}
                        </div>
                        <div className={`text-[11px] font-mono ${
                          isSelected ? 'text-white/70' : 'text-[#8A8A85]'
                        }`}>
                          {cat.simulationsCount} internships • {cat.salary}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-white translate-x-1' : 'text-[#8A8A85]'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Editorial Category Spotlight (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category Spotlight Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#E2E2DE]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] text-[#1A1C1E] flex items-center justify-center">
                    <selectedCategoryData.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A1C1E] tracking-tight">
                      {selectedCategoryData.name}
                    </h3>
                    <div className="text-xs font-mono text-[#8A8A85]">
                      {selectedCategoryData.simulationsCount} Verified Programs • Entry Benchmark: {selectedCategoryData.salary}
                    </div>
                  </div>
                </div>

                {selectedCategoryData.highlight && (
                  <span className="px-2 py-1 rounded-2xs bg-[#EEF0FF] text-[#3E51FF] border border-[#C7D2FE] text-xs font-mono font-bold">
                    {selectedCategoryData.highlight}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#484B4F] leading-relaxed mb-6">
                {selectedCategoryData.description}
              </p>

              {/* Skills Matrix */}
              <div className="mb-6">
                <Label className="mb-2.5">In-Demand Practical Skills Tested</Label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategoryData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE] text-[#1A1C1E] text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Realistic Milestone Project Preview */}
              <div className="p-4 rounded-sm bg-[#F9F8F6] border border-[#E2E2DE] mb-6">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-1">
                  Representative Milestone Project
                </div>
                <div className="text-sm font-bold text-[#1A1C1E] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#3E51FF]" />
                  <span>{selectedCategoryData.exampleProject}</span>
                </div>
                <div className="text-xs text-[#8A8A85] mt-1">
                  Graded on architecture clarity, benchmark execution, and automated test coverage.
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-5 border-t border-[#E2E2DE] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#8A8A85]">
                Self-paced or structured cohort pacing available
              </span>

              <Button
                variant="primary"
                onClick={() => onSelectCategory(selectedCategoryData.id)}
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Explore {selectedCategoryData.name} Internships
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
