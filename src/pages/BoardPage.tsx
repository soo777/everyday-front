import React from 'react';
import {
  Button, Header, Icon, TextArea,
} from 'semantic-ui-react';
import { Item } from '../ui';

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
              <Item />
              <Item />
              <Item />
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
