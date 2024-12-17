'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

import Button from '../../atoms/button';
import Header from '../../atoms/header';
import ThemeToggle from '../..//molecules/toggle-theme';
import UserProfile from '../../molecules/user-info';

import { RootState } from '../../../../../redux/store';
import { setLogout } from '../../../../../redux/slices/authSlice';
import { currentUser } from '../../../../../redux/slices/selectors';
import { useGetUserPhotoQuery } from '../../../../../redux/apiServices/authApi';

import styles from './page.module.css';

interface HeaderSectionProps {
  children?: React.ReactNode;
}

const HeaderSection = ({ children }: HeaderSectionProps) => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const userId = useSelector(currentUser);
  const { isLoggedIn, user } = useSelector((item: RootState) => item.auth);

  const loggedInUserPhoto = useGetUserPhotoQuery(userId);

  const logout = async () => {
    dispatch(setLogout());
  };

  const buttons = [
    isLoggedIn && {
      label: `${path === '/dashboard' ? 'Home' : 'Dashboard'}`,
      onClick: () =>
        router.push(`${path === '/dashboard' ? '/' : '/dashboard'}`),
      condition: isLoggedIn,
    },
    isLoggedIn && {
      label: 'Logout',
      onClick: logout,
      condition: isLoggedIn,
    },
    !isLoggedIn && {
      label: `${path === '/login' ? 'Home' : 'Login'}`,
      onClick: () => router.push(`${path === '/login' ? '/' : 'login'}`),
      condition: !isLoggedIn,
    },
    !isLoggedIn && {
      label: `${path === '/register' ? 'Home' : 'Register'}`,
      onClick: () => router.push(`${path === '/register' ? '/' : '/register'}`),
      condition: !isLoggedIn,
    },
  ].filter(
    (btn): btn is { label: string; onClick: () => void; condition: boolean } =>
      Boolean(btn)
  );

  return (
    <Header>
      <>
        {isLoggedIn && (
          <UserProfile
            photo={loggedInUserPhoto?.data?.photo}
            name={`${user.firstname} ${user.lastname}`}
            alt="User's Profile Photo"
            avatarSize='medium'
            labelSize='medium'
            className={styles.userProfileLayout}
          />
        )}

        <div className={styles.iconsLayout}>
          {children}

          <span className={styles.flexRightAlign}></span>

          <ThemeToggle />

          {buttons.filter(Boolean).map((btn, index) => (
            <Button
              key={index}
              size='large'
              variant='secondary'
              onClick={btn.onClick}
              className={styles.iconMargin}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </>
    </Header>
  );
};

export default HeaderSection;
