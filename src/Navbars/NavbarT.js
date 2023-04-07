
import '../assets/css/Nav.css';
import AuthService from "../services/AuthService";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";


const NavbarT = ({user, handleShowUserModal, handleShowAulaLabModal }) => {
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
              navigate('/ChatT', { replace: true, state: { user: user } });
            }}
          >
            chat
          </a>
        </li>
        {/* ... */}
      </ul>
    </nav>
  );
};

export default NavbarT;
