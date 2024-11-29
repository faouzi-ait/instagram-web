'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';

interface AuthGuardProps {
  redirectTo: string;
  condition: 'loggedIn' | 'notLoggedIn';
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
      (condition === 'loggedIn' && isLoggedIn) ||
      (condition === 'notLoggedIn' && !isLoggedIn);

    if (shouldRedirect) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, router, redirectTo, condition]);

  const shouldRender =
    (condition === 'loggedIn' && !isLoggedIn) ||
    (condition === 'notLoggedIn' && isLoggedIn);

  if (!shouldRender) return null;

  return <>{children}</>;
};

export default AuthGuard;
