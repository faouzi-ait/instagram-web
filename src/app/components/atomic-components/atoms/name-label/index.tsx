import React from 'react';

interface NameLabelProps {
  name: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  className?: string;
}

const NameLabel: React.FC<NameLabelProps> = ({
  name,
  size = 'medium',
  style,
  className,
}) => {
  const sizeMap = {
    xsmall: '8px',
    small: '12px',
    medium: '16px',
    large: '20px',
  };

  return (
    <p
      className={className}
      style={{
        fontSize: sizeMap[size],
        fontWeight: 'bold',
        ...style,
      }}
      role='text'
      aria-label={`Name label: ${name}`}
      tabIndex={0}
    >
      {name}
    </p>
  );
};

export default NameLabel;
