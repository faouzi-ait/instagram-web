import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import MainLayout from './index';

import styles from './layout.module.css';

export default {
  title: 'Atoms/MainLayout',
  component: MainLayout,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta<typeof MainLayout>;

const Template: StoryFn<typeof MainLayout> = (args) => <MainLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p>This is the main layout content.</p>,
};

export const WithMultipleChildren = Template.bind({});
WithMultipleChildren.args = {
  children: (
    <div>
      <p>This is the first paragraph.</p>
      <p>This is the second paragraph.</p>
    </div>
  ),
};

export const CustomStyledChildren = Template.bind({});
CustomStyledChildren.args = {
  children: (
    <div className={styles.custom}>
      <p>This is the main layout content with custom styles.</p>
    </div>
  ),
};
