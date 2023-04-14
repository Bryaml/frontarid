import React, { useState, useEffect, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button, Modal } from 'react-bootstrap';
import UserContext from '../services/UserContext';
import Incidencia from '../modales/incidencia';
import NavbarD from '../Navbars/NavbarD';
import Column from '../board/Colum';
import api from '../services/api';
const Do = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAulaLabModal, setShowAulaLabModal] = useState(false);

  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleShowAulaLabModal = () => setShowAulaLabModal(true);
  const handleCloseAulaLabModal = () => setShowAulaLabModal(false);

  const [incidencias, setIncidencias] = useState([]);
  const { currentUser } = useContext(UserContext);
  const correoDocente = currentUser.email;

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await api.get('/incidencias/docente', {
          params: { emailDocente: correoDocente },
        });
  
        console.log('Datos recibidos:', response.data);// Mueve esta línea aquí para asegurarte de que response está inicializado.
        setIncidencias(response.data);
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
      <NavbarD
        handleShowUserModal={handleShowUserModal}
        handleShowAulaLabModal={handleShowAulaLabModal}
      />

      {/* modal incidencia*/}
      <Modal show={showAulaLabModal} onHide={handleCloseAulaLabModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar incidencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Incidencia handleClose={handleCloseAulaLabModal} />
        </Modal.Body>
      </Modal>

      <DndProvider backend={HTML5Backend}>
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
<Column
       title="Pendientes"
       incidencias={pendientes}
       isReadOnly={true}
     />
<Column
       title="Activas"
       incidencias={activas}
       isReadOnly={true}
     />
<Column
       title="Completado"
       incidencias={completadas}
       isReadOnly={true}
     />
</div>
</DndProvider>
    </>
  );
};

export default Do;


