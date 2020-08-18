import React from 'react';
import useBoard from '../hooks/useBoard';

function BoardListPage() {
  const { boardList } = useBoard();

  const clickBoard = (board:any) => {
    console.log(board);
  };

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
          boardList.map((board:any, index:any) => (
            <div
              key={ board }
              onClick={ () => { clickBoard(board); } }
              className="boardList"
            >
              { board }
            </div>
          ))
        }
      </div>
    </>
  );
}

export default BoardListPage;
