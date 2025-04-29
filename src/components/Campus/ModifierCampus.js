import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifierCampus.css';

const ModifierCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    region: '',
    adresse: ''
  });

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const response = await axios.get(`/api/campuses/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération:", error);
      }
    };
    fetchCampus();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/campuses/${id}/`, formData);
      navigate('/campuses');
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Modifier le Campus</h2>
      <form onSubmit={handleSubmit}>
        {/* Même structure que AddCampus.js */}
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
        {/* ... autres champs ... */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Mettre à jour</button>
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

export default ModifierCampus;