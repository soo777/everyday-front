import React from 'react';
import { Button, TextArea } from 'semantic-ui-react';

function BoardPage() {
  return (
    <>
      <div className="board">
        <div className="nav">
          sidebar
        </div>
        <div className="content">
          <div>
            { /* 입력 박스 */ }
            <div className="createItem">
              <TextArea
                placeholder="오늘 무엇을 하셨나요?"
              />
              <div className="save">
                <Button>저장</Button>
              </div>
            </div>
            { /* 리스트 */ }
            <div className="itemList">
              <div className="item">
                list
                <br />
                as
                list
                <br />
                as
              </div>
              <div className="item">
                list
              </div>
              <div className="item">
                list
              </div>
            </div>
          </div>
        </div>
        <div className="sideBar">
          sidebar
        </div>
      </div>
    </>
  );
}

export default BoardPage;
