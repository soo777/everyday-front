import React, { useEffect, useState } from 'react';
import {
  Button,
  Form, Icon, Input, Modal,
} from "semantic-ui-react";
import axios from 'axios';
import useBoard from '../hooks/useBoard';
import Test from './Test';

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
            <div className="createModal">
              <div>
                modal
              </div>
              <Input placeHolder="이름을 입력하세요" />
              <div>
                <Button>확인</Button>
                <Button>취소</Button>
              </div>
            </div>
          )
          : ''
      }
    </>
  );
}

export default BoardListPage;
