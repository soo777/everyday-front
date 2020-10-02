import React, { useEffect, useState } from 'react';
import {
  Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import useBoard from '../hooks/useBoard';
import Test from './Test';
import { CreateBoardModal } from '../ui/board';
import { AppLayout } from '../ui/layout';

function BoardListPage() {
  // const [createModal, setCreateModal] = useState(false);

  const { board, getBoardListFn, setCreateBoardModalFn } = useBoard();

  const getBoardList = async () => {
    await axios.get('/board').then((data) => {
      const list = data.data.object;
      console.log(list);
      getBoardListFn(list);
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
    setCreateBoardModalFn(true);
  };

  return (
    <>
      <AppLayout>
        <div className="sideBar">
          { /* { */ }
          { /*  console.log(board.boardList) */ }
          { /* } */ }
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
      </AppLayout>
    </>
  );
}

export default BoardListPage;
