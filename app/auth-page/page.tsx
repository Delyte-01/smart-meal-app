"use client";
import LogIn from '@/features/feature/log-in'
import React, { Suspense } from 'react'

const LoginPage = () => {
  return (
    <div className="bg-[#f4f7ff] w-full py-20 min-h-screen flex justify-center px-4 md:px-30 overflow-hidden">
      <Suspense fallback={<div>Loading auth page...</div>}>
        <LogIn />
      </Suspense>
    </div>
  );
}

export default LoginPage