"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import ToastProvider from "./ToastProvider";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { LocaleOptionsType } from "@/constants/locales";
import { Timezone } from "node-schedule";

interface IProviderProps {
  children: React.ReactNode;
  locale: LocaleOptionsType;
  messages: AbstractIntlMessages;
  timeZone: Timezone;
}

const Providers = ({
  children,
  locale,
  messages,
  timeZone,
}: IProviderProps) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      <SessionProvider>
        <RecoilRoot>{children}</RecoilRoot>
        <ToastProvider />
      </SessionProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
