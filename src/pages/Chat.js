import api from '../services/api';
import React, { useState, useEffect, useContext } from 'react';
import '../assets/css/chat.css';
import UserContext from '../services/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import WindowD from './WindowD';

const ChatD = () => {
  const location = useLocation();

  const { currentUser } = useContext(UserContext);
  console.log('currentUser:', currentUser);
  const docenteId = location.state.user.id;

  console.log(location.state.user);
  const [tecnicos, setTecnicos] = useState([]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState(null);

  const startConversation = (tecnico) => {
    setSelectedTecnico(tecnico);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const getTecnicos = async () => {
    try {
      const res = await api.get(`/incidencias/docente/${docenteId}/tecnicos`);
      setTecnicos(res.data);
      console.log("Técnicos:", res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getTecnicos();
  }, []);

  return (
    <>
      <div className="chatContainer">
        <h1>ChatD Component</h1>
        <div className="tecnicos">
          {tecnicos.map((tecnico) => (
            <div
              key={tecnico.id}
              onClick={() => startConversation(tecnico)}
            >
              {tecnico.nombres} {tecnico.apellidos}
            </div>
          ))}
        </div>
      </div>
      {isChatOpen && (
        <WindowD
          docente={currentUser}
          tecnico={selectedTecnico}
          onClose={closeChat}
        />
      )}
    </>
  );
  
};

export default ChatD;