import api from "../services/api";
import React, { useState, useEffect, useContext } from "react";
import NavbarT from "../Navbars/NavbarT";
import UserContext from "../services/UserContext";
import { useLocation } from "react-router-dom";
import WindowT from "./WdwT";

const ChT = () => {
  const location = useLocation();

  const { currentUser } = useContext(UserContext);
  console.log("currentUser:", currentUser);
  const tecnicoId = location.state.user.id;

  console.log(location.state.user);
  const [docentes, setDocentes] = useState([]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);

  const startConversation = (docente) => {
    setSelectedDocente(docente);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const getDocentes = async () => {
    try {
      const res = await api.get(`/incidencias/tecnico/${tecnicoId}/docentes`);
      setDocentes(res.data);
      console.log("Docentes:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDocentes();
  }, []);

  return (
    <>
     <NavbarT
      
      />
      <div className="chatContainer">
        <h1>ChatT Component</h1>
        <div className="docentes">
          {docentes.map((docente) => (
            <div
              key={docente.id}
              onClick={() => startConversation(docente)}
            >
              {docente.nombres} {docente.apellidos}
            </div>
          ))}
        </div>
      </div>
      {isChatOpen && (
        <WindowT
          tecnico={currentUser}
          docente={selectedDocente}
          onClose={closeChat}
        />
      )}
    </>
  );
};

export default ChT;
