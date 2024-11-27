import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  style,
}) => {
  const sizeMap = {
    xsmall: 30,
    small: 50,
    medium: 75,
    large: 100,
  };

  const dimension = sizeMap[size];

  return (
    <img
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      style={{
        borderRadius: '50%',
        ...style,
      }}
    />
  );
};

export default Avatar;
