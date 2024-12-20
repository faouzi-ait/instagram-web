import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import MenuList from './index';

import styles from './menuList.module.css';

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <li className={styles.menuItem} onClick={onClick}>
      {children}
    </li>
  );
};

export default {
  title: 'Atoms/MenuList',
  component: MenuList,
  subcomponents: { MenuItem },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof MenuList>;

const Template: StoryFn<typeof MenuList> = (args) => (
  <MenuList {...args}>
    <MenuItem>Item 1</MenuItem>
    <MenuItem>Item 2</MenuItem>
    <MenuItem>Item 3</MenuItem>
  </MenuList>
);

export const Default = Template.bind({});
Default.args = {};
