import React from 'react';
import styles from './page.module.css';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout;
