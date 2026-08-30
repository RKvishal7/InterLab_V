import React, { useId } from 'react';
import { Search, X, Check, ChevronDown } from 'lucide-react';
import { Label, Caption } from './Typography';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Universal Form Field Wrapper with Label, Required badge, Error state, and Helper text
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  optional,
  error,
  helperText,
  children,
  className = '',
  id,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
          {optional && (
            <span className="text-[10px] text-[#8A8A85] uppercase tracking-wider">Optional</span>
          )}
        </div>
      )}
      {children}
      {error ? (
        <p className="text-[11px] text-[#991B1B] font-medium mt-0.5 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#991B1B]"></span>
          {error}
        </p>
      ) : helperText ? (
        <Caption variant="muted" className="mt-0.5">{helperText}</Caption>
      ) : null}
    </div>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

/**
 * Precision Text Input
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  error,
  leftElement,
  rightElement,
  disabled,
  ...props
}, ref) => {
  const borderState = error
    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
    : 'border-[#E2E2DE] focus:border-[#1A1C1E] focus:ring-1 focus:ring-[#1A1C1E]';

  return (
    <div className="relative flex items-center w-full">
      {leftElement && (
        <div className="absolute left-3 flex items-center pointer-events-none text-[#8A8A85]">
          {leftElement}
        </div>
      )}
      <input
        ref={ref}
        disabled={disabled}
        className={`w-full bg-[#FFFFFF] text-sm text-[#1A1C1E] placeholder:text-[#8A8A85] border ${borderState} rounded-sm transition-colors py-2 ${
          leftElement ? 'pl-9' : 'pl-3'
        } ${rightElement ? 'pr-9' : 'pr-3'} disabled:bg-[#F2F1EE] disabled:text-[#8A8A85] disabled:cursor-not-allowed outline-none ${className}`}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-3 flex items-center text-[#8A8A85]">
          {rightElement}
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export interface SearchFieldProps extends Omit<InputProps, 'leftElement' | 'rightElement'> {
  onClear?: () => void;
  showKbd?: boolean;
}

/**
 * Interactive Search Field with Lucide icon, Clear button, and Keyboard shortcut tag
 */
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(({
  value,
  onChange,
  onClear,
  showKbd = true,
  placeholder = 'Search simulations, skills, tasks...',
  className = '',
  ...props
}, ref) => {
  const hasValue = Boolean(value && String(value).length > 0);

  return (
    <div className="relative flex items-center w-full">
      <Search className="w-4 h-4 absolute left-3 text-[#8A8A85] pointer-events-none" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#FFFFFF] text-sm text-[#1A1C1E] placeholder:text-[#8A8A85] border border-[#E2E2DE] rounded-sm py-2 pl-9 pr-14 focus:border-[#1A1C1E] focus:ring-1 focus:ring-[#1A1C1E] transition-colors outline-none ${className}`}
        {...props}
      />
      <div className="absolute right-2.5 flex items-center gap-1">
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {showKbd && !hasValue && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#8A8A85] bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs">
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  );
});
SearchField.displayName = 'SearchField';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string;
  options?: { value: string; label: string; disabled?: boolean }[];
}

/**
 * Styled Editorial Select Dropdown
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  children,
  className = '',
  error,
  options,
  disabled,
  ...props
}, ref) => {
  const borderState = error
    ? 'border-[#DC2626] focus:border-[#DC2626]'
    : 'border-[#E2E2DE] focus:border-[#1A1C1E]';

  return (
    <div className="relative flex items-center w-full">
      <select
        ref={ref}
        disabled={disabled}
        className={`w-full appearance-none bg-[#FFFFFF] text-sm text-[#1A1C1E] border ${borderState} rounded-sm py-2 pl-3 pr-8 focus:ring-1 focus:ring-[#1A1C1E] transition-colors disabled:bg-[#F2F1EE] disabled:text-[#8A8A85] disabled:cursor-not-allowed outline-none cursor-pointer ${className}`}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-2.5 text-[#8A8A85] pointer-events-none" />
    </div>
  );
});
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  charCount?: { current: number; max: number };
}

/**
 * Editorial Textarea Component
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className = '',
  error,
  charCount,
  disabled,
  rows = 4,
  ...props
}, ref) => {
  const borderState = error
    ? 'border-[#DC2626] focus:border-[#DC2626]'
    : 'border-[#E2E2DE] focus:border-[#1A1C1E]';

  return (
    <div className="flex flex-col w-full">
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-[#FFFFFF] text-sm text-[#1A1C1E] placeholder:text-[#8A8A85] border ${borderState} rounded-sm p-3 focus:ring-1 focus:ring-[#1A1C1E] transition-colors disabled:bg-[#F2F1EE] disabled:text-[#8A8A85] disabled:cursor-not-allowed outline-none leading-relaxed resize-y ${className}`}
        {...props}
      />
      {charCount && (
        <div className="flex justify-end mt-1 text-[11px] font-mono text-[#8A8A85]">
          <span className={charCount.current > charCount.max ? 'text-[#991B1B] font-bold' : ''}>
            {charCount.current}
          </span>
          /{charCount.max}
        </div>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

/**
 * Geometric Checkbox Component
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  className = '',
  id: customId,
  checked,
  disabled,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = customId || generatedId;

  return (
    <label htmlFor={id} className={`flex items-start gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-4 h-4 rounded-xs border border-[#CBCBC6] bg-white peer-checked:bg-[#1A1C1E] peer-checked:border-[#1A1C1E] peer-focus:ring-2 peer-focus:ring-[#1A1C1E]/20 transition-all flex items-center justify-center">
          <Check className="w-3 h-3 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-xs sm:text-sm font-medium text-[#1A1C1E]">{label}</span>}
          {description && <span className="text-xs text-[#8A8A85] leading-normal">{description}</span>}
        </div>
      )}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

/**
 * Precision Radio Button
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  label,
  description,
  className = '',
  id: customId,
  checked,
  disabled,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = customId || generatedId;

  return (
    <label htmlFor={id} className={`flex items-start gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={ref}
          id={id}
          type="radio"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-4 h-4 rounded-full border border-[#CBCBC6] bg-white peer-checked:border-[#1A1C1E] peer-focus:ring-2 peer-focus:ring-[#1A1C1E]/20 transition-all flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#1A1C1E] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-xs sm:text-sm font-medium text-[#1A1C1E]">{label}</span>}
          {description && <span className="text-xs text-[#8A8A85] leading-normal">{description}</span>}
        </div>
      )}
    </label>
  );
});
Radio.displayName = 'Radio';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Sleek 2-State Pill Toggle / Switch
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
  id: customId,
}) => {
  const generatedId = useId();
  const id = customId || generatedId;

  return (
    <div className={`flex items-center justify-between gap-4 select-none ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}>
      {(label || description) && (
        <label htmlFor={id} className="flex flex-col cursor-pointer">
          {label && <span className="text-xs sm:text-sm font-medium text-[#1A1C1E]">{label}</span>}
          {description && <span className="text-xs text-[#8A8A85]">{description}</span>}
        </label>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-pill border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/20 ${
          checked ? 'bg-[#1A1C1E]' : 'bg-[#CBCBC6]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
