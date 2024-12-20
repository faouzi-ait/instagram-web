import React from 'react';
import { Meta } from '@storybook/react';
import Icon from './index';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {},
} as Meta<typeof Icon>;

type IconName =
  | 'remove'
  | 'photo'
  | 'add'
  | 'trash'
  | 'sun'
  | 'heartFull'
  | 'heartEmpty'
  | 'commentEmpty'
  | 'commentFull'
  | 'bookmarkFull'
  | 'bookmarkEmpty';

export const AllIcons = () => {
  const iconNames: IconName[] = [
    'remove',
    'photo',
    'add',
    'trash',
    'sun',
    'heartFull',
    'heartEmpty',
    'commentEmpty',
    'commentFull',
    'bookmarkFull',
    'bookmarkEmpty',
  ];
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {iconNames.map((name) => (
        <Icon key={name} name={name} size={24} color='currentColor' />
      ))}
    </div>
  );
};
