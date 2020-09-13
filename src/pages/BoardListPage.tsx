import React, { useEffect, useState } from 'react';
import {
  Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import useBoard from '../hooks/useBoard';
import Test from './Test';
import { CreateBoardModal } from '../ui/board';

function BoardListPage() {
  const [createModal, setCreateModal] = useState(false);

  const { boardList, getAllBoardList } = useBoard();

  const getBoardList = async () => {
    const response = await axios.get('/board').then((data) => {
      const list = data.data.object;
      console.log(list);
      getAllBoardList(list);
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
    setCreateModal(true);
  };

  return (
    <>
      <div className="sideBar">
        {
          console.log(boardList.boardList)
        }
        {
          boardList.boardList
            ? boardList.boardList.map((board:any, index:any) => (
              <div
                key={ board.id }
                onClick={ () => { clickBoard(board.id); } }
                className="boardList"
              >
                { board.boardName }
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
        createModal
          ? (
            <CreateBoardModal />
          )
          : ''
      }
    </>
  );
}

export default BoardListPage;
