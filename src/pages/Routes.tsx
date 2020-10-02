import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import BoardListPage from './BoardListPage';
import BoardPage from './BoardPage';
import LoginPage from './LoginPage';

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/boardList" render={ (props) => <BoardListPage /> } />
        <Route path="/board" render={ (props) => <BoardPage /> } />
        <Route path="/" render={ (props) => <LoginPage /> } />
      </Switch>
    </>
  );
}

export default Routes;
