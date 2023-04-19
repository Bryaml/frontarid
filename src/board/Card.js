import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag } from 'react-dnd';
import { Modal, Button } from 'react-bootstrap';
import { faPlus, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Colors } from 'chart.js';
import { text } from '@fortawesome/fontawesome-svg-core';

const Card = ({ incidencia, index, handleShowChatModal }) => {
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { incidencia },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const serverBaseUrl = "http://localhost:8080";
  const area = incidencia && incidencia.area ? incidencia.area : {};
  const aula = incidencia && incidencia.aula ? incidencia.aula : {};
  const laboratorio = incidencia && incidencia.laboratorio ? incidencia.laboratorio : {}
  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: isDragging ? '#ccc' : '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'grab',
        background:'#8AACEC'
        
      }}
    >

      <h5>Área: {area.nombre ? area.nombre : 'N/A'}</h5>
      <p style={{color:'white'}}>Descripción: {incidencia.descripcion}</p>
      {incidencia.mediaUrl && (
        <div>
<div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button  onClick={handleShowModal}><FontAwesomeIcon icon={faPlus} /> </Button>
          <Button onClick={() => handleShowChatModal(incidencia.tecnicoId, incidencia.id)}><FontAwesomeIcon icon={faEnvelope} /></Button>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Incidencia {index + 1}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Área: {aula.nombre || laboratorio.nombre}</p>
              <p>Descripción: {incidencia.descripcion}</p>
              {incidencia.mediaUrl && (
                <>
                  {['.mp4', '.avi', '.mov'].some(ext => incidencia.mediaUrl.endsWith(ext)) ? (
                    <video src={`${serverBaseUrl}${incidencia.mediaUrl}`} controls style={{ maxWidth: '100%', height: 'auto' }} />
                  ) : (
                    <img src={`${serverBaseUrl}${incidencia.mediaUrl}`} alt="Incidencia" style={{ maxWidth: '100%', height: 'auto' }} />
                  )}
                
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>


        </div>
      )}
    </div>

  );
};

export default Card;

