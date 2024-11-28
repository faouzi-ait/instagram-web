'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import PublicRoute from '../components/route-protection/PublicRoute';

import { useLoginMutation } from '../../redux/apiServices/authApi';
import { setCredentials } from '../../redux/slices/authSlice';

import React, { useState } from 'react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login /*, { data, error, isLoading }*/] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <PublicRoute>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Login Page</h1>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: '300px', margin: 'auto' }}
        >
          <div>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Email'
              required
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
              style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
            />
          </div>
          <button
            type='submit'
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
            }}
          >
            Login
          </button>
        </form>
        <br />
        <a href='/' style={{ color: '#0070f3', textDecoration: 'underline' }}>
          Back to Home
        </a>
      </div>
    </PublicRoute>
  );
}
