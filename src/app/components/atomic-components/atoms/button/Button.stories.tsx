import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './index';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  isLoading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
  size: 'medium',
  disabled: false,
  isLoading: false,
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  variant: 'primary',
  size: 'large',
  disabled: false,
  isLoading: false,
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  variant: 'primary',
  size: 'small',
  disabled: false,
  isLoading: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  variant: 'primary',
  size: 'medium',
  disabled: true,
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Loading Button',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  isLoading: true,
};
