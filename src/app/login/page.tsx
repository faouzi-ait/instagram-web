'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle login logic
    alert('Login form submitted');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login Page</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '300px', margin: 'auto' }}
      >
        <div>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
  );
}
