import React from 'react';
import Avatar from '../../atoms/avatar';
import NameLabel from '../../atoms/name-label';

export interface UserProfileProps {
  photo: string;
  name: string;
  alt: string;
  avatarSize?: 'xsmall' | 'small' | 'medium' | 'large';
  labelSize?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  photo,
  name,
  alt,
  avatarSize = 'small',
  labelSize = 'medium',
  className,
  style,
}) => {
  return (
    <div className={className}>
      <Avatar src={photo} alt={alt} size={avatarSize} />
      <NameLabel
        name={name}
        size={labelSize}
        style={{ marginLeft: '1rem', color: 'black', ...style }}
      />
    </div>
  );
};

export default UserProfile;
