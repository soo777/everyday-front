import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button, Dropdown, DropdownProps, Modal,
} from 'semantic-ui-react';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useModal from '../../hooks/useModal';

const axios = axiosInstance.instance;

function AddMemberModal() {
  const { modal, setAddMemberModalFn } = useModal();

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchList, setSearchList] = useState<any>([]);
  const [memberList, setMemberList] = useState<any>([]);

  useEffect(() => {
  }, []);

  const searchUser = async (event: SyntheticEvent, data: any) => {
    const searchParam = data.searchQuery;

    setSearchInput(searchParam);

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

  const selectUser = (event: SyntheticEvent, data: DropdownProps) => {
    for (let i = 0; i < memberList.length; i++) {
      if (memberList[i].userId === data.value) {
        alert('already add user');
        return;
      }
    }

    const member = {
      key: data.value,
      userId: data.value,
    };

    setMemberList(memberList.concat(member));
    setSearchList([]);
    setSearchInput('');
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
          <Dropdown
            placeholder="Search User"
            search
            selection
            options={ searchList }
            noResultsMessage={ null }
            onSearchChange={ searchUser }
            onChange={ selectUser }
            value={ searchInput }
          />
          <div>
            {
              memberList.map((data:any) => (
                <div className="pd5" key={ data.userId }>
                  { data.userId }
                </div>
              ))
            }
          </div>
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
