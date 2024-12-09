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

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login /*, { data, error, isLoading }*/] = useLoginMutation();

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
          >
            Login
          </Button>
        </form>
        <a href='/' style={{ color: '#0070f3', textDecoration: 'underline' }}>
          Back to Home
        </a>
      </div>
    </AuthGuard>
  );
}
