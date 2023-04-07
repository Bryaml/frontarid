import { useState } from "react";
import '../assets/css/Nav.css';
import AuthService from "../services/AuthService";
import { useLocation, useNavigate } from 'react-router-dom';

const NavbarA = ({user, handleShowUserModal, handleShowAulaLabModal }) => {
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
      <ul className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
        {/* ... */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowUserModal();
            }}
          >
            Registrar usuario
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
            Registrar Aula/Laboratorio
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/InfoD', { replace: true, state: { user: user } });
            }}
          >
            info personal
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
        {/* ... */}
      </ul>
    </nav>
  );
};

export default NavbarA;
