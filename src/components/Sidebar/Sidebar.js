import { useState, useRef, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../utils/jwtUtils'
import './Sidebar.css';

const Sidebar = ({ toggleNav }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Decode token au chargement
    const token = localStorage.getItem('access_token');
    if (token) {
      const payload = parseJwt(token);
      setUser({
        nom: payload?.nom || 'Utilisateur',
        prenom: payload?.prenom || '',
        role: payload?.role || 'Admin',
      });
    }
  }, []);

  // Fermer le menu dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className='sidebar'>
      <GiHamburgerMenu 
        onClick={toggleNav} 
        className="hamburger-icon"
      />
      
      <div className="user-menu" ref={dropdownRef}>
        <div 
          className="user-icon-container"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FiUser className="user-icon" />
        </div>
        
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-user-info">
              <strong>{user.prenom} {user.nom}</strong>
              <small>{user.role}</small>
            </div>
            <hr />
            <button onClick={handleLogout} className="dropdown-item">
              <FiLogOut className="dropdown-icon" />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
