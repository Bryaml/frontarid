import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Column = ({ title, incidencias, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item) => {
      onDrop(item.incidencia);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  console.log("Incidencias en columna:", title, incidencias);

  return (
    <div
      ref={drop}
      style={{
        minWidth: '300px',
        minHeight: '200px',
        padding: '16px',
        backgroundColor: isOver ? '#f0f0f0' : '#ffffff',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    >
      <h3>{title}</h3>
      {incidencias.map((incidencia, index) => (
        <Card key={incidencia.id} incidencia={incidencia} index={index} />
      ))}
    </div>
  );
};

export default Column;
