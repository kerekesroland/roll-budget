"use client";

import { RecoilRoot } from "recoil";
import ToastProvider from "./ToastProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
      <ToastProvider />
    </SessionProvider>
  );
};

export default Providers;
