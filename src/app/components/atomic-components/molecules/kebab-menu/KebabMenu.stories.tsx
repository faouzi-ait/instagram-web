import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import KebabMenu from './index';

export default {
  title: 'Molecules/KebabMenu',
  component: KebabMenu,
  argTypes: {
    children: { control: 'object' },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <KebabMenu {...args}>{args.children}</KebabMenu>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <div style={{ padding: '8px' }}>Menu Item 1</div>
      <div style={{ padding: '8px' }}>Menu Item 2</div>
      <div style={{ padding: '8px' }}>Menu Item 3</div>
    </>
  ),
};

export const WithCustomItems = Template.bind({});
WithCustomItems.args = {
  children: (
    <>
      <button style={{ padding: '8px' }}>Custom Action 1</button>
      <button style={{ padding: '8px' }}>Custom Action 2</button>
    </>
  ),
};

export const WithLongList = Template.bind({});
WithLongList.args = {
  children: (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{ padding: '8px' }}>
          Menu Item {i + 1}
        </div>
      ))}
    </>
  ),
};
