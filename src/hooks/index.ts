import { useContext, useMemo } from 'react';
import { GlobalModalContext } from 'components/layout/modal';
import NProgress from 'nprogress';

export const useProgress = () => {
  const onProgressStart = () => NProgress.start();
  const onProgressEnd = () => NProgress.done();

  useMemo(onProgressStart, []);

  return { onProgressStart, onProgressEnd };
};

export const useModal = () => {
  const context = useContext(GlobalModalContext);
  return context;
};
