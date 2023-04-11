import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

const AulaLaboratorioForm = ({ handleClose }) => {
  const [nombre, setNombre] = useState('');

  const [areaId, setAreaId] = useState('');
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);
  const [tipo, setTipo] = useState('aula');

  // Carga las áreas desde el servidor
  useEffect(() => {
    api.get('/areas')
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las áreas:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endPoint = tipo === 'aula' ? 'aulas' : 'laboratorios';
  
    try {
      const response = await api.post(`/areas/${areaId}/${endPoint}`, {
        nombre,
        tipo,
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Area Registrada");
        handleClose(); // Cierra el modal si la operación fue exitosa
      } else {
        setError('Error al registrar el aula o laboratorio');
      }
    } catch (error) {
      toast.error("Error " + error);
      setError('Error al registrar el aula o laboratorio');
    }
  };
  
  
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="aula">Aula</option>
          <option value="laboratorio">Laboratorio</option>
        </select>
      </div>
      <div>
        <label>Área:</label>
        <select value={areaId} onChange={(e) => setAreaId(e.target.value)}>
          <option value="">Seleccione una área</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};


export default AulaLaboratorioForm ;
