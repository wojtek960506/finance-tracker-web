import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
  },
  ns: ['common', 'transaction'], // your namespaces
  defaultNS: 'common',
};

export default nextI18NextConfig;