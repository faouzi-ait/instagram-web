import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import InputField from './index';

export default {
  title: 'Atoms/InputField',
  component: InputField,
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
    name: { control: 'text' },
    onChange: { action: 'changed' },
    style: { control: 'object' },
    className: { control: 'text' },
    required: { control: 'boolean' },
  },
} as Meta<typeof InputField>;

const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text',
  type: 'text',
  value: '',
  name: 'default',
  required: false,
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: 'Enter text',
  type: 'text',
  value: 'Sample text',
  name: 'withValue',
  required: false,
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Enter password',
  type: 'password',
  value: '',
  name: 'password',
  required: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  placeholder: 'Enter text',
  type: 'text',
  value: '',
  name: 'customStyle',
  style: { border: '2px solid red', padding: '10px' },
  required: false,
};
