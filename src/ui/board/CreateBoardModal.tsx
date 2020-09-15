import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import useBoard from '../../hooks/useBoard';

function CreateBoardModal() {
  const { setCreateBoardModalOn } = useBoard();

  const closeModal = () => {
    console.log('close modal');
    setCreateBoardModalOn(false);
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
              placeHolder="이름을 입력하세요"
            />
          </div>
          <div className="footer">
            <Button>확인</Button>
            <Button onClick={ closeModal }>취소</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBoardModal;
