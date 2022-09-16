import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = async req => {
  const { cookies } = req;
  const [accessToken, refreshToken] = ['accessToken', 'refreshToken'].map(
    cookies.get
  );

  // eslint-disable-next-line no-console
  console.log({ accessToken, refreshToken });

  return NextResponse.next();
};

export const config = {
  matcher: '/(.*)',
};
