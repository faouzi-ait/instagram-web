import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Header from './index';

export default {
  title: 'Atoms/Header',
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <h1>Header Title</h1>,
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  children: (
    <div>
      <h1>Header Title</h1>
      <h2>Subtitle</h2>
    </div>
  ),
};