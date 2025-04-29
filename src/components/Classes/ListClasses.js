import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import './ListClasses.css';

const ListClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    fetchClasses(page);
  }, [page]);

  const fetchClasses = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`classes/?page=${page}`);
      setClasses(response.data.results || response.data);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    } catch (error) {
      console.error("Erreur lors de la récupération des Classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette classe ?")) {
      try {
        await api.delete(`classes/${id}/`);
        fetchClasses(page);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  return (
    <div className="campus-container">
      <div className="header">
        <h2>Liste des Classes</h2>
        <Link to="/classes/ajouter" className="add-button">
          <FiPlus /> Ajouter une classe
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
                <th>Filière</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(classes || []).map((classe) => (
                <tr key={classe.id}>
                  <td>{classe.id}</td>
                  <td>{classe.nom}</td>
                  <td>{classe.filiere?.nom || 'N/A'}</td>
                  <td className="actions">
                    <Link to={`/classes/modifier/${classe.id}`} className="edit-btn">
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(classe.id)}
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

export default ListClasses;
