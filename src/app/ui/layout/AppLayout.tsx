import React, { ReactChild, ReactChildren } from 'react';
import { Container } from 'semantic-ui-react';
import { Footer, Header } from './index';

function AppLayout(routesProps:any) {
  return (
    <>
      <Container>
        <div className="everyday">
          <Header { ...routesProps } />

          { routesProps.children }

          { /* <Footer /> */ }
        </div>
      </Container>
    </>
  );
}

export default AppLayout;
