import React from 'react';

interface InputFieldProps {
  placeholder?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = 'Enter text',
  value,
  onChange,
  style,
  className,
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ padding: '4px', margin: '0 0 0 0.75rem', ...style }}
      className={className}
    />
  );
};

export default InputField;
