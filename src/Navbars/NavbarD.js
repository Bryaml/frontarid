import "../assets/css/Nav.css";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../services/UserContext";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useLocation, useNavigate } from "react-router-dom";

const NavbarD = ({ handleShowUserModal, handleShowAulaLabModal }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationText, setNotificationText] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(() => socket);

    const connectedCallback = (frame) => {
      console.log("Connected to notifications: " + frame);
      console.log("User email: " + currentUser.email);
    
      stompClient.subscribe(`/topic/notifications`, (notification) => {
        console.log("Notificación recibida");

        // Aquí asumimos que el texto de la notificación se encuentra en la propiedad 'body' del objeto 'notification'
        setNotificationText(notification.body);
      });
    };
    
    stompClient.connect({}, connectedCallback);
    return () => {
      stompClient.disconnect();
    };
  }, [currentUser]);

  return (
    <nav>
      <ul className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
     

        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowAulaLabModal();
            }}
          >
            Registrar incidencia
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/chatD", {
                state: { user: currentUser },
                replace: true,
              });
            }}
          >
            chat
          </a>
        </li>
        <li>
          <div className="notification-container">
            <i className="fas fa-globe"></i>
            {notificationCount > 0 && (
              <span className="notification-count">{notificationCount}</span>
            )}
          </div>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Cerrar sesión
          </a>
        </li>
        <li>
      <div className="notification-container">
        <i className="fas fa-globe"></i>
        {notificationText && (
          <span className="notification-text">{notificationText}</span>
        )}
      </div>
    </li>
      </ul>
    </nav>
  );
};

export default NavbarD;
