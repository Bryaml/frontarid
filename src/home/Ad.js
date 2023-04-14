import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Usuario from '../modales/usuario';
import A from '../modales/A';
import NavbarA from '../Navbars/NavbarA';
import { useLocation } from 'react-router-dom';
import Column from '../board/Colum';
import api from '../services/api';
import UserContext from '../services/UserContext';
import { assignTechnicianToIncidencia, adminAcceptIncidencia } from '../services/api';

const Ad = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAulaLabModal, setShowAulaLabModal] = useState(false);

  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleShowAulaLabModal = () => setShowAulaLabModal(true);
  const handleCloseAulaLabModal = () => setShowAulaLabModal(false);
  const location = useLocation();
  const user = location.state ? location.state.user : { email: '', roles: '' };
  const [incidencias, setIncidencias] = useState([]);
  const { currentUser } = useContext(UserContext);
  const emailAdmin = currentUser.email;

  const handleIncidenciaDrop = async (sourceIncidencia, targetEstado) => {
    const updatedIncidencia = { ...sourceIncidencia, estado: targetEstado };
  
    // Elimina la incidencia del estado
    setIncidencias((prevIncidencias) =>
      prevIncidencias.filter((incidencia) => incidencia.id !== updatedIncidencia.id)
    );
  
    if (sourceIncidencia.estado === 'PENDIENTE' && targetEstado === 'ACTIVA') {
      try {
        await adminAcceptIncidencia(sourceIncidencia.id, emailAdmin);
      } catch (error) {
        console.error('Error al aceptar la incidencia por el administrador:', error);
        return;
      }
    } else if (sourceIncidencia.estado === 'ACTIVA' && targetEstado === 'COMPLETADA')  {
      try {
        await api.put(`/incidencias/${sourceIncidencia.id}/resolver`);
      } catch (error) {
        console.error('Error al resolver la incidencia:', error);
        return;
      }
    } else {
      try {
        await api.put(`/incidencias/${updatedIncidencia.id}`, updatedIncidencia);
      } catch (error) {
        console.error('Error al actualizar la incidencia:', error);
        return;
      }
    }
    // Agrega la incidencia actualizada al estado
    setIncidencias((prevIncidencias) => [...prevIncidencias, updatedIncidencia]);
  };
  
  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const responsePendientes = await api.get('/incidencias/admin', {
          params: { estado: 'PENDIENTE' },
        });
        const responseActivas = await api.get('/incidencias/admin', {
          params: { estado: 'ACTIVA' },
        });
        const responseCompletadas = await api.get('/incidencias/admin', {
          params: { estado: 'COMPLETADA' },
        });
  
        setIncidencias([
          ...responsePendientes.data,
          ...responseActivas.data,
          ...responseCompletadas.data,
        ]);
      } catch (error) {
        console.error('Error al obtener las incidencias:', error);
      }
    };
  
    fetchIncidencias();
  }, []);
  
  const pendientes = incidencias.filter(
    (incidencia) => incidencia.estado === 'PENDIENTE'
  );
  const activas = incidencias.filter(
    (incidencia) => incidencia.estado === 'ACTIVA'
  );
  const completadas = incidencias.filter(
    (incidencia) => incidencia.estado === 'COMPLETADA'
  );
  
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

      <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Column
          title="Pendientes"
          incidencias={pendientes}
          onDrop={(incidencia) => handleIncidenciaDrop(incidencia, 'PENDIENTE')}
        />
        <Column
          title="Activas"
          incidencias={activas}
          onDrop={(incidencia) => handleIncidenciaDrop(incidencia, 'ACTIVA')}
        />
        <Column
          title="Completado"
          incidencias={completadas}
          onDrop={(incidencia) => handleIncidenciaDrop(incidencia, 'COMPLETADA')}
        />
      </div>
    </DndProvider>



    </>
  );
};

export default Ad;
