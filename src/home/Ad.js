import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Usuario from '../modales/usuario';
import A from '../modales/A';
import NavbarA from '../Navbars/NavbarA';
import { useLocation } from 'react-router-dom';
const Ad = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAulaLabModal, setShowAulaLabModal] = useState(false);

  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleShowAulaLabModal = () => setShowAulaLabModal(true);
  const handleCloseAulaLabModal = () => setShowAulaLabModal(false);
  const location = useLocation();
  const user = location.state.user;

  return (
    <>
      <NavbarA user={user}
        handleShowUserModal={handleShowUserModal}
        handleShowAulaLabModal={handleShowAulaLabModal}
      />

      {/* User Modal */}
      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Usuario handleClose={handleCloseUserModal} />
        </Modal.Body>
      </Modal>

      {/* Aula/Laboratorio Modal */}
      <Modal show={showAulaLabModal} onHide={handleCloseAulaLabModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Aula/Laboratorio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <A handleClose={handleCloseAulaLabModal} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Ad;
