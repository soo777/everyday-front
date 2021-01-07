import React, { useEffect, useState } from 'react';
import {
  AppLayout, Board, Item, LeftSideBar, Member, RightSideBar,
} from 'app/ui';
import { RouteComponentProps } from 'react-router-dom';
import { Constant } from '../config';
import useBoard from '../hooks/useBoard';

function BoardPage(routesProps: RouteComponentProps) {
  const { board, setBoardMenuFn } = useBoard();

  useEffect(() => {
    const { url } = routesProps.match;
    if (url.toLocaleUpperCase().includes(Constant.BOARD_MENU.FEED)) {
      setBoardMenuFn(Constant.BOARD_MENU.FEED);
    }
  }, []);

  return (
    <>
      <AppLayout>
        <div className="board">
          <section>
            <LeftSideBar { ...routesProps } />
            { board.boardMenu === Constant.BOARD_MENU.FEED ? <Board /> : <Member /> }
            <RightSideBar />
          </section>
        </div>
      </AppLayout>
    </>
  );
}

export default BoardPage;
