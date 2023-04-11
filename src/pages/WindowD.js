import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WindowD = ({ docente, tecnico, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const [file, setFile] = useState(null);
  const chatId = `chat_${docente.id}_${tecnico.id}`;
  const [connected, setConnected] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
  
    stompClientRef.current = stompClient;
  
    stompClient.connect({}, () => {
      setConnected(true); // Conexión establecida
      stompClient.subscribe(`/topic/chat/${chatId}`, (newMessage) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(newMessage.body),
        ]);
      });
    });
  
    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
        setConnected(false); // Desconexión
      }
    };
  }, [chatId]);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/conversations/${docente.id}/${tecnico.id}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar los mensajes");
      }

      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8080/upload-file", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        return data.fileUrl;
    } else {
        throw new Error("Error al cargar el archivo");
    }
}
const sendMessage = async (e) => {
  e.preventDefault();
  if (message.trim() === '' && !file) return;

  if (file) {
      try {
          const fileUrl = await uploadFile(file);
          console.log("Archivo cargado: " + fileUrl);
          stompClientRef.current.send(
              "/app/chat/enviar-mensaje",
              {},
              JSON.stringify({
                  docenteId: docente.id,
                  tecnicoId: tecnico.id,
                  contenido: message,
                  fileUrl: fileUrl,
              })
          );
      } catch (error) {
          console.error("Error al cargar el archivo:", error);
      }
  } else {
      stompClientRef.current.send(
          "/app/chat/enviar-mensaje",
          {},
          JSON.stringify({
              docenteId: docente.id,
              tecnicoId: tecnico.id,
              contenido: message,
              fileUrl: "",
          })
      );
  }

  setMessage('');
  setFile(null); // Limpia el archivo seleccionado después de enviar el mensaje
};

  return (
    <div className="chatWindow">
      <h2>
        Chat con {tecnico.nombres} {tecnico.apellidos}
      </h2>
      <div className="messagesContainer">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.docenteId === docente.id ? 'ownMessage' : 'otherMessage'}
          >
            {msg.contenido}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí"
        />
         <input type="file" onChange={handleFileChange} />
         <button type="submit" disabled={!connected || (message.trim() === '' && !file)}>
  Enviar
</button>

      </form>
      <button onClick={onClose}>Cerrar chat</button>
    </div>
  );
};

  
  export default WindowD;