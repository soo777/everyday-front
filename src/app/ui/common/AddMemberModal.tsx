import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button, Dropdown, Form, Input, Modal, Segment, Select, Table,
} from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';
import useUser from '../../hooks/useUser';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useModal from '../../hooks/useModal';

const axios = axiosInstance.instance;

function AddMemberModal() {
  const { modal, setAddMemberModalFn } = useModal();

  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');

  //   { key: 'ax', value: 'ax', text: 'Aland Islands' },
  const [searchList, setSearchList] = useState<any>([]);

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

  const searchUser = async (event: SyntheticEvent, data: any) => {
    const searchParam = data.searchQuery;

    if (searchParam === '' || undefined) {
      setSearchList([]);
      return;
    }

    const payload = {
      params: {
        userId: searchParam,
      },
    };

    await axios.get('/api/v1/user/list', payload).then((data) => {
      // console.log(data);
      if (data.status) {
        const arr = data.data.object;

        const memberList = [];

        for (let i = 0; i < arr.length; i++) {
          const tempArr = { key: i, value: arr[i].userId, text: arr[i].userId };
          memberList.push(tempArr);
        }
        setSearchList(memberList);
      }
    });
  };

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
          { /* <Input */ }
          { /*  placeholder="Search user" */ }
          { /* /> */ }
          <Dropdown
            placeholder="Search User"
            search
            selection
            options={ searchList }
            noResultsMessage={ null }
            onSearchChange={ searchUser }
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
