'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { RootState } from '../../../redux/store';

interface AuthGuardProps {
  redirectTo: string;
  condition: 'private' | 'public';
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  redirectTo,
  condition,
  children,
}) => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const shouldRedirect =
      (condition === 'private' && isLoggedIn) ||
      (condition === 'public' && !isLoggedIn);

    if (shouldRedirect) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, router, redirectTo, condition]);

  const shouldRender =
    (condition === 'private' && !isLoggedIn) ||
    (condition === 'public' && isLoggedIn);

  if (!shouldRender) return null;

  return <>{children}</>;
};

export default AuthGuard;
