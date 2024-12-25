// import React from 'react';
// import styles from './button.module.css';

// type ButtonProps = {
//   children: React.ReactNode;
//   type?: 'button' | 'submit' | 'reset';
//   onClick?: (e: any) => void;
//   variant?: 'primary' | 'secondary';
//   size?: 'small' | 'medium' | 'large';
//   disabled?: boolean;
//   isLoading?: boolean;
//   style?: React.CSSProperties;
//   className?: string;
// };

// const Button: React.FC<ButtonProps> = ({
//   children,
//   type = 'button',
//   variant = 'primary',
//   size = 'medium',
//   disabled = false,
//   isLoading = false,
//   onClick,
//   style,
//   className,
// }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
//       disabled={disabled || isLoading}
//       style={style}
//     >
//       {isLoading ? 'Loading...' : children}
//     </button>
//   );
// };

// export default Button;

import React from 'react';
import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  onClick,
  style,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      style={style}
    >
      {isLoading ? (
        <span>
          <span className={styles.spinner} aria-hidden='true'></span>
          <span className='visually-hidden'>Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
