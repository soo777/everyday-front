import React from 'react';
import {
  AppLayout, Board, Item, LeftSideBar, RightSideBar,
} from 'app/ui';

function BoardPage() {
  return (
    <>
      <AppLayout>
        <div className="board">
          <section>
            <LeftSideBar />
            <Board />
            <RightSideBar />
          </section>
        </div>
      </AppLayout>
    </>
  );
}

export default BoardPage;
