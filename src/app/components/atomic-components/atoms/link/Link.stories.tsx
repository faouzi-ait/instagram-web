import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LinkItem from './index'; // Adjust the path to your LinkItem component

export default {
  title: 'Atoms/LinkItem',
  component: LinkItem,
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
    className: { control: 'text' },
  },
} as Meta<typeof LinkItem>;

const Template: StoryFn<typeof LinkItem> = (args) => <LinkItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: '#',
  label: 'Default Link',
  className: '',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: 'https://www.example.com',
  label: 'External Link',
  className: '',
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  href: '#',
  label: 'Link with Custom Class',
  className: 'custom-class',
};
