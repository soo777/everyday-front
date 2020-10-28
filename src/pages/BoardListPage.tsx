import React, { useEffect, useState } from 'react';
import {
  Icon,
} from 'semantic-ui-react';
import useBoard from 'hooks/useBoard';
import { CreateBoardModal } from 'ui/board';
import { AppLayout } from 'ui/layout';
import { default as axiosInstance } from 'util/AxiosUtil';
import { RouteComponentProps } from 'react-router-dom';
import BoardModel from '../model/BoardModel';
import { Constant } from '../config';

const axios = axiosInstance.instance;

function BoardListPage(routesProps: RouteComponentProps) {
  // const [createModal, setCreateModal] = useState(false);

  const { board, getBoardListFn, setCreateBoardModalFn } = useBoard();

  const getBoardList = async () => {
    await axios.get('/api/v1/board').then((data) => {
      const list = data.data.object;
      console.log(list);
      getBoardListFn(list);
    });
  };

  useEffect(() => {
    getBoardList().then((r) => {});
  }, []);

  const clickBoard = (board:BoardModel) => {
    console.log(board);

    localStorage.setItem(Constant.BOARD_KEY, board.boardKey);

    routesProps.history.push('/board');
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
                onClick={ () => { clickBoard(boardList); } }
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
