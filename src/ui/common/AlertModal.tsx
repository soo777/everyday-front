import React, { useState } from 'react';
import {
  Button, Form, Input, Modal, Table,
} from 'semantic-ui-react';
import useCommon from '../../hooks/useCommon';

function AlertModal() {
  const { common, handleAlertModalFn } = useCommon();

  const closeModal = () => {
    handleAlertModalFn(false);
  };

  return (
    <>
      <Modal
        size="mini"
        open={ common.alertModal }
        onClose={ closeModal }
      >
        <Modal.Header>{ common.alert.header }</Modal.Header>
        <Modal.Content>
          <p>{ common.alert.content }</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ closeModal }>OK</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AlertModal;
