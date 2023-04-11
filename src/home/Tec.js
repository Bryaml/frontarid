
import React, { useState, useEffect, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../board/Colum';

import api from '../services/api';
import UserContext from '../services/UserContext';
import { assignTechnicianToIncidencia } from '../services/api';
import NavbarT from '../Navbars/NavbarT';

const TecnicoDashboard = () => {
  const [incidencias, setIncidencias] = useState([]);
  const { currentUser } = useContext(UserContext);
  const correoTecnico = currentUser.email;

  const handleIncidenciaDrop = async (sourceIncidencia, targetEstado) => {
    const updatedIncidencia = { ...sourceIncidencia, estado: targetEstado };
  
    // Elimina la incidencia del estado
    setIncidencias((prevIncidencias) =>
      prevIncidencias.filter((incidencia) => incidencia.id !== updatedIncidencia.id)
    );
  
    if (sourceIncidencia.estado === 'PENDIENTE' && targetEstado === 'ACTIVA') {
      try {
        await assignTechnicianToIncidencia(sourceIncidencia.id, correoTecnico);
      } catch (error) {
        console.error('Error al asignar el técnico a la incidencia:', error);
        return;
      }
    } else if (sourceIncidencia.estado === 'ACTIVA' && targetEstado === 'COMPLETADA') {
      try {
        await api.put(`/incidencias/${sourceIncidencia.id}/resolver`);
      } catch (error) {
        console.error('Error al resolver la incidencia:', error);
        return;
      }
    } else {
      // Actualiza la incidencia en el servidor
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
        const responsePendientes = await api.get('/incidencias', {
          params: { estado: 'PENDIENTE' },
        });
        const responseActivas = await api.get('/incidencias', {
          params: { estado: 'ACTIVA', emailTecnico: correoTecnico },
        });
        const responseCompletadas = await api.get('/incidencias', {
          params: { estado: 'COMPLETADA', emailTecnico: correoTecnico },
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
       <NavbarT
      
      />

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


export default TecnicoDashboard;
