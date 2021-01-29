import React, { useEffect, useState } from 'react';
import {
  Icon,
} from 'semantic-ui-react';
import useBoard from 'app/hooks/useBoard';
import { CreateBoardModal } from 'app/ui/board';
import { AppLayout } from 'app/ui/layout';
import { default as axiosInstance } from 'app/util/AxiosUtil';
import { RouteComponentProps } from 'react-router-dom';
import BoardModel from '../model/BoardModel';
import { Constant } from '../config';

const axios = axiosInstance.instance;

function BoardListPage(routesProps: RouteComponentProps) {
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

    routesProps.history.push('/board/feed');
  };

  const createBoard = () => {
    setCreateBoardModalFn(true);
  };

  return (
    <>
      <AppLayout>
        <div className="sideBar">
          {
          board.boardList
            ? board.boardList.map((boardList:any, index:any) => (
              <div
                key={ boardList.id }
                onClick={ () => { clickBoard(boardList); } }
                className="boardList"
              >
                <div className="list">
                  { boardList.boardName }
                </div>
              </div>
            ))
            : ''
        }
          <div className="create" onClick={ createBoard }>
            <Icon disabled name="plus" />
            Create Board
          </div>
        </div>
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
