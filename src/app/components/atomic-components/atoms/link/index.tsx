'use client';

import Link from 'next/link';
import React from 'react';

import styles from './link.module.css';

type LinkItemProps = {
  href: string;
  label: string;
  className?: string;
};

const LinkItem: React.FC<LinkItemProps> = ({
  href,
  label,
  className,
  ...rest
}) => {
  return (
    <Link href={href} className={`${styles.homeLink} ${className}`} {...rest}>
      {label}
    </Link>
  );
};

export default LinkItem;
