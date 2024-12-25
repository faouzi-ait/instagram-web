'use client';

import Link from 'next/link';
import React from 'react';
import styles from './link.module.css';

interface LinkItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  className?: string;
  ariaLabel?: string;
  testId?: string; // For testing purposes
}

const LinkItem: React.FC<LinkItemProps> = ({
  href,
  label,
  className = '',
  ariaLabel,
  testId,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className={`${styles.homeLink} ${className}`}
      aria-label={ariaLabel || label}
      data-testid={testId}
      {...rest}
    >
      {label}
    </Link>
  );
};

export default LinkItem;
