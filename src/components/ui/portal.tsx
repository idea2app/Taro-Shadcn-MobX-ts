import { Fragment, type PropsWithChildren, type FC } from 'react';
import { createPortal } from 'react-dom';
import * as TaroComponents from 'virtual:taro/components';

import { isH5 } from '@/lib/platform';

const { RootPortal } = TaroComponents as any;

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  if (isH5())
    return typeof document === 'undefined' ? (
      <>{children}</>
    ) : (
      createPortal(children, document.body)
    );

  const Wrapper = RootPortal || Fragment;

  return <Wrapper>{children}</Wrapper>;
};
