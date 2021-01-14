import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, Modal, Table,
} from 'semantic-ui-react';
import useUser from '../../hooks/useUser';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useModal from "../../hooks/useModal";

const axios = axiosInstance.instance;

function AddMemberModal() {
  const { modal, setAddMemberModalFn } = useModal();

  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');

  const getUserDetail = async () => {
    const userId = localStorage.getItem(Constant.USER_ID);

    const payload = {
      params: {
        userId,
      },
    };

    await axios.get('/api/v1/user/userDetail', payload).then((data) => {
      console.log(data);
      if (data.status) {
        setUserId(data.data.object.userId);
        setName(data.data.object.name);
      }
    });
  };

  useEffect(() => {
    getUserDetail().then((r) => {});
  }, []);

  const closeModal = () => {
    setAddMemberModalFn(false);
  };

  return (
    <>
      <Modal
        size="tiny"
        open={ modal.addMemberModal }
        onClose={ closeModal }
      >
        <Modal.Header>Add Member</Modal.Header>
        <Modal.Content className="h300">
          <Input
            placeholder="Search user"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ () => setAddMemberModalFn(false) } positive>Invite</Button>
          <Button onClick={ () => setAddMemberModalFn(false) }>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AddMemberModal;
