import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiMapPin, 
  FiBook, 
  FiHome, 
  FiClipboard,
  FiBarChart2 
} from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ showNav }) => { 
  return (
    <div className={`sidenav ${showNav ? 'active' : ''}`}>
      
      <div className="nav-header">
        <Link to="/dashboard" className="logo-link"> 
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <h1>Navigation</h1>
    
      <div className="nav-section">
        <h2>Gestion</h2>
        <ul>
          <li>
            <a href="/campuses" className="nav-link">
              <FiMapPin className="nav-icon" />
              Campus
            </a>
          </li>
          <li>
            <a href="/filieres" className="nav-link">
              <FiBook className="nav-icon" />
              Filières
            </a>
          </li>
          <li>
            <a href="/responsables" className="nav-link">
              <FiUsers className="nav-icon" />
              Responsables
            </a>
          </li>
          <li>
            <a href="/classes" className="nav-link">
              <FiHome className="nav-icon" />
              Classes
            </a>
          </li>
          <li>
            <a href="/cours" className="nav-link">
              <FiClipboard className="nav-icon" />
              Cours
            </a>
          </li>
        </ul>
      </div>

      <div className="nav-section">
        <h2>Consultation</h2>
        <ul>
          <li>
            <a href="/classes" className="nav-link read-only">
              <FiHome className="nav-icon" />
              Classes
            </a>
          </li>
          
        </ul>
      </div>

      <div className="nav-section">
        <h2>Rapports</h2>
        <ul>
          <li>
            <a href="/rapports/mensuels" className="nav-link">
              <FiBarChart2 className="nav-icon" />
              Mensuels
            </a>
          </li>
          <li>
            <a href="/rapports/semestriels" className="nav-link">
              <FiBarChart2 className="nav-icon" />
              Semestriels
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;