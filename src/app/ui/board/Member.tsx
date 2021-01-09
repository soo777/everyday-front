import React from 'react';
import { Icon } from 'semantic-ui-react';

function Member() {
  const addMember = () => {
    console.log('add member');
  };

  return (
    <>
      <div className="middle content">
        <div>
          <div className="list header">
            <div className="float_left">
              <h3>Member List</h3>
            </div>
            <span className="plus" onClick={ addMember }>
              <Icon name="plus" />
            </span>
          </div>
        </div>
        <div className="list">
          <div className="pd5 font15">
            moon
          </div>
          <div className="pd5 font15">
            kim
          </div>
          <div className="pd5 font15">
            park
          </div>
          <div className="pd5 font15">
            son
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
