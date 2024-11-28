import React from 'react';
import styles from './menuList.module.css';

interface MenuListProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLUListElement>;
}

const MenuList: React.FC<MenuListProps> = ({ children, onClick }) => {
  return (
    <ul className={styles.menuList} onClick={onClick}>
      {children}
    </ul>
  );
};

export default MenuList;
