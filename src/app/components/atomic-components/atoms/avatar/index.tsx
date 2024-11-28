import React from 'react';
import Image from 'next/image';

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
    <Image
      width={dimension}
      height={dimension}
      alt={alt}
      src={src}
      priority
      style={{
        borderRadius: '50%',
        ...style,
      }}
    />
  );
};

export default Avatar;
