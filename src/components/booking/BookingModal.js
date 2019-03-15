import React from 'react';
import Modal from 'react-responsive-modal';

export function BookingModal({open, closeModal}) {
  return (
    <Modal open={open} onClose={closeModal} center>
      <h2>Simple centered modal</h2>
    </Modal>
  );
}
