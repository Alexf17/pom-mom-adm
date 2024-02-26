import GlobalStyles from '@/Style/globalStyles';
import ContextProvider from '@/components/Context/CartContext';
import theme from '@/constants/theme';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <ContextProvider>
            <Component {...pageProps} />
          </ContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
