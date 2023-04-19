import React, { useState, useEffect, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button, Modal } from 'react-bootstrap';
import UserContext from '../services/UserContext';
import Incidencia from '../modales/incidencia';
import NavbarD from '../Navbars/NavbarD';
import Column from '../board/Colum';
import api from '../services/api';
import ChatModal from '../pages/ChatModal'
import { ToastContainer, toast } from 'react-toastify';

const Do = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAulaLabModal, setShowAulaLabModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);
  const handleShowAulaLabModal = () => setShowAulaLabModal(true);
  const handleCloseAulaLabModal = () => setShowAulaLabModal(false);
  const [incidencias, setIncidencias] = useState([]);
  const { currentUser } = useContext(UserContext);
  const correoDocente = currentUser.email;
  const [selectedTecnicoId, setSelectedTecnicoId] = useState(null);
  const [selectedIncidenciaId, setselectedIncidenciaId] = useState(null);
  
 
  useEffect(() => {
  const fetchIncidencias = async () => {
    
    try {
      const response = await api.get('/incidencias/docente', {
        params: { emailDocente: correoDocente },
      });

   
      setIncidencias(response.data);
    } catch (error) {
      console.error('Error al obtener las incidencias:', error);
    }
  };
  fetchIncidencias();
}, []);

  
const handleShowChatModal = (tecnicoId, incidenciaId) => {
  if (tecnicoId === null) {
    toast.error("Técnico no definido");
    return;
  }
  setSelectedTecnicoId(tecnicoId);
  setselectedIncidenciaId(incidenciaId); 
  setShowChatModal(true);
};

  const handleCloseChatModal = () => setShowChatModal(false);
  const pendientes = incidencias.filter(
    (incidencia) => incidencia.estado === 'PENDIENTE'
    );
    const activas = incidencias.filter(
    (incidencia) => incidencia.estado === 'ACTIVA'
    );
    const completadas = incidencias.filter(
    (incidencia) => incidencia.estado === 'COMPLETADA'
    );

    console.log("selectedTecnicoId:", selectedTecnicoId);

    return (
      <>
        <NavbarD
          handleShowUserModal={handleShowUserModal}
          handleShowAulaLabModal={handleShowAulaLabModal}
        />
  
      
        <Modal show={showAulaLabModal} onHide={handleCloseAulaLabModal}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar incidencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Incidencia handleClose={handleCloseAulaLabModal} />
          </Modal.Body>
        </Modal>
  
        <DndProvider backend={HTML5Backend}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign:'center' }}>
            <Column
              title="Pendientes"
              incidencias={pendientes}
              isReadOnly={true}
              handleShowChatModal={handleShowChatModal}
            />
            <Column
              title="Activas"
              incidencias={activas}
              isReadOnly={true}
              handleShowChatModal={handleShowChatModal}
            />
            <Column
              title="Completado"
              incidencias={completadas}
              isReadOnly={true}
              handleShowChatModal={handleShowChatModal}
            />
          </div>
        </DndProvider>
        <ChatModal
        show={showChatModal}
        handleClose={() => setShowChatModal(false)}
        tecnicoId={selectedTecnicoId}
        incidenciaId={selectedIncidenciaId} 
      />
      </>
    );
  };

export default Do;


