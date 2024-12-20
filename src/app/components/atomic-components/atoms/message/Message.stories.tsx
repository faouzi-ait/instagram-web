import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Message from './index'; // Adjust the path to your Message component

export default {
  title: 'Atoms/Message',
  component: Message,
  argTypes: {
    condition: { control: 'boolean' },
    text: { control: 'text' },
    isError: { control: 'boolean' },
  },
} as Meta<typeof Message>;

const Template: StoryFn<typeof Message> = (args) => <Message {...args} />;

export const Default = Template.bind({});
Default.args = {
  condition: true,
  text: 'This is a message',
  isError: false,
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  condition: true,
  text: 'This is an error message',
  isError: true,
};

export const HiddenMessage = Template.bind({});
HiddenMessage.args = {
  condition: false,
  text: 'This message is hidden',
  isError: false,
};
