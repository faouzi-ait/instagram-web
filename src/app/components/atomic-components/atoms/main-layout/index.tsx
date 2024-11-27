import React from 'react';
import styles from './layout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <div className={styles.layout}>{children}</div>;
}
