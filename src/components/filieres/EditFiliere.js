// EditFiliere.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AddFilieres.css';

const EditFiliere = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    campus: '',
  });

  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des données de la filière
        const filiereResponse = await api.get(`filieres/${id}/`);
        setFormData({
          nom: filiereResponse.data.nom,
          campus: filiereResponse.data.campus, // Doit correspondre à un ID
        });

        // Récupération de la liste des campus
        const campusResponse = await api.get('campuses/');
        setCampuses(campusResponse.data.results || campusResponse.data);
      } catch (error) {
        alert("Erreur lors du chargement des données");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`filieres/${id}/`, formData);
      if (response.status === 200) {
        alert('Filière mise à jour avec succès');
        navigate('/filieres');
      }
    } catch (error) {
      alert(`Erreur: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer cette filière ?');
    if (!confirm) return;

    try {
      await api.delete(`filieres/${id}/`);
      alert('Filière supprimée avec succès');
      navigate('/filieres');
    } catch (error) {
      alert('Erreur lors de la suppression');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Modifier la Filière</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Nom de la filière :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Campus :</label>
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
          <button type="submit" className="submit-btn">Modifier</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/filieres')}>
            Annuler
          </button>
        </div>

        <div className="delete-section">
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Supprimer cette filière
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFiliere;
