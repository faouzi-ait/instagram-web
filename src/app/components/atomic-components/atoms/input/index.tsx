import React, { forwardRef } from 'react';

interface InputFieldProps {
  placeholder?: string;
  type?: string;
  value?: any;
  name?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      placeholder = 'Enter text',
      value,
      name,
      type = 'text',
      onChange,
      style,
      className,
      required = false,
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
        className={className}
        required={required}
      />
    );
  }
);

InputField.displayName = 'InputField'; // Add a display name for debugging purposes

export default InputField;
