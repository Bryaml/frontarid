import React, { useState } from 'react';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
const Usuario = ({ handleClose, handleSubmit }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [division, setDivision] = useState('');
  const [rol, setRol] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/registro', {
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        password: password,
        telefono: telefono,
        division: division,
        rol: rol,
      });

      console.log(response.data);

      toast.success("Registro Exitosa");
      handleClose();
    } catch (error) {
      toast.error("Error " +error);
      console.error('Error al registrar:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div>
      <label>Nombres:</label>
      <input
        type="text"
        value={nombres}
        onChange={(e) => setNombres(e.target.value)}
      />
    </div>
    <div>
      <label>Apellidos:</label>
      <input
        type="text"
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div>
      <label>Teléfono:</label>
      <input
        type="text"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
    </div>
    <div>
      <label>División:</label>
      <input
        type="text"
        value={division}
        onChange={(e) => setDivision(e.target.value)}
      />
    </div>
    <div>
      <label>Rol:</label>
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="">Seleccione un rol</option>
        <option value="docente">Docente</option>
        <option value="tecnico">Técnico</option>
      </select>
    </div>
    <button type="submit" style={{ width: '100px', alignSelf: 'center' }}>Registrar</button>
  </form>
  
  );
};

export default Usuario;
