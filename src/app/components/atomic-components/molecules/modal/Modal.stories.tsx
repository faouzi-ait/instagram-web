import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Modal from './index';
import Button from '../../atoms/button';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  argTypes: {
    show: { control: 'boolean' },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<{
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = (args) => (
  <>
    <div id='modal-root' />
    <Modal {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  show: true,
  onClose: () => {},
  children: (
    <div>
      <p>This is the modal content!</p>
      <Button variant='primary' size='small'>
        Confirm
      </Button>
    </div>
  ),
};
