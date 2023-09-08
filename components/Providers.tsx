"use client";

import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import ToastProvider from './ToastProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
      <ToastProvider />
    </SessionProvider>
  );
};

export default Providers;
