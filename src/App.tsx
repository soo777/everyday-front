import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'style/style.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'pages/Routes';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
