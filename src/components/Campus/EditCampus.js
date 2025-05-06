import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AddCampus.css'; 

const EditCampus = () => {
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
        const response = await api.get(`campuses/${id}/`);
        setFormData(response.data);
      } catch (error) {
        alert('Erreur lors de la récupération du campus');
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`campuses/${id}/`, formData);
      if (response.status === 200) {
        alert('Campus mis à jour avec succès');
        navigate('/campuses');
      }
    } catch (error) {
      alert(`Erreur: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer ce campus ?');
    if (!confirm) return;

    try {
      await api.delete(`campuses/${id}/`);
      alert('Campus supprimé avec succès');
      navigate('/campuses');
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="form-container">
      <h2>Modifier le Campus</h2>
      <form onSubmit={handleUpdate}>
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
          <button type="submit" className="submit-btn">Modifier</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/campuses')}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCampus;
