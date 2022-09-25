/// <reference types="next" />
/// <reference types="next/image-types/global" />

import { ReactNode } from 'react';

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface WithChildren {
  children: ReactNode;
}
interface AuthState {
  email: string;
  userName: string;
  profileImage: string;
  isAuthorized: boolean;
  isOnline: boolean;
  isLoading: boolean;
  token: string;
}
