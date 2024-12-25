import React from 'react';
import styles from './menuList.module.css';

interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLUListElement>;
}

const MenuList: React.FC<MenuListProps> = ({ children, onClick, ...rest }) => {
  return (
    <ul
      className={styles.menuList}
      onClick={onClick}
      role='menu'
      aria-label='Menu options'
      {...rest}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          role: 'menuitem',
          tabIndex: index === 0 ? 0 : -1, // Set the first item to be focusable
          'aria-posinset': index + 1, // Indicate the item's position in the list
          'aria-setsize': React.Children.count(children), // Indicate the total number of items
        })
      )}
    </ul>
  );
};

export default MenuList;
