'use client';

import React from 'react';
import AuthGuard from '../components/route-protection/AuthGuard';

export default function Dashboard() {
  return (
    <AuthGuard condition='notLoggedIn' redirectTo='/login'>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>DASHBOARD</div>
    </AuthGuard>
  );
}
