import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AddFilieres.css';

const AddFiliere = () => {
  const [formData, setFormData] = useState({
    nom: '',
    campus: ''
  });
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les campus pour le select
    const fetchCampuses = async () => {
      try {
        const response = await api.get('campuses/');
        setCampuses(response.data.results || response.data); // avec ou sans pagination
      } catch (error) {
        console.error('Erreur lors du chargement des campus:', error);
      }
    };

    fetchCampuses();
  }, []);

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
      const response = await api.post('filieres/', formData);

      if (response.status === 201) {
        alert('Filière ajoutée avec succès!');
        navigate('/filieres');
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
      <h2>Ajouter une Filière</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de la Filière:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Campus:</label>
          <select
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner un campus --</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.nom} - {campus.region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Enregistrer</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/filieres')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFiliere;
