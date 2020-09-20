import React from 'react';

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
              box
            </div>
            { /* 리스트 */ }
            <div className="itemList">
              list
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
