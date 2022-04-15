import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { I18nextProvider } from 'react-i18next';

import i18n from '~lib/i18n';

import '../styles/globals.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </I18nextProvider>
);

export default MyApp;
