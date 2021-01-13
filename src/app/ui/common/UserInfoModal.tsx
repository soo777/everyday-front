import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, Modal, Table,
} from 'semantic-ui-react';
import useUser from '../../hooks/useUser';
import { Constant } from '../../config';
import { default as axiosInstance } from '../../util/AxiosUtil';

const axios = axiosInstance.instance;

function UserInfoModal() {
  const [memberModal, setMemberModal] = useState<boolean>(false);

  return (
    <>
      <Modal
        open={ memberModal }
        // open
        onClose={ () => { setMemberModal(false); } }
        size="tiny"
      >
        <Modal.Header>Add Member</Modal.Header>
        <Modal.Content className="h300">
          <Input
            placeholder="Search user"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ () => setMemberModal(false) } positive>Invite</Button>
          <Button onClick={ () => setMemberModal(false) }>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default UserInfoModal;
