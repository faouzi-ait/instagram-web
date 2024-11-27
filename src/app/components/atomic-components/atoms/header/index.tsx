import React from 'react';

import styles from './header.module.css';

interface HeaderProps {
  children: React.ReactElement;
}

export default function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}
