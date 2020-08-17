import React from 'react';
import useBoard from '../hooks/useBoard';

function BoardListPage() {
  const { board } = useBoard();

  console.log(board);
  return (
    <>
      <div className="sideBar">
        <div className="boardList">
          Board111111
        </div>
        <div className="boardList">
          Board222222
        </div>
        {
          board
        }
      </div>
    </>
  );
}

export default BoardListPage;
