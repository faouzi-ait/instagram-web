import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import UserProfile, { UserProfileProps } from './index';

export default {
  title: 'Molecules/UserProfile',
  component: UserProfile,
  argTypes: {
    photo: { control: 'text' },
    name: { control: 'text' },
    alt: { control: 'text' },
    avatarSize: {
      control: {
        type: 'select',
        options: ['xsmall', 'small', 'medium', 'large'],
      },
    },
    labelSize: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    style: { control: 'object' },
    className: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<UserProfileProps> = (args) => <UserProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  name: 'John Doe',
  alt: 'Profile photo of John Doe',
};

export const CustomSizes = Template.bind({});
CustomSizes.args = {
  photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  name: 'Jane Smith',
  alt: 'Profile photo of Jane Smith',
  avatarSize: 'large',
  labelSize: 'small',
};

export const WithCustomStyleAndClass = Template.bind({});
WithCustomStyleAndClass.args = {
  photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  name: 'Sam Wilson',
  alt: 'Profile photo of Sam Wilson',
  style: { color: 'blue', marginLeft: '2rem' },
  className: 'custom-profile-class',
};
