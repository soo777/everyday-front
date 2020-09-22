import React, { ReactChild, ReactChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Footer, Header } from './index';

interface Props {
  children: ReactChild | ReactChildren;
}

function AppLayout({ children }: Props) {
  return (
    <>
      <BrowserRouter basename="/">
        <Container>
          <div className="everyday">
            <Header />

            { children }

            <Footer />
          </div>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default AppLayout;
