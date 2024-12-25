import React from 'react';
import styles from './page.module.css';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className={styles.pageLayout} aria-labelledby='page-title'>
      <h1 id='page-title' className={styles.title}>
        {title}
      </h1>
      {children}
    </main>
  );
};

export default PageLayout;
