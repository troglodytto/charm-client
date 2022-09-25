import { AppProps } from 'next/app';
import { Provider as StoreProvider } from 'react-redux';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import ThemeProvider from 'theme';
import Layout from 'components/layout';
import GlobalModalContextProvider from 'components/layout/modal';
import 'styles/globals.css';
import wrapper from 'app/store';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({}),
});

function CharmApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore({ pageProps });

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GlobalModalContextProvider>
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          </GlobalModalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default CharmApp;
