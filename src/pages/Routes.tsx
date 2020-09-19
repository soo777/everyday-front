import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import BoardListPage from './BoardListPage';
import BoardPage from './BoardPage';

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/boardList" render={ (props) => <BoardListPage /> } />
        <Route path="/" render={ (props) => <BoardPage /> } />
      </Switch>
    </>
  );
}

export default Routes;
