import React from 'react';
import styles from './menuItem.module.css';

interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  style,
  className,
  onClick,
  ...rest
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLLIElement>);
    }
  };

  return (
    <li
      className={`${styles.menuItem} ${className || ''}`}
      style={style}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role='menuitem'
      tabIndex={0}
      {...rest}
    >
      {children}
    </li>
  );
};

export default MenuItem;
