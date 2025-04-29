import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import api from '../../services/api'; // Chemin correct vers le fichier api
import './Login.css';
import logo from '../../assets/logo.png'; // Assurez-vous d'importer votre logo

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/token/', { username, password });

      if (response.status !== 200) {
        throw new Error('Identifiants incorrects');
      }

      const { access, refresh } = response.data;

      // Stocker les tokens dans le localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Rediriger vers le tableau de bord
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion', error);
      setMessage(error.response ? error.response.data.detail : 'Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="login-card">
              <CCardHeader>
                <img src={logo} alt="Logo" className="logo" />
                <h2>Connexion</h2>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleLogin}>
                  <div className="input-group">
                    <CFormInput
                      type="text"
                      placeholder="Entrer votre nom d'utilisateur"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      icon={<CIcon icon={cilUser} />}
                    />
                  </div>
                  <div className="input-group">
                    <CFormInput
                      type="password"
                      placeholder="Entrer votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      icon={<CIcon icon={cilLockLocked} />}
                    />
                  </div>
                  <CButton type="submit" color="success" className="btn-primary">
                    Se connecter
                  </CButton>
                  {message && (
                    <CAlert color="danger" className="mt-3">
                      {message}
                    </CAlert>
                  )}
                </CForm>
                <div className="links">
                  <a href="#">Mot de passe oublié ?</a>
                  <br />
                  <a href="#">Inscrivez-vous</a>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;