import React from 'react';
import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
