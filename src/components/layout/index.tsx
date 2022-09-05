import ThemeProvider from 'theme';
import { WithChildren } from 'next-env';
import React, { FC } from 'react';
import AppHeader from './header';

const Layout: FC<WithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <AppHeader />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
