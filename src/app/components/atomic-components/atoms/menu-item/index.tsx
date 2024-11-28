import React from 'react';
import styles from './menuItem.module.css';

interface MenuItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  style,
  className,
  onClick,
}) => {
  return (
    <li
      className={`${styles.menuItem} ${className || ''}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default MenuItem;
