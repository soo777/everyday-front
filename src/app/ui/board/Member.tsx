import React, { useEffect, useState } from 'react';
import {
  Button, Icon, Input, Modal,
} from 'semantic-ui-react';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useUser from '../../hooks/useUser';
import { AddMemberModal } from '../common';
import useModal from '../../hooks/useModal';

const axios = axiosInstance.instance;

function Member() {
  const { user, getMemberListFn } = useUser();
  const { modal, setAddMemberModalFn } = useModal();

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
    setAddMemberModalFn(true);
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
      {
        modal.addMemberModal ? <AddMemberModal /> : ''
      }
    </>
  );
}

export default Member;
