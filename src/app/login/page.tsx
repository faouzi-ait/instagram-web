'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import Button from '../components/atomic-components/atoms/button';
import AuthGuard from '../components/route-protection/AuthGuard';
import Message from '../components/atomic-components/atoms/message';
import InputField from '../components/atomic-components/atoms/input';
import PageLayout from '../components/atomic-components/atoms/page-layout';
import HeaderSection from '../components/atomic-components/organism/header-section';

import { useLoginMutation } from '../../redux/apiServices/authApi';
import { setCredentials } from '../../redux/slices/authSlice';

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
      <HeaderSection />
      <PageLayout title='Your Instagram!'>
        <form onSubmit={handleSubmit} className='formLayout'>
          <InputField
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            size='medium'
            variant='secondary'
            disabled={isLoading}
          >
            {isLoading ? 'Logging you in...' : 'Login'}
          </Button>
        </form>
        <Message
          condition={error}
          text={error?.data?.error as string}
          isError
        />
      </PageLayout>
    </AuthGuard>
  );
}
