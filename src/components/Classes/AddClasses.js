import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AddClasses.css';

const AddClasse = () => {
  const [formData, setFormData] = useState({
    nom: '',
    filiere: ''
  });

  const [filieres, setFilieres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilieres = async () => {
      try {
        const response = await api.get('filieres/');
        setFilieres(response.data.results || response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des filières:', error);
      }
    };

    fetchFilieres();
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
      const response = await api.post('classes/', formData);

      if (response.status === 201) {
        alert('Classe ajoutée avec succès!');
        navigate('/classes');
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
      <h2>Ajouter une Classe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de la classe:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Filière:</label>
          <select
            name="filiere"
            value={formData.filiere}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner une filière --</option>
            {filieres.map((filiere) => (
              <option key={filiere.id} value={filiere.id}>
                {filiere.nom} ({filiere.campus?.nom || 'N/A'})
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Enregistrer</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/classes')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClasse;
