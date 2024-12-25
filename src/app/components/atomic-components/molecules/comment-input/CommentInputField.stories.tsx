import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CommentInputField, { CommentInputFieldProps } from './index';

export default {
  title: 'Molecules/CommentInputField',
  component: CommentInputField,
  argTypes: {
    onSubmitComment: { action: 'submitted' },
    onCommentChange: { action: 'comment changed' },
  },
} as Meta;

const Template: StoryFn<CommentInputFieldProps> = (args) => {
  const [comment, setComment] = useState(args.comment || '');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    args.onCommentChange(e);
  };

  return (
    <CommentInputField
      {...args}
      comment={comment}
      onCommentChange={handleCommentChange}
    />
  );
};

export const Default = Template.bind({});
export const WithComment = Template.bind({});
export const WithActionHandlers = Template.bind({});

Default.args = {
  userPhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
  comment: '',
  onSubmitComment: () => {},
  onCommentChange: () => {},
};

WithComment.args = {
  userPhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
  comment: 'This is a pre-filled comment.',
  onSubmitComment: () => {},
  onCommentChange: () => {},
};

WithActionHandlers.args = {
  userPhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
  comment: '',
  onSubmitComment: () => alert('Comment submitted!'),
  onCommentChange: () => alert('Comment changed!'),
};
