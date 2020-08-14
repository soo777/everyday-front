import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'src/style/style.scss';
import { AppLayout } from './ui/layout';
import Routes from './pages/Routes';

function App() {
  return (
    <>
      <AppLayout>
        <Routes />
      </AppLayout>
    </>
  );
}

export default App;
