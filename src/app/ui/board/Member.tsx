import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

function Member() {
  const [memberModal, setMemberModal] = useState<boolean>(false);

  const addMember = () => {
    console.log('add member');
    setMemberModal(true);
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

      <Modal
        open={ memberModal }
        onClose={ () => { setMemberModal(false); } }
        header="Add Member"
        content="Call Benjamin regarding the reports."
        actions={ ['Close'] }
      />
    </>
  );
}

export default Member;
