import axios from 'axios';

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import UserContext from '../services/UserContext';
import '../assets/css/style.css';
import imagen from '../assets/img/utez.png';
import { ToastContainer, toast } from 'react-toastify';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [recoveringPassword, setRecoveringPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const user = await AuthService.login(email, password);
      setCurrentUser(user); // Update user in the context
      console.log(user);

      if (user.roles === 'docente') {
        console.log('Redirigiendo a do');
        navigate('/do',{ replace: true, state: { email: user.email }});

      } else if (user.roles === 'tecnico') {
        console.log('Redirigiendo a Tec');
        navigate('/tec',{ replace: true, state: { email: user.email }});
      } else if (user.roles === 'admin') {
        console.log('Redirigiendo a Adm');
        navigate('/ad', { replace: true, state: { user: user } });

      } else {
        console.log('Redirigiendo a Profile');
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);

      setMessage('Correo o Contraseña Incorrecta');
      toast.error("Correo o Contraseña Incorrecta");
    }
  };

  const handleRecoverPassword = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await AuthService.recoverPassword(email);
      setMessage("Se ha enviado un correo con la nueva contraseña.");
      toast.success("Se envió tu nueva contraseña por email");
    } catch (error) {
      console.error("Error al recuperar contraseña:", error);
      setMessage("Error al recuperar contraseña. Por favor, intenta de nuevo.");
      toast.error("Error al recuperar la contraseña");
    }
  };

  return (

    <>
    <div className="main-container">
      {recoveringPassword ? (
        
        <div className="form-body">
          <h4 class="text-center">Recuperar contraseña</h4>
          <form onSubmit={handleRecoverPassword}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Correo Institucional"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Enviar correo
              </button>
            </div>
          </form>
          <div className="text-center">
            <a href="#" onClick={() => setRecoveringPassword(false)}>
              Volver al inicio de sesión
            </a>
          </div>
        </div>
      ) : (

        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <img src={imagen} alt="Imagen" />

              <input type="email" class="form-control" id="email" name="email" placeholder="Correo Institucional" value={email}
                onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div class="form-group">

              <input type="password" class="form-control" id="password" name="password" placeholder="Contraseña" value={password}
                onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="text-center">
          <a href="#" onClick={() => setRecoveringPassword(true)}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
            <div className="form-group text-center">
              <button type="submit" class="btn btn-primary btn-block mt-4">Iniciar Sesión</button>
            </div>
          </form>
        </div>

      )}
      </div>
    </>
  );
};

export default LoginForm;
