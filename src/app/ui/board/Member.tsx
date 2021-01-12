import React, { useEffect, useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useUser from '../../hooks/useUser';

const axios = axiosInstance.instance;

function Member() {
  const [memberModal, setMemberModal] = useState<boolean>(false);

  const { user, getMemberListFn } = useUser();

  const getMemberList = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    const payload = {
      params: {
        boardKey,
      },
    };

    await axios.get('/api/v1/user/board/memberList', payload).then((data) => {
      console.log(data.data.object);
      getMemberListFn(data.data.object);
    });
  };

  useEffect(() => {
    getMemberList();
  }, []);

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
          {
            user.memberList.map((data:any) => (
              <div className="pd5 font15">
                { data.userId }
              </div>
            ))
          }
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
