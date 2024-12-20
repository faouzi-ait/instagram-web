import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ImageWithLoader from './index';

export default {
  title: 'Atoms/ImageWithLoader',
  component: ImageWithLoader,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    sizes: { control: 'text' },
    fill: { control: 'boolean' },
  },
} as Meta<typeof ImageWithLoader>;

const Template: StoryFn<typeof ImageWithLoader> = (args) => (
  <ImageWithLoader {...args} />
);

export const WithFill = Template.bind({});
WithFill.args = {
  src: 'https://via.placeholder.com/150',
  alt: 'Placeholder Image',
  sizes: 'auto',
  fill: true,
};
