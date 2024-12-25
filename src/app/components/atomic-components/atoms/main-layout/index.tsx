import React from 'react';
import styles from './layout.module.css';

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function MainLayout({
  children,
  ariaLabel = 'Main content area',
  ...rest
}: MainLayoutProps) {
  return (
    <main
      className={styles.layout}
      role='main'
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </main>
  );
}
