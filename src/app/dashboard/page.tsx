'use client';

import React from 'react';
import ProtectedRoute from '../components/route-protection/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>DASHBOARD</div>
    </ProtectedRoute>
  );
}
