import React from 'react';
import { Button, Input } from 'semantic-ui-react';

function CreateBoardModal() {
  return (
    <>
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
          <Button>취소</Button>
        </div>
      </div>
    </>
  );
}

export default CreateBoardModal;
