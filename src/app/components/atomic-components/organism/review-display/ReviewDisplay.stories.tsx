import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ReviewDisplay from './ReviewDisplay';
import { ReviewDisplayProps } from '../../../../utils/types';

export default {
  title: 'Organisms/ReviewDisplay',
  component: ReviewDisplay,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ReviewDisplay>;

const Template: StoryFn<typeof ReviewDisplay> = (args: ReviewDisplayProps) => (
  <ReviewDisplay {...args} />
);

export const Default = Template.bind({});
export const LongComment = Template.bind({});

Default.args = {
  userId: '12345',
  username: 'John Doe',
  comment:
    'This is a sample comment to display in the ReviewDisplay component.',
};

LongComment.args = {
  userId: '67890',
  username: 'Jane Smith',
  comment:
    'This is a very long comment that spans multiple lines to demonstrate how the ReviewDisplay component handles longer text content gracefully. It is useful for testing edge cases and ensuring the layout remains consistent.',
};
