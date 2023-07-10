"use client";

import ToastProvider from "./ToastProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <ToastProvider />
    </SessionProvider>
  );
};

export default Providers;
