import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export default function MyModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      { props.children }
    </Modal>
  );
}

MyModal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object.isRequired)
};