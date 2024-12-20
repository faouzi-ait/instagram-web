import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import MenuItem from './index';

export default {
  title: 'Atoms/MenuItem',
  component: MenuItem,
  argTypes: {
    children: { control: 'text' },
    style: { control: 'object' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof MenuItem>;

const Template: StoryFn<typeof MenuItem> = (args) => <MenuItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Menu Item',
  style: {},
  className: '',
};

export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
  children: 'Menu Item with Custom Style',
  style: { backgroundColor: 'lightblue', padding: '10px' },
  className: '',
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  children: 'Menu Item with Custom Class',
  style: {},
  className: 'custom-class',
};
