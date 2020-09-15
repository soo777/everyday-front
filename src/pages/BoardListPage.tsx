import React, { useEffect, useState } from 'react';
import {
  Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import useBoard from '../hooks/useBoard';
import Test from './Test';
import { CreateBoardModal } from '../ui/board';

function BoardListPage() {
  // const [createModal, setCreateModal] = useState(false);

  const { board, getBoardListOn, setCreateBoardModalOn } = useBoard();

  const getBoardList = async () => {
    const response = await axios.get('/board').then((data) => {
      const list = data.data.object;
      console.log(list);
      getBoardListOn(list);
    });
  };

  useEffect(() => {
    getBoardList().then((r) => {});
  }, []);

  const clickBoard = (board:any) => {
    console.log(board);
  };

  const createBoard = () => {
    console.log('create board');
    // setCreateModal(true);
    setCreateBoardModalOn(true);
  };

  return (
    <>
      <div className="sideBar">
        {
          console.log(board.boardList)
        }
        {
          board.boardList
            ? board.boardList.map((boardList:any, index:any) => (
              <div
                key={ boardList.id }
                onClick={ () => { clickBoard(boardList.id); } }
                className="boardList"
              >
                { boardList.boardName }
              </div>
            ))
            : ''
        }
        <div className="create" onClick={ createBoard }>
          <Icon disabled name="plus" />
          Create Board
        </div>
      </div>

      { /* <Test /> */ }

      {
        board.createBoardModal
          ? (
            <CreateBoardModal />
          )
          : ''
      }
    </>
  );
}

export default BoardListPage;
