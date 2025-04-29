import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api'; // utilise api.js avec token
import './ListeCampus.css';

const ListeCampus = () => {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetchCampuses(page);
  }, [page]);

  const fetchCampuses = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`campuses/?page=${page}`);
      setCampuses(response.data.results); // DRF paginée
      setNext(response.data.next);
      setPrevious(response.data.previous);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des campus:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce campus ?")) {
      try {
        await api.delete(`campuses/${id}/`);
        fetchCampuses(page); // recharge la même page
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  return (
    <div className="campus-container">
      <div className="header">
        <h2>Liste des Campus</h2>
        <Link to="/campuses/ajouter" className="add-button">
          <FiPlus /> Ajouter un campus
        </Link>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <table className="campus-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Région</th>
                <th>Adresse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campuses.map((campus) => (
                <tr key={campus.id}>
                  <td>{campus.id}</td>
                  <td>{campus.nom}</td>
                  <td>{campus.region}</td>
                  <td>{campus.adresse}</td>
                  <td className="actions">
                    <Link to={`/campuses/modifier/${campus.id}`} className="edit-btn">
                      <FiEdit />
                    </Link>
                    <button 
                      onClick={() => handleDelete(campus.id)} 
                      className="delete-btn"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button 
              disabled={!previous}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            >
              Précédent
            </button>
            <span>Page {page}</span>
            <button 
              disabled={!next}
              onClick={() => setPage(prev => prev + 1)}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListeCampus;
