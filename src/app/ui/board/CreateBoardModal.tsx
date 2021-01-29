import React, { useState } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';
import useBoard from '../../hooks/useBoard';
import { default as axiosInstance } from '../../util/AxiosUtil';

const axios = axiosInstance.instance;

function CreateBoardModal() {
  const { board, setCreateBoardModalFn, getBoardListFn } = useBoard();

  const [boardInput, setBoardInput] = useState('');

  const closeModal = () => {
    setCreateBoardModalFn(false);
  };

  const getBoardList = async () => {
    await axios.get('/api/v1/board').then((data) => {
      const list = data.data.object;
      console.log(list);
      getBoardListFn(list);
    });
  };

  const createBoard = async () => {
    const payload = {
      boardName: boardInput,
    };

    await axios.post('/api/v1/board', payload).then((data) => {
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
      <Modal
        onClose={ () => setCreateBoardModalFn(false) }
        onOpen={ () => setCreateBoardModalFn(false) }
        open={ board.createBoardModal }
        size="tiny"
      >
        <Modal.Header>Create Board</Modal.Header>
        <Modal.Content>
          <Input
            className="input"
            value={ boardInput }
            onChange={ handleBoardInput }
            placeholder="이름을 입력하세요"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Create"
            color="green"
            onClick={ createBoard }
          />
          <Button
            content="cancel"
            color="black"
            onClick={ closeModal }
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
