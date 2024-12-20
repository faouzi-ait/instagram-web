import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Avatar from './index';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const XSmall = Template.bind({});
XSmall.args = {
  src: 'https://via.placeholder.com/30',
  alt: 'XSmall Avatar',
  size: 'xsmall',
};

export const Small = Template.bind({});
Small.args = {
  src: 'https://via.placeholder.com/50',
  alt: 'Small Avatar',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  src: 'https://via.placeholder.com/75',
  alt: 'Medium Avatar',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  src: 'https://via.placeholder.com/100',
  alt: 'Large Avatar',
  size: 'large',
};