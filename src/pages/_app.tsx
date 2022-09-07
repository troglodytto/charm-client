import Layout from 'components/layout';
import { AppProps } from 'next/app';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import { Provider as StoreProvider } from 'react-redux';
import GlobalModalContextProvider from 'components/layout/modal';
import ThemeProvider from 'theme';
import store from 'store';

import 'styles/globals.css';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({}),
});

function CharmApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GlobalModalContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalModalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default CharmApp;
