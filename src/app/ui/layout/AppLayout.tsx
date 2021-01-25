import React, { ReactChild, ReactChildren } from 'react';
import { Container } from 'semantic-ui-react';
import { Footer, Header } from './index';

interface Props {
  children: any;
}

function AppLayout({ children }: Props) {
  return (
    <>
      <Container>
        <div className="everyday">
          <Header />

          { children }

          { /* <Footer /> */ }
        </div>
      </Container>
    </>
  );
}

export default AppLayout;
