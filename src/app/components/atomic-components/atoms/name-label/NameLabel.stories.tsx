import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import NameLabel from './index';

export default {
  title: 'Atoms/NameLabel',
  component: NameLabel,
  argTypes: {
    name: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
    style: { control: 'object' },
  },
} as Meta<typeof NameLabel>;

const Template: StoryFn<typeof NameLabel> = (args) => <NameLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  size: 'medium',
  style: {},
};

export const Small = Template.bind({});
Small.args = {
  name: 'John Doe',
  size: 'small',
  style: {},
};

export const Large = Template.bind({});
Large.args = {
  name: 'John Doe',
  size: 'large',
  style: {},
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  name: 'John Doe',
  size: 'medium',
  style: { color: 'blue', backgroundColor: 'lightgray' },
};
