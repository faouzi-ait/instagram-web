import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import PageLayout from './index';

export default {
  title: 'Atoms/PageLayout',
  component: PageLayout,
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta<typeof PageLayout>;

const Template: StoryFn<typeof PageLayout> = (args) => <PageLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Page Title',
  children: <p>This is the page content.</p>,
};

export const WithMultipleChildren = Template.bind({});
WithMultipleChildren.args = {
  title: 'Page Title',
  children: (
    <div>
      <p>This is the first paragraph.</p>
      <p>This is the second paragraph.</p>
    </div>
  ),
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'Custom Page Title',
  children: <p>This is the page content with a custom title.</p>,
};
