'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import InputField from '../components/atomic-components/atoms/input';
import Button from '../components/atomic-components/atoms/button';
import AuthGuard from '../components/route-protection/AuthGuard';

import { useLoginMutation } from '../../redux/apiServices/authApi';
import { setCredentials } from '../../redux/slices/authSlice';

import styles from './page.module.css';

type LoginError = {
  isLoading: boolean;
  error: {
    data?: {
      error?: string;
    };
  };
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error, isLoading }] = useLoginMutation<LoginError>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please type in your username and password');
      return false;
    }

    try {
      const { token, refreshToken, user } = await login({
        username,
        password,
      }).unwrap();

      dispatch(setCredentials({ user, accessToken: { token, refreshToken } }));
      router.push('/');
    } catch (error) {
      return error;
    }
  };

  return (
    <AuthGuard condition='loggedIn' redirectTo='/'>
      <div className={styles.pageLayout}>
        <h1 className={styles.title}>Your Instagram!</h1>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <InputField
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputStyle}
          />
          <InputField
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputStyle}
          />
          <Button
            type='submit'
            variant='secondary'
            size='medium'
            className={styles.submit}
            disabled={isLoading}
          >
            {isLoading ? 'Logging you in...' : 'Login'}
          </Button>
        </form>
        <a href='/' className={styles.homeLink}>
          Back to Home
        </a>
        {error && <p className={styles.errorMessage}>{error?.data?.error}</p>}
      </div>
    </AuthGuard>
  );
}
