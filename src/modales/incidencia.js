import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


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
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  console.log('Archivo seleccionado:', e.target.files[0]);
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasResponse = await api.get('/areas');
        const aulasResponse = await api.get('/aulas');
        const laboratoriosResponse = await api.get('/laboratorios');
  
        console.log('Areas:', areasResponse.data);
        console.log('Aulas:', aulasResponse.data);
        console.log('Laboratorios:', laboratoriosResponse.data);
  
        setAreas(areasResponse.data);
        setAulas(aulasResponse.data);
        setLaboratorios(laboratoriosResponse.data);
      } catch (error) {
        console.error('Error al obtener áreas, aulas y laboratorios:', error);
      }
    };
  
    fetchAreas();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    const incidenciaRequest = {
      emailDocente: email,
      areaId: selectedArea,
      nombreAula: selectedAula,
      nombreLaboratorio: selectedLaboratorio,
      descripcion: descripcion,
    };
  
    formData.append("emailDocente", incidenciaRequest.emailDocente);
    formData.append("areaId", incidenciaRequest.areaId);
    formData.append("nombreAula", incidenciaRequest.nombreAula);
    formData.append("nombreLaboratorio", incidenciaRequest.nombreLaboratorio);
    formData.append("descripcion", incidenciaRequest.descripcion);
  
    if (selectedFile) {
      formData.append("file", selectedFile);
      console.log("Archivo adjuntado al FormData:", selectedFile);
    }
    console.log(formData);
  
    try {
      const response = await axios.post('http://localhost:8080/incidencias/crear-incidencia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

  
      toast.success("Incidencia Creada");
      console.log('Incidencia creada:', response.data);
  
      handleClose();
    } catch (error) {
      toast.error("Error " + error.response.data);
      console.error('Error al crear la incidencia:', error.response.data);
  
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
        <label>Archivo (opcional):</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <button type="submit">Crear incidencia</button>
      </div>
  </form>
  
  );
};

export default Incidencia;