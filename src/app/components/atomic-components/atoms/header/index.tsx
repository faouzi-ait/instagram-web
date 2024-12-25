import React, { ReactNode } from 'react';
import styles from './header.module.css';

interface HeaderProps {
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledby?: string;
}

export default function Header({
  children,
  ariaLabel,
  ariaLabelledby,
}: HeaderProps) {
  return (
    <header
      className={styles.header}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </header>
  );
}
