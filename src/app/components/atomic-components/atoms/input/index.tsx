import React, { forwardRef } from 'react';
import styles from './input.module.css';

interface InputFieldProps {
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'file' | 'url';
  value?: string | number;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  required?: boolean;
  disabled?: boolean; // Optional prop for disabling the input
  testId?: string; // For testing purposes
  autoComplete?: string; // HTML5 auto-complete
  ariaLabel?: string; // For accessibility
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      placeholder = 'Enter text',
      value,
      name,
      type = 'text',
      onChange = () => {}, // Provide a default no-op function
      style,
      className,
      required = false,
      disabled = false,
      testId,
      autoComplete = 'off',
      ariaLabel,
    },
    ref
  ) => {
    return (
      <input
        name={name}
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={type !== 'file' ? value : undefined}
        onChange={onChange}
        style={{ padding: '4px', ...style }}
        className={`${styles.inputStyle} ${className}`}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-label={ariaLabel || placeholder}
        data-testid={testId}
      />
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
