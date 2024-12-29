import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PostTextSection from './index';
import { Post } from '../../../../utils/types';

export default {
  title: 'Organisms/PostTextSection',
  component: PostTextSection,
  argTypes: {
    likeCount: { control: { type: 'number' } },
  },
} as Meta<typeof PostTextSection>;

const Template: StoryFn<typeof PostTextSection> = (args) => (
  <div className='storybook-container'>
    <PostTextSection {...args} />
  </div>
);

const mockPost: Post = {
  _id: '1',
  post: 'This is a sample post with some amazing content.',
  likes: ['user1', 'user2', 'user3'],
  reviews: [
    { user: 'user1', comment: 'Great post!', rating: 5, username: 'Alice' },
    { user: 'user2', comment: 'Loved it!', rating: 4, username: 'Bob' },
  ],
  totalReviews: 2,
  createdAt: '2023-12-26T12:00:00.000Z',
  user: 'user1',
  photo: '',
  favorites: [],
  publicId: '',
  ratings: 0,
  totalViews: 0,
  updatedAt: '',
};

export const Default = Template.bind({});
export const NoComments = Template.bind({});

Default.args = {
  post: mockPost,
  likeCount: mockPost.likes.length,
};

NoComments.args = {
  post: { ...mockPost, reviews: [], totalReviews: 0 },
  likeCount: mockPost.likes.length,
};
