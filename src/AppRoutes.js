
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Do from './home/Do';
import Ad from './home/Ad';
import Tec from './home/Tec';
import UserContext from './services/UserContext';
import Usuario from './modales/usuario';
import InfoD from './pages/InfoD';
import ChatD from './pages/Chat';
import ChatT from './pages/ChT';
import WdwT from './pages/WdwT';
const AppRoutes = () => {
    const userContext = React.useContext(UserContext);
  
    return (
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/do" element={userContext.currentUser ? <Do /> : <Navigate to="/" />} />
        <Route path="/ad" element={userContext.currentUser ? <Ad /> : <Navigate to="/" />} />
        <Route path="/tec" element={userContext.currentUser ? <Tec /> : <Navigate to="/" />} />
        <Route path="/infoD" element={userContext.currentUser ? <InfoD /> : <Navigate to="/" />} />
        <Route path="/usuario" element={userContext.currentUser ? <Usuario /> : <Navigate to="/" />} />
        <Route path="/chatD" element={userContext.currentUser ? <ChatD /> : <Navigate to="/" />} />
        <Route path="/chatT" element={userContext.currentUser ? <ChatT /> : <Navigate to="/" />} />
      </Routes>
    );
  };
export default AppRoutes;
