
import '../assets/css/Nav.css';
import AuthService from "../services/AuthService";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import React, { useState, useContext, useEffect } from "react";
import UserContext from "../services/UserContext";

const NavbarT = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
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
      <ul className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
        {/* ... */}

        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/chatT", {
                state: { user: currentUser },
                replace: true,
              });
            }}
          >
            chat
          </a>
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

export default NavbarT;
