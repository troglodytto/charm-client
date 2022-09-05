import Layout from 'components/layout';
import GlobalModalContextProvider from 'components/layout/modal';
import { AppProps } from 'next/app';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import ThemeProvider from 'theme';
import 'styles/globals.css';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({}),
});

function CharmApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalModalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalModalContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default CharmApp;
