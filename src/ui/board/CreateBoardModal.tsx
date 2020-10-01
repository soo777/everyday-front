import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import useBoard from '../../hooks/useBoard';

function CreateBoardModal() {
  const { setCreateBoardModalFn, getBoardListFn } = useBoard();

  const [boardInput, setBoardInput] = useState('');

  const closeModal = () => {
    setCreateBoardModalFn(false);
  };

  const getBoardList = async () => {
    await axios.get('/board').then((data) => {
      const list = data.data.object;
      console.log(list);
      getBoardListFn(list);
    });
  };

  const createBoard = async () => {
    console.log(boardInput);

    const payload = {
      boardName: boardInput,
    };

    await axios.post('/board', payload).then((data) => {
      console.log(data);

      if (data.data.status === true) {
        setCreateBoardModalFn(false);

        getBoardList().then((r) => {});
      }
    });
  };

  const handleBoardInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setBoardInput(input);
  };

  return (
    <>
      <div className="dimmer">
        <div className="createModal">
          <div className="header">
            Create Board
          </div>
          <div className="content">
            <Input
              className="input"
              value={ boardInput }
              onChange={ handleBoardInput }
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="footer">
            <Button onClick={ createBoard }>확인</Button>
            <Button onClick={ closeModal }>취소</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBoardModal;
