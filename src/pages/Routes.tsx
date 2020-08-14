import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import BoardListPage from './BoardListPage';

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" render={ (props) => <BoardListPage /> } />
      </Switch>
    </>
  );
}

export default Routes;
