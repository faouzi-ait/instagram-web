'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';

const RedirectIfLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return <>{children}</>;
};

export default RedirectIfLoggedIn;
