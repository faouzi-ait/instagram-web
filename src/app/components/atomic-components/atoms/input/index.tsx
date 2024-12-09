import React from 'react';

interface InputFieldProps {
  placeholder?: string;
  type?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = 'Enter text',
  value,
  type = 'text',
  onChange,
  style,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ padding: '4px', ...style }}
      className={className}
    />
  );
};

export default InputField;
