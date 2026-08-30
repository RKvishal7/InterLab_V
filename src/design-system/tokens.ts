/**
 * InternLab Design System & Spatial Tokens
 * 
 * Philosophy: Professional workplace aesthetic, editorial authority, 
 * intentional whitespace, structured grids, high contrast, zero AI slop.
 */

/**
 * InternLab Design System & Spatial Tokens
 * 
 * Philosophy: Professional workplace aesthetic, editorial authority, 
 * intentional whitespace, structured grids, high contrast, zero AI slop.
 */

export const DESIGN_TOKENS = {
  colors: {
    // Semantic Core
    primary: {
      DEFAULT: '#1A1C1E',
      hover: '#0F1011',
      active: '#000000',
      subtle: '#2E3033',
    },
    secondary: {
      DEFAULT: '#484B4F',
      hover: '#2E3033',
      subtle: '#66696D',
      muted: '#8A8A85',
    },
    accent: {
      DEFAULT: '#3E51FF',
      hover: '#2D3FE6',
      subtle: '#EEF0FF',
      focus: '#3E51FF',
      foreground: '#FFFFFF',
    },
    // Backgrounds & Canvas
    background: {
      DEFAULT: '#F9F8F6', // Warm stone canvas
      subtle: '#F2F1EE',     // Secondary workplace surface
      muted: '#EAEAE6',      // Inset input/well surface
    },
    surface: {
      DEFAULT: '#FFFFFF',    // Clean card & container surface
      card: '#FFFFFF',
      subtle: '#F2F1EE',
      elevated: '#FFFFFF',   // Dropdown/popover surface
      dark: '#1A1C1E',       // Terminal & dark simulation panel
      darkSubtle: '#25282B',
    },
    // Borders & Hairline Dividers (Crisp 1px borders)
    border: {
      DEFAULT: '#E2E2DE',
      subtle: '#EAEAE6',
      regular: '#E2E2DE',
      strong: '#CBCBC6',
      dark: '#1A1C1E',
      focus: '#1A1C1E',
      accent: '#3E51FF',
    },
    // Typography Semantics
    text: {
      primary: '#1A1C1E',
      secondary: '#484B4F',
      muted: '#8A8A85',
      inverse: '#FFFFFF',
      accent: '#3E51FF',
    },
    // Feedback & System States
    state: {
      success: {
        text: '#115E59',
        bg: '#F0FDFA',
        border: '#CCFBF1',
        icon: '#0D9488',
      },
      warning: {
        text: '#854D0E',
        bg: '#FEFCE8',
        border: '#FEF08A',
        icon: '#CA8A04',
      },
      danger: {
        text: '#991B1B',
        bg: '#FEF2F2',
        border: '#FECACA',
        icon: '#DC2626',
      },
      info: {
        text: '#3E51FF',
        bg: '#EEF0FF',
        border: '#C7D2FE',
        icon: '#3E51FF',
      },
    },
    // Career Tracks Semantic Coding
    tracks: {
      softwareEngineering: '#1A1C1E',
      quantitativeFinance: '#065F46',
      productManagement: '#7C2D12',
      dataScience: '#1E40AF',
      cybersecurity: '#4C1D95',
    },
  },
  typography: {
    fontFamily: {
      sans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    scale: {
      display: {
        size: '2.5rem',      // 40px
        lineHeight: '1.15',
        letterSpacing: '-0.03em',
        weight: '800',
      },
      pageHeading: {
        size: '1.875rem',    // 30px
        lineHeight: '1.2',
        letterSpacing: '-0.025em',
        weight: '700',
      },
      sectionHeading: {
        size: '1.25rem',     // 20px
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
        weight: '700',
      },
      cardTitle: {
        size: '1rem',        // 16px
        lineHeight: '1.35',
        letterSpacing: '-0.015em',
        weight: '600',
      },
      body: {
        size: '0.9375rem',   // 15px
        lineHeight: '1.6',
        letterSpacing: '-0.005em',
        weight: '400',
      },
      bodySmall: {
        size: '0.8125rem',   // 13px
        lineHeight: '1.5',
        letterSpacing: '0em',
        weight: '400',
      },
      label: {
        size: '0.75rem',     // 12px
        lineHeight: '1.3',
        letterSpacing: '0.04em',
        weight: '600',
        transform: 'uppercase',
      },
      caption: {
        size: '0.6875rem',   // 11px
        lineHeight: '1.4',
        letterSpacing: '0.01em',
        weight: '500',
      },
      monoCode: {
        size: '0.8125rem',   // 13px
        lineHeight: '1.45',
        weight: '500',
      }
    },
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
  },
  radii: {
    none: '0px',
    xs: '2px',
    sm: '3px',
    base: '4px',
    md: '6px',
    lg: '8px',
    pill: '9999px',
  },
  shadows: {
    none: 'none',
    subtle: '0 1px 2px 0 rgba(26, 28, 30, 0.03)',
    card: '0 1px 3px 0 rgba(26, 28, 30, 0.04)',
    elevated: '0 4px 16px -2px rgba(26, 28, 30, 0.08), 0 2px 6px -1px rgba(26, 28, 30, 0.04)',
    popover: '0 10px 25px -3px rgba(26, 28, 30, 0.12)',
  },
  transitions: {
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;

