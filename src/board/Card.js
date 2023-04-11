import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ incidencia }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { incidencia },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

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
      <strong>ID: {incidencia.id}</strong>
      <p>{incidencia.descripcion}</p>
    </div>
  );
};

export default Card;