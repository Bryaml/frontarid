import React, { useState, useEffect } from 'react';
import api from '../services/api';


const AulaLaboratorioForm = ({ handleClose, handleSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [areaId, setAreaId] = useState('');
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);

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
