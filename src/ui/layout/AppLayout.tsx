import React, { ReactChild, ReactChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './index';

interface Props {
  children: ReactChild | ReactChildren;
}

function AppLayout({ children }: Props) {
  return (
    <>
      <BrowserRouter basename="/">
        <div className="everyday">
          <Header />

          { children }
        </div>
      </BrowserRouter>
    </>
  );
}

export default AppLayout;
