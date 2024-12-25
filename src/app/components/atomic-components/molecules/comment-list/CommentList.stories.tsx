import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CommentList from './index';
import { Review } from '../../../../utils/types';

export default {
  title: 'Molecules/CommentList',
  component: CommentList,
  argTypes: {
    reviews: { control: 'object' },
    postId: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<{ reviews: Review[]; postId: string }> = (args) => (
  <CommentList {...args} />
);

export const Default = Template.bind({});
export const WithEmptyList = Template.bind({});
export const WithLongComments = Template.bind({});

Default.args = {
  postId: '5',
  reviews: [
    { user: '1', username: 'john_doe', comment: 'Great post!', rating: 5 },
    {
      user: '2',
      username: 'jane_smith',
      comment: 'I totally agree!',
      rating: 4,
    },
    {
      user: '3',
      username: 'sam_williams',
      comment: 'Interesting perspective.',
      rating: 3,
    },
  ],
};

WithEmptyList.args = {
  postId: '2',
  reviews: [],
};

WithLongComments.args = {
  postId: '3',
  reviews: [
    {
      user: '1',
      username: 'john_doe',
      comment:
        'Great post! I really enjoyed reading it. It provides a lot of insight into the topic and I agree with most of the points made.',
      rating: 5,
    },
    {
      user: '2',
      username: 'jane_smith',
      comment:
        'I totally agree! This is a fantastic article and it opened my eyes to some new ideas I hadn’t considered before.',
      rating: 4,
    },
    {
      user: '3',
      username: 'sam_williams',
      comment:
        'Interesting perspective. I’ve never thought about this in such depth before, and the way the author connected different concepts was really compelling.',
      rating: 3,
    },
  ],
};
