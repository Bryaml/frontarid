import "../assets/css/Nav.css";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../services/UserContext";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useLocation, useNavigate } from "react-router-dom";

const NavbarD = ({user,  handleShowUserModal, handleShowAulaLabModal }) => {
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



  return (
    <nav>
      <ul className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
      <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/do', { replace: true, state: { user: user } });
            }}
          >
            Home
          </a>
        </li>

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
   
      </ul>
    </nav>
  );
};

export default NavbarD;
