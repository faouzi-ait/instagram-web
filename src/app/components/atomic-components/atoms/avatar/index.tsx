import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  style,
  className,
}) => {
  const sizeMap = {
    xsmall: 30,
    small: 50,
    medium: 75,
    large: 100,
  };

  if (!src) return;

  return (
    <Image
      width={sizeMap[size]}
      height={sizeMap[size]}
      alt={alt}
      src={src}
      priority
      style={{
        borderRadius: '50%',
        ...style,
      }}
      className={className}
    />
  );
};

export default Avatar;
