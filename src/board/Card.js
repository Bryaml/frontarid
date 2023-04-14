import React, { useState } from 'react';

import { useDrag } from 'react-dnd';
import { Modal, Button } from 'react-bootstrap';


const Card = ({ incidencia, index }) => {
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
  console.log('Incidencia card:', incidencia);
  const serverBaseUrl = "http://localhost:8080";
  const area = incidencia.area ? incidencia.area : {};
  const aula = incidencia.area ? incidencia.aula : {};
  const laboratorio = incidencia.area ? incidencia.laboratorio : {};
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
      }}
    >
   
      <h5>Área: {area.nombre ? area.nombre : 'N/A'}</h5>
      <p>Descripción: {incidencia.descripcion}</p>
      {incidencia.mediaUrl && (
        <div>
     
          <Button onClick={handleShowModal}>Más información</Button>
          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Incidencia {index + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Área: {aula.nombre || laboratorio.nombre}</p>
          <p>Descripción: {incidencia.descripcion}</p>
         
          <img src={`${serverBaseUrl}${incidencia.mediaUrl}`} alt="Incidencia" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>URL de la imagen: {`${serverBaseUrl}${incidencia.mediaUrl}`}</p>
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

