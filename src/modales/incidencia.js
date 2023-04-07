import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

const Incidencia = ({ handleClose }) => {
  const location = useLocation();
  const email = location.state?.email;
  const [areas, setAreas] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedAula, setSelectedAula] = useState('');
  const [selectedLaboratorio, setSelectedLaboratorio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const fetchAreas = async () => {
      const areasResponse = await api.get('/areas');
      const aulasResponse = await api.get('/aulas');
      const laboratoriosResponse = await api.get('/laboratorios');

      setAreas(areasResponse.data);
      setAulas(aulasResponse.data);
      setLaboratorios(laboratoriosResponse.data);
    };

    fetchAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/incidencias/crear-incidencia', {
        emailDocente: email,

        areaId: selectedArea,
        nombreAula: selectedAula,
        nombreLaboratorio: selectedLaboratorio,
        descripcion: descripcion,
      });

      alert('Incidencia creada con éxito');
      console.log('Incidencia creada:', response.data);
    } catch (error) {
      alert('Error al crear la incidencia');
      console.error('Error al crear la incidencia:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <label>Área:</label>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Selecciona un área</option>
          
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>                 
          )) 
          }
        </select>
      </div>
      <div>
        <label>Aula:</label>
        <select
          value={selectedAula}
          onChange={(e) => setSelectedAula(e.target.value)}
        >
          <option value="">Selecciona un aula</option>
          {
             aulas
             .filter((aula) => aula.area && aula.area.id === Number(selectedArea))
             .map((aula) => (
               <option key={aula.id} value={aula.nombre}>
                 {aula.nombre}
               </option>
             ))
           

          }
         
        </select>
      </div>
      <div>
        <label>Laboratorio:</label>
        <select
          value={selectedLaboratorio}
          onChange={(e) => setSelectedLaboratorio(e.target.value)}
        >
          <option value="">Selecciona un laboratorio</option>
          {
         laboratorios
         .filter((lab) => {
           console.log('selectedArea:', selectedArea);
           console.log('lab.area.id:', lab.area?.id);
           return lab.area?.id === Number(selectedArea);
         })
          .map((lab) => (
            <option key={lab.id} value={lab.nombre}>
              {lab.nombre}
            </option>
          ))

          }
        </select>
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="5"
          cols="30"
        ></textarea>
      </div>
      <div>
        <button type="submit">Crear incidencia</button>
      </div>
  </form>
  
  );
};

export default Incidencia;
