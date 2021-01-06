import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import useBoard from '../../hooks/useBoard';
import { Constant } from '../../config';

function LeftSideBar(routesProps: RouteComponentProps) {
  const { setBoardMenuFn } = useBoard();

  const setMenuFeed = () => {
    setBoardMenuFn(Constant.BOARD_MENU.FEED);
    routesProps.history.push('/board/feed');
  };

  const setMenuMember = () => {
    setBoardMenuFn(Constant.BOARD_MENU.MEMBER);
    routesProps.history.push('/board/member');
  };

  return (
    <>
      <div className="leftBar">
        <div className="menu" onClick={ setMenuFeed }><Icon name="newspaper outline" />새 소식</div>
        <div className="menu" onClick={ setMenuMember }><Icon name="users" />멤버</div>
      </div>
    </>
  );
}

export default LeftSideBar;
