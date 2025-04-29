import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import './ListFilieres.css';

const ListeFilieres = () => {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetchFilieres(page);
  }, [page]);

  const fetchFilieres = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`filieres/?page=${page}`);
      setFilieres(response.data.results || response.data);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    } catch (error) {
      console.error("Erreur lors de la récupération des filières:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette filière ?")) {
      try {
        await api.delete(`filieres/${id}/`);
        fetchFilieres(page);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  return (
    <div className="campus-container">
      <div className="header">
        <h2>Liste des Filières</h2>
        <Link to="/filieres/ajouter" className="add-button">
          <FiPlus /> Ajouter une filière
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
                <th>Campus</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filieres || []).map((filiere) => (
                <tr key={filiere.id}>
                  <td>{filiere.id}</td>
                  <td>{filiere.nom}</td>
                  <td>{filiere.campus.nom || 'N/A'}</td>
                  <td className="actions">
                    <Link to={`/filieres/modifier/${filiere.id}`} className="edit-btn">
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(filiere.id)}
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

export default ListeFilieres;
