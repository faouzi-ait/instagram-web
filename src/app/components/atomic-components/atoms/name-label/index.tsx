import React from 'react';

interface NameLabelProps {
  name: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

const NameLabel: React.FC<NameLabelProps> = ({
  name,
  size = 'medium',
  style,
}) => {
  const sizeMap = {
    xsmall: '8px',
    small: '12px',
    medium: '16px',
    large: '20px',
  };

  return (
    <div
      style={{
        fontSize: sizeMap[size],
        fontWeight: 'bold',
        ...style,
      }}
    >
      {name}
    </div>
  );
};

export default NameLabel;
