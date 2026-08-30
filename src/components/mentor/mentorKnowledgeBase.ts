import { MentorCapability, MentorContextView, ContextualPrompt, MentorMessage } from './types';

export const CONTEXTUAL_PROMPTS_BY_VIEW: Record<MentorContextView, ContextualPrompt[]> = {
  workspace: [
    {
      id: 'ws-explain-reqs',
      label: 'Help me understand the requirements',
      capability: 'explain-task',
      description: 'Sprint 3 task specs & acceptance criteria breakdown',
      promptText: 'Can you break down the exact acceptance criteria for this responsive product page task and what edge cases to watch out for?',
    },
    {
      id: 'ws-hint-first-step',
      label: 'Explain the first step',
      capability: 'breakdown',
      description: 'How to structure your components and initial state',
      promptText: 'What is the recommended first step to start implementing the product page components cleanly?',
    },
    {
      id: 'ws-give-hint',
      label: 'Give me a hint',
      capability: 'hint',
      description: 'Progressive hint for layout & color variant sync',
      promptText: 'I need a hint on how to connect color variant selection with the active gallery image without messy prop drilling.',
    },
    {
      id: 'ws-review-approach',
      label: 'Review my approach',
      capability: 'review-approach',
      description: 'Evaluate your state model & CSS grid layout',
      promptText: 'Can you review my planned architectural approach for handling quantity stepper limits, sticky mobile checkout bar, and thumbnail navigation?',
    },
    {
      id: 'ws-learning-resources',
      label: 'Suggest learning resources',
      capability: 'resources',
      description: 'Curated industry docs on CSS Grid & WAI-ARIA',
      promptText: 'What are the best official documentation and engineering resources for mastering WAI-ARIA radio groups and responsive e-commerce galleries?',
    },
    {
      id: 'ws-improvement-tips',
      label: 'Give improvement suggestions',
      capability: 'improvements',
      description: 'Production standards for touch targets & CLS mitigation',
      promptText: 'What are the top code polish suggestions to make this implementation feel like production-grade frontend work at Nova Labs?',
    },
  ],

  'project-feedback': [
    {
      id: 'fb-explain-score',
      label: 'Explain my score',
      capability: 'explain-task',
      description: 'Understand the 84/100 score breakdown & rubric tiers',
      promptText: 'Can you explain how my overall score of 84/100 was calculated and what differentiated my Problem Solving (90) from UI/UX (78)?',
    },
    {
      id: 'fb-how-improve',
      label: 'How can I improve this?',
      capability: 'improvements',
      description: 'Step-by-step action plan to reach 95+ Exemplary tier',
      promptText: 'How can I improve my submission to reach the Exemplary tier (95+ score)? Please give me a prioritised action plan.',
    },
    {
      id: 'fb-accessibility-deep-dive',
      label: 'Break down the accessibility issue',
      capability: 'breakdown',
      description: 'WAI-ARIA radio group & keyboard roving focus solution',
      promptText: 'Can you explain why the color swatches failed accessibility and walk me through implementing the W3C APG Radio Group Pattern step by step?',
    },
    {
      id: 'fb-image-optimization',
      label: 'Help optimize image performance',
      capability: 'hint',
      description: 'Responsive srcset, WebP formats & LCP optimization',
      promptText: 'The review noted 2.8 MB uncompressed hero images. How should I set up responsive picture tags with srcset and sizes to reduce mobile load time?',
    },
    {
      id: 'fb-what-learn-next',
      label: 'Show me what to learn next',
      capability: 'resources',
      description: 'Core Web Vitals, JWT auth & API architecture guides',
      promptText: 'Based on this review and my sprint progress, what technical concepts should I focus on learning before starting Task 2 (Authenticated Dashboard)?',
    },
  ],

  dashboard: [
    {
      id: 'db-prioritize-today',
      label: 'What should I work on today?',
      capability: 'explain-task',
      description: 'Personalized recommendation based on active sprints',
      promptText: 'Based on my active enrollments and sprint milestones, what is the highest impact task for me to tackle today?',
    },
    {
      id: 'db-review-progress',
      label: 'Review my internship progress',
      capability: 'review-approach',
      description: 'Analyze completed tasks, hours logged & average score',
      promptText: 'Can you review my overall internship trajectory, skills growth, and portfolio readiness across my completed sprints?',
    },
    {
      id: 'db-improve-skills',
      label: 'How to improve my skills growth?',
      capability: 'improvements',
      description: 'Targeted tips to elevate React & UI/UX competency levels',
      promptText: 'Looking at my skills chart, my UI/UX score is 78 while Problem Solving is 90. What specific practices will help me level up my UI craft?',
    },
    {
      id: 'db-career-next-steps',
      label: 'Suggest career next steps',
      capability: 'resources',
      description: 'Portfolio artifact framing & interview talking points',
      promptText: 'How should I showcase my completed Nova Labs E-commerce project in my portfolio and resume for frontend developer internship applications?',
    },
  ],

  general: [
    {
      id: 'gen-explain-internlab',
      label: 'Explain the internship model',
      capability: 'explain-task',
      description: 'How workplace simulations and reviews work',
      promptText: 'How do InternLab sprint milestones, code reviews, and verified portfolio credentials work?',
    },
    {
      id: 'gen-engineering-best-practices',
      label: 'Frontend best practices',
      capability: 'resources',
      description: 'Clean code, TypeScript strictness & accessibility',
      promptText: 'What are the top 5 frontend engineering practices that distinguish junior developers from high-performing engineers in real teams?',
    },
  ],
};

export const MENTOR_PROFILE = {
  name: 'Sarah Chen',
  role: 'Staff Frontend Mentor',
  company: 'Nova Labs',
  status: 'Online',
  avatarInitials: 'SC',
  bio: 'Former Senior UI Engineer at Stripe. Supervises frontend developer simulation tracks, code reviews, and architectural deep-dives.',
};

export function getCuratedMentorResponse(
  prompt: string, 
  contextView: MentorContextView,
  capability?: MentorCapability
): {
  text: string;
  codeSnippets?: Array<{ language: string; code: string; label?: string; explanation?: string }>;
  resources?: Array<{ title: string; url: string; domain: string; type: 'doc' | 'guide' | 'spec' | 'article'; description?: string }>;
  suggestedFollowUps?: string[];
} {
  const lower = prompt.toLowerCase();

  // 1. PROJECT FEEDBACK: SCORE EXPLANATION
  if (lower.includes('explain my score') || lower.includes('score') || (contextView === 'project-feedback' && lower.includes('84'))) {
    return {
      text: `Let's break down your **84 / 100** score from the Nova Labs evaluation rubric:

### 📊 Rubric Breakdown
* **Problem Solving (90 / 100 - Exemplary)**: You handled dynamic stock boundaries, discount math, and reactive cart counting with zero runtime errors.
* **Code Quality (85 / 100 - Proficient)**: Great TypeScript types, clean component decomposition, and zero unused dependencies.
* **Documentation (82 / 100 - Proficient)**: Clear commit notes and architectural breakdown in your submission writeup.
* **UI/UX (78 / 100 - Developing)**: This was the main constraint preventing a 90+ score. The visual layout is crisp, but missing skeleton shimmer states and uncompressed hero assets degraded perceived performance.

### 🎯 What will take this to 95+ (Exemplary)?
1. **ARIA Radiogroup Semantics**: Add \`role="radiogroup"\` and keyboard roving focus on color variant buttons.
2. **Skeleton Loading States**: Smooth out high-resolution image transitions with a subtle shimmer placeholder.
3. **Responsive Image Sizing**: Use HTML \`<picture>\` with WebP \`srcset\` to eliminate bandwidth waste on mobile.`,
      resources: [
        {
          title: 'W3C WAI-ARIA Radio Group Design Pattern',
          url: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
          domain: 'w3.org',
          type: 'spec',
          description: 'Official W3C APG specification for accessible radio groups and keyboard roving tabindex.'
        },
        {
          title: 'web.dev: Optimize Largest Contentful Paint (LCP)',
          url: 'https://web.dev/articles/optimize-lcp',
          domain: 'web.dev',
          type: 'guide',
          description: 'Google Chrome team guide on responsive image loading and CLS prevention.'
        }
      ],
      suggestedFollowUps: [
        'How do I fix the color swatch accessibility issue?',
        'Show me how to add skeleton loading states',
        'What should I learn before Task 2?'
      ]
    };
  }

  // 2. WORKSPACE: UNDERSTAND REQUIREMENTS
  if (lower.includes('requirement') || lower.includes('understand') || lower.includes('acceptance criteria')) {
    return {
      text: `Here is the engineering breakdown of the **Sprint 3: Task 1** requirements:

### 📋 Core Deliverable Requirements
1. **Dual-Column Responsive Grid**:
   * Desktop (≥1024px): 2-column layout (55% image gallery left, 45% product details right).
   * Mobile (<640px): 1-column vertical stack with a sticky add-to-cart bottom bar.
2. **Interactive Image Gallery**:
   * Main high-resolution viewport with synchronized thumbnail strip.
   * Thumbnail click switches the active preview without page reload or layout shift.
3. **Product Configuration State**:
   * Color variant picker (updates displayed SKU and active image set).
   * Quantity stepper with bounds \`[1, maxStock]\` and disabled button states at limits.
4. **Cart Feedback**:
   * Optimistic "Added to Cart" toast / feedback with animated counter badge increment.
5. **Accessibility & Performance**:
   * Minimum 44x44px touch targets on mobile viewports.
   * Proper \`alt\` text describing variant colors.

### 💡 Mentor Pro-Tip
Focus on structuring state at the top-level parent component before building out UI styling. When state flows cleanly from top to bottom, responsiveness is much easier to manage.`,
      codeSnippets: [
        {
          language: 'typescript',
          label: 'Recommended State Model',
          code: `interface ProductState {
  selectedColorId: string;
  activeImageIndex: number;
  quantity: number;
  isAddingToCart: boolean;
  cartCount: number;
}`,
          explanation: 'Keep variant selection and active gallery index synchronized in single state slice.'
        }
      ],
      suggestedFollowUps: [
        'Explain the first step to start coding',
        'Give me a hint for color variant state',
        'How should I structure the responsive grid?'
      ]
    };
  }

  // 3. WORKSPACE: FIRST STEP / BREAKDOWN
  if (lower.includes('first step') || lower.includes('break down') || lower.includes('start')) {
    return {
      text: `Here is the recommended **3-phase workflow** to build this cleanly without getting overwhelmed:

### Phase 1: Data Model & TypeScript Types (15 mins)
Define clean interfaces for \`Product\`, \`ColorVariant\`, and \`ProductSpec\`. Declare static mock data with realistic images and inventory counts.

### Phase 2: Core Sub-Components (45 mins)
Build modular, isolated components in this order:
1. \`ImageGallery.tsx\`: Handles active image, thumbnail selection, and aspect ratio container.
2. \`VariantSelector.tsx\`: Swatches with active indicator and tooltip names.
3. \`QuantityStepper.tsx\`: Increment/decrement buttons with min/max validation.
4. \`ProductHeader.tsx\`: Title, brand, price calculation, rating stars, and badge.

### Phase 3: Responsive Integration & Mobile Polish (30 mins)
Assemble components in the parent layout using Tailwind CSS Grid (\`grid grid-cols-1 lg:grid-cols-12 gap-8\`), then test with Chrome DevTools at 390px (iPhone 14) and 1280px (MacBook).`,
      codeSnippets: [
        {
          language: 'tsx',
          label: 'Grid Layout Blueprint',
          code: `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
    {/* Left Column: Image Gallery (7 cols) */}
    <div className="lg:col-span-7">
      <ProductGallery images={selectedVariant.images} />
    </div>

    {/* Right Column: Sticky Product Info (5 cols) */}
    <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
      <ProductInfo product={product} selectedVariant={selectedVariant} />
    </div>
  </div>
</div>`,
          explanation: 'Using sticky positioning on the right column keeps the checkout CTA visible while scrolling on desktop.'
        }
      ],
      suggestedFollowUps: [
        'Give me a hint for accessibility',
        'Review my approach',
        'Suggest learning resources'
      ]
    };
  }

  // 4. HINTS / PROGRESSIVE GUIDANCE
  if (lower.includes('hint') || lower.includes('stuck') || lower.includes('how do i')) {
    return {
      text: `Here is a **Level 2 Architecture Hint** for managing color variants and gallery images:

### 💡 The Pattern: Derived Variant Selection
Instead of storing duplicate image arrays in state, store only \`selectedColorId: string\` and derive the active image collection:

\`\`\`typescript
const activeVariant = product.variants.find(v => v.id === selectedColorId) || product.variants[0];
const activeImages = activeVariant.images;
\`\`\`

When the user clicks a different color swatch:
1. Update \`selectedColorId\`.
2. Reset \`activeImageIndex\` to \`0\` so the main hero photo displays the primary angle of the newly selected color.
3. Keep the user's selected quantity intact unless the new variant has lower stock availability.`,
      resources: [
        {
          title: 'React Documentation: Choosing the State Structure',
          url: 'https://react.dev/learn/choosing-the-state-structure',
          domain: 'react.dev',
          type: 'guide',
          description: 'Official React guide on avoiding redundant state and deriving values.'
        }
      ],
      suggestedFollowUps: [
        'How do I handle out-of-stock variants?',
        'Show me the accessible swatch implementation',
        'Review my approach'
      ]
    };
  }

  // 5. ACCESSIBILITY DEEP-DIVE
  if (lower.includes('accessibility') || lower.includes('aria') || lower.includes('radio group')) {
    return {
      text: `Let's deep-dive on the **W3C APG Radio Group Pattern** for the color swatches:

### ♿ Why Standard Buttons Fail WCAG Audit
When you use a generic \`<div>\` with \`<button>\` elements:
* Screen readers announce *"Button, Blue"*, but provide no information that selecting Blue unselects Red.
* There is no grouping label, so assistive tech cannot report *"Color options, 1 of 4"*.
* Keyboard users must tab through every single swatch rather than using Left/Right arrow keys.

### ✅ The Production Solution
1. Add \`role="radiogroup"\` and \`aria-label="Select color variant"\` to the container.
2. Add \`role="radio"\` and \`aria-checked={isSelected}\` to each swatch button.
3. Use roving \`tabIndex\`: active swatch gets \`tabIndex={0}\`, all other swatches get \`tabIndex={-1}\`.`,
      codeSnippets: [
        {
          language: 'tsx',
          label: 'Accessible Swatch Group Component',
          code: `<div 
  role="radiogroup" 
  aria-label="Color options" 
  className="flex items-center gap-3"
>
  {variants.map((variant, idx) => {
    const isSelected = variant.id === selectedVariantId;
    return (
      <button
        key={variant.id}
        role="radio"
        aria-checked={isSelected}
        aria-label={\`\${variant.name} color variant\${variant.inStock ? '' : ' (Out of stock)'}\`}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => onSelectVariant(variant.id)}
        className={\`w-10 h-10 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E51FF] \${
          isSelected ? 'ring-2 ring-[#1A1C1E] scale-105' : 'hover:scale-105 opacity-80'
        }\`}
        style={{ backgroundColor: variant.hex }}
      >
        {isSelected && (
          <span className="sr-only">Selected</span>
        )}
      </button>
    );
  })}
</div>`,
          explanation: 'Passes WCAG 2.1 AA screen reader and keyboard roving focus requirements.'
        }
      ],
      suggestedFollowUps: [
        'How do I test keyboard navigation in Chrome?',
        'How do I optimize image performance?',
        'Review my submission'
      ]
    };
  }

  // 6. DASHBOARD / CAREER / PROGRESS
  if (lower.includes('today') || lower.includes('progress') || lower.includes('career') || lower.includes('portfolio') || contextView === 'dashboard') {
    return {
      text: `Here is your **Sprint Trajectory & Career Growth Assessment**:

### 🚀 Immediate Priority Today
* **Sprint 3 (Task 2)**: *"Build an authenticated dashboard with API integration."*
  * Estimated Effort: ~5 hours
  * Technical Skills: JWT Token management, optimistic REST updates, and protected route guards.
  * Completing this milestone will unlock your **Frontend Architecture Certificate**.

### 📈 Skill Growth Observations
* Your **Problem Solving (90)** is in the top 10% of simulation cohorts. You write robust boundary checking and clean edge case logic.
* Your **React (Level 3)** and **Git (Level 3)** credentials have been stamped on your student transcript.
* Focus on raising your **UI/UX score from 78 to 90+** by adding skeleton shimmer states and zero-CLS image containers.

### 💼 Portfolio Framing Tip
When discussing your Responsive E-commerce project in interviews:
> *"I engineered a modular React e-commerce product page adhering to W3C APG accessible radio group semantics, sub-100ms variant switching, and responsive CSS Grid viewports across mobile and desktop breakpoints."*`,
      resources: [
        {
          title: 'MDN Web Docs: Building Accessible Web Components',
          url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility',
          domain: 'developer.mozilla.org',
          type: 'doc',
          description: 'Mozilla foundation accessibility best practices and semantic HTML guide.'
        }
      ],
      suggestedFollowUps: [
        'Explain Task 2 requirements in detail',
        'How should I structure JWT auth in React?',
        'Review my completed milestones'
      ]
    };
  }

  // DEFAULT PROFESSIONAL MENTOR GUIDANCE
  return {
    text: `I'm Sarah Chen, Staff Frontend Mentor at Nova Labs. I'm here to help you navigate your internship simulation, code architecture, and engineering rubric expectations.

### How I can support your work:
* **Explain the task**: Unpack acceptance criteria and edge cases.
* **Provide progressive hints**: Nudge your logic without giving away the full answer immediately.
* **Break down complex problems**: Walk through state models, CSS Grid math, or WAI-ARIA specs.
* **Review your approach**: Evaluate architectural tradeoffs and performance impacts.
* **Suggest learning resources**: High-signal engineering documentation and RFCs.
* **Give improvement suggestions**: Actionable code refactoring for senior-tier quality.

What specific problem or technical milestone would you like to dive into?`,
    suggestedFollowUps: [
      'Help me understand the requirements',
      'Give me a hint for this task',
      'Explain my recent project score'
    ]
  };
}
