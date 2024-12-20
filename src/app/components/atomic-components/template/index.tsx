import React from 'react';
import AuthGuard from '../../route-protection/AuthGuard';

import PageLayout from '../atoms/page-layout';
import HeaderSection from '../organism/header-section';

export interface PageLayoutDisplayProps {
  children: React.ReactNode;
  title: string;
  condition: 'loggedIn' | 'notLoggedIn';
  redirectTo: string;
}

const PageLayoutDisplay = ({
  children,
  title,
  condition,
  redirectTo,
}: PageLayoutDisplayProps) => {
  return (
    <AuthGuard condition={condition} redirectTo={redirectTo}>
      <HeaderSection />
      <PageLayout title={title}>{children}</PageLayout>
    </AuthGuard>
  );
};

export default PageLayoutDisplay;
