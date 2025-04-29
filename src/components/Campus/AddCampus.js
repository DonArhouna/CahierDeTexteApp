import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';
import './AddCampus.css';

const AddCampus = () => {
  const [formData, setFormData] = useState({
    nom: '',
    region: '',
    adresse: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Vous devez vous connecter pour effectuer cette action');
      navigate('/login');
      return;
    }

    try {
      const response = await api.post('campuses/', formData); // ✅ pas besoin du header ici

      if (response.status === 201) {
        alert('Campus créé avec succès!');
        navigate('/campuses');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Session expirée, veuillez vous reconnecter');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      } else {
        alert(`Erreur: ${error.response?.data?.detail || error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter un Campus</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Région:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Enregistrer</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/campuses')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCampus;