export const localeOptions = ["en", "hu"] as const;

export type LocaleOptionsType = (typeof localeOptions)[number];
