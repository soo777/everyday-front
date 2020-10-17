import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import BoardListPage from 'pages/BoardListPage';
import BoardPage from 'pages/BoardPage';
import LoginPage from 'pages/LoginPage';

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/boardList" render={ (props) => <BoardListPage { ...props } /> } />
        <Route path="/board" render={ (props) => <BoardPage /> } />
        <Route path="/" render={ (props) => <LoginPage { ...props } /> } />
      </Switch>
    </>
  );
}

export default Routes;
