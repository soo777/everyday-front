import React, { useEffect, useState } from 'react';
import {
  Button, Icon, Input, Modal,
} from 'semantic-ui-react';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useUser from '../../hooks/useUser';
import { AddMemberModal, AlertModal } from '../common';
import useModal from '../../hooks/useModal';
import useCommon from '../../hooks/useCommon';
import useBoard from '../../hooks/useBoard';
import AuthUtil from '../../util/AuthUtil';

const axios = axiosInstance.instance;

function Member() {
  const { user, getMemberListFn } = useUser();
  const { modal, setAddMemberModalFn } = useModal();
  const { handleAlertModalFn, setAlertModalFn } = useCommon();
  const { board, setBoardHostFn } = useBoard();

  const getMemberList = async () => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    const payload = {
      params: {
        boardKey,
      },
    };

    await axios.get('/api/v1/user/board/memberList', payload).then((data) => {
      console.log(data.data.object);
      getMemberListFn(data.data.object.memberList);
      setBoardHostFn(data.data.object.host);
    });
  };

  useEffect(() => {
    getMemberList();
  }, []);

  const addMember = () => {
    setAddMemberModalFn(true);
  };

  const successAddMember = () => {
    getMemberList();
    setAlertModalFn('Info', 'add member success.');
    handleAlertModalFn(true);
  };

  return (
    <>
      <div className="middle content">
        <div>
          <div className="list header">
            <div className={ AuthUtil.getUserId() === board.boardHost ? 'float_left' : '' }>
              <h3>Member List</h3>
            </div>
            {
              AuthUtil.getUserId() === board.boardHost ? (
                <span className="plus" onClick={ addMember }>
                  <Icon name="plus" />
                </span>
              ) : null
            }
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
      <AlertModal />
      {
        modal.addMemberModal
          ? (
            <AddMemberModal
              refresh={ successAddMember }
            />
          )
          : ''
      }
    </>
  );
}

export default Member;
