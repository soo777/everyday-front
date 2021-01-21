import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button, Dropdown, DropdownProps, Icon, Modal,
} from 'semantic-ui-react';
import qs from 'qs';
import { default as axiosInstance } from '../../util/AxiosUtil';
import useModal from '../../hooks/useModal';
import { Constant } from '../../config';

const axios = axiosInstance.instance;

interface Props {
  refresh:any
}

function AddMemberModal(props:Props) {
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

  const checkMember = async (memberSelect:any) => {
    const boardKey = localStorage.getItem(Constant.BOARD_KEY);

    const payload = {
      params: {
        boardKey,
        userId: memberSelect,
      },
    };

    const bool = await axios.get('/api/v1/user/member/check', payload).then((data) => {
      console.log(data);
      if (data.status) {
        if (!data.data.status) {
          return false;
        }
        return true;
      }
      return false;
    });

    return bool;
  };

  const selectUser = (event: SyntheticEvent, data: DropdownProps) => {
    const memberSelect = data.value;
    for (let i = 0; i < memberList.length; i++) {
      if (memberList[i].userId === memberSelect) {
        alert('already add user');
        return;
      }
    }

    // member 유무 체크
    checkMember(memberSelect).then((data) => {
      if (!data) {
        alert(`${memberSelect} is already a member`);
      } else {
        const member = {
          key: memberSelect,
          userId: memberSelect,
        };

        setMemberList(memberList.concat(member));
        setSearchList([]);
        setSearchInput('');
      }
    });
  };

  const addMember = async () => {
    const arr:string[] = [];

    memberList.forEach((member: any) => {
      arr.push(member.userId);
    });

    console.log(arr);

    const payload = {
      params: {
        boardKey: localStorage.getItem(Constant.BOARD_KEY),
        memberList: arr,
      },
      paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    await axios.post('/api/v1/user/board/memberList', null, payload).then((data) => {
      console.log(data);
      if (data.status === 200 && data.data.status) {
        setAddMemberModalFn(false);
        props.refresh();
      }
    });
  };

  const deleteMember = (userId:string) => {
    setMemberList(memberList.filter((member:any) => member.userId !== userId));
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
          <div className="pd_top10">
            {
              memberList.map((data:any) => (
                <div className="pd5 font15" key={ data.userId }>
                  { data.userId }
                  <span
                    className="float_right"
                    onClick={ () => deleteMember(data.userId) }
                  >
                    <Icon name="delete" />
                  </span>
                </div>
              ))
            }
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ addMember } positive>Invite</Button>
          <Button onClick={ () => setAddMemberModalFn(false) }>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AddMemberModal;
