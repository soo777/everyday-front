import React, { ReactChild, ReactChildren } from 'react';
import { Header } from './index';

interface Props {
  children: ReactChild | ReactChildren;
}

function AppLayout({ children }: Props) {
  return (
    <>
      <Header />

      { children }
    </>
  );
}

export default AppLayout;
