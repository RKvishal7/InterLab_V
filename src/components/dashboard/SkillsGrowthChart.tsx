import React, { useState } from 'react';
import { Sparkles, TrendingUp, Info } from 'lucide-react';

export interface SkillMetric {
  name: string;
  score: number; // 0 to 100
  previousScore: number;
  level: 'Practicing' | 'Developing' | 'Proficient' | 'Advanced' | 'Mastery';
  category: 'Frontend' | 'Architecture' | 'Workflow' | 'Soft Skill';
}

interface SkillsGrowthChartProps {
  skills?: SkillMetric[];
}

const DEFAULT_SKILLS: SkillMetric[] = [
  { name: 'JavaScript', score: 72, previousScore: 64, level: 'Proficient', category: 'Frontend' },
  { name: 'React', score: 64, previousScore: 46, level: 'Developing', category: 'Frontend' },
  { name: 'Git', score: 81, previousScore: 75, level: 'Advanced', category: 'Workflow' },
  { name: 'Problem Solving', score: 76, previousScore: 64, level: 'Proficient', category: 'Soft Skill' },
  { name: 'UI Development', score: 69, previousScore: 58, level: 'Developing', category: 'Frontend' },
];

export const SkillsGrowthChart: React.FC<SkillsGrowthChartProps> = ({ skills = DEFAULT_SKILLS }) => {
  const [activeSkill, setActiveSkill] = useState<SkillMetric | null>(null);

  // Calculate coordinates for a 5-point radar polygon
  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;
  const angleStep = (Math.PI * 2) / skills.length;

  // Generate polygon points for score
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const { x, y } = getCoordinates(skill.score, i);
      return `${x},${y}`;
    })
    .join(' ');

  const previousPolygonPoints = skills
    .map((skill, i) => {
      const { x, y } = getCoordinates(skill.previousScore, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Grid levels (25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex flex-col justify-between" id="skills-growth-chart-container">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E2E2DE]">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-[#1A1C1E]">
              Skills Growth & Competency
            </h3>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
              +14% this month
            </span>
          </div>
          <p className="text-xs text-[#5A5C60] mt-0.5">
            Evaluated continuously across simulation code reviews & rubrics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A5C60]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E51FF] inline-block" />
            Current
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5CAFF] inline-block" />
            Baseline
          </span>
        </div>
      </div>

      {/* Main Grid: Radar Chart on Left, Breakdown Meters on Right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Radar SVG Visualizer */}
        <div className="sm:col-span-6 flex items-center justify-center relative py-2">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background Grid Rings */}
            {gridLevels.map((lvl) => {
              const ringPoints = skills
                .map((_, i) => {
                  const { x, y } = getCoordinates(lvl, i);
                  return `${x},${y}`;
                })
                .join(' ');
              return (
                <polygon
                  key={lvl}
                  points={ringPoints}
                  fill="none"
                  stroke="#E2E2DE"
                  strokeWidth="1"
                  strokeDasharray={lvl === 100 ? 'none' : '2,2'}
                />
              );
            })}

            {/* Axis Spokes */}
            {skills.map((_, i) => {
              const { x, y } = getCoordinates(100, i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#E2E2DE"
                  strokeWidth="1"
                />
              );
            })}

            {/* Baseline Polygon (Previous) */}
            <polygon
              points={previousPolygonPoints}
              fill="#3E51FF"
              fillOpacity="0.08"
              stroke="#C5CAFF"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />

            {/* Current Active Polygon */}
            <polygon
              points={polygonPoints}
              fill="#3E51FF"
              fillOpacity="0.2"
              stroke="#3E51FF"
              strokeWidth="2"
            />

            {/* Vertices & Interactive Dots */}
            {skills.map((skill, i) => {
              const { x, y } = getCoordinates(skill.score, i);
              const isHovered = activeSkill?.name === skill.name;
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#1A1C1E' : '#3E51FF'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setActiveSkill(skill)}
                    onMouseLeave={() => setActiveSkill(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Metric Tooltip */}
          {activeSkill && (
            <div className="absolute bottom-1 bg-[#1A1C1E] text-white text-[11px] px-2.5 py-1 rounded-xs shadow-md font-mono flex items-center gap-1.5 animate-in fade-in duration-100">
              <span className="font-bold">{activeSkill.name}:</span>
              <span>{activeSkill.score}%</span>
              <span className="text-emerald-400">
                (+{activeSkill.score - activeSkill.previousScore}%)
              </span>
            </div>
          )}
        </div>

        {/* Linear Progress Breakdown List */}
        <div className="sm:col-span-6 space-y-2.5">
          {skills.map((skill) => {
            const isHovered = activeSkill?.name === skill.name;
            const diff = skill.score - skill.previousScore;

            return (
              <div
                key={skill.name}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                className={`p-2 rounded-xs transition-colors cursor-pointer border ${
                  isHovered
                    ? 'bg-[#F9F8F6] border-[#1A1C1E]'
                    : 'bg-[#FDFCFB] border-[#E2E2DE] hover:border-[#8A8A85]'
                }`}
                id={`skill-row-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1A1C1E]">{skill.name}</span>
                    <span className="text-[10px] text-[#8A8A85] font-mono">({skill.level})</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="font-bold text-[#1A1C1E]">{skill.score}%</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">+{diff}%</span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-1.5 bg-[#E2E2DE] rounded-full overflow-hidden relative">
                  {/* Baseline indicator */}
                  <div
                    className="absolute top-0 bottom-0 bg-[#C5CAFF] rounded-full"
                    style={{ width: `${skill.previousScore}%` }}
                  />
                  {/* Current score */}
                  <div
                    className="absolute top-0 bottom-0 bg-[#3E51FF] rounded-full transition-all duration-300"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Insight */}
      <div className="pt-3 mt-3 border-t border-[#E2E2DE] flex items-center justify-between text-[11px] text-[#5A5C60]">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Strongest skill: <strong>Git (81%)</strong></span>
        </div>
        <span className="font-mono text-[#8A8A85]">Top 10% of cohort</span>
      </div>
    </div>
  );
};
