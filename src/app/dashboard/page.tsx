'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../components/protected-route/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>DASHBOARD</div>
    </ProtectedRoute>
  );
}
