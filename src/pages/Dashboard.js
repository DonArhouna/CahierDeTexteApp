import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import api from '../services/api'; 

const Dashboard = () => {
  const [totalCampus, setTotalCampus] = useState(0);
  const baseReference = 100;
  const [totalFilieres, setTotalFilieres] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);

  useEffect(() => {

    // Methode pour recuperer et afficher le total campus
    const fetchTotalCampus = async () => {
      try {
        const response = await api.get('campuses/');
        const total = Array.isArray(response.data)
          ? response.data.length
          : response.data.count || response.data.results?.length || 0;
        setTotalCampus(total);
        
        
      } catch (error) {
        console.error('Erreur lors de la récupération des campus:', error);
      }
    };

    fetchTotalCampus();

    // Methode pour recuperer et afficher le total Filieres
    const fetchTotalFilieres = async () => {
      try {
        const response = await api.get('filieres/');
        const total = Array.isArray(response.data)
          ? response.data.length
          : response.data.count || response.data.results?.length || 0;

        setTotalFilieres(total);

      }catch (error){
        console.error('Erreur lors de la récupération des campus:', error);
      }

    };

    fetchTotalFilieres();

    // Methode pour recuperer et afficher le total classes
    const fetchTotalClasses = async () => {
      try {
        const response = await api.get('classes/');
        const total = Array.isArray(response.data)
          ? response.data.length
          : response.data.count || response.data.results?.length || 0;

          setTotalClasses(total);

      }catch (error){
        console.error('Erreur lors de la récupération des classes:', error);
      }

    };

    fetchTotalClasses();
  }, []);

  // Calcul dynamique du pourcentage par rapport à 100
  const campusPercentage = Math.min(((totalCampus / baseReference) * 100).toFixed(1), 100);
  const filierePercentage = Math.min(((totalFilieres / baseReference) * 100).toFixed(1), 100);
  const classePercentage = Math.min(((totalClasses / baseReference) * 100).toFixed(1), 100);


  const widgets = [
    {
      icon: '📍',
      title: 'Total des Campus',
      value: totalCampus,
      trend: `${campusPercentage}%`
    },
    { icon: '🏛', 
      title: 'Total des Filières', 
      value: totalFilieres, 
      trend: `${filierePercentage}%`
    },
    { icon: '🎓', 
      title: 'Total des Classes',
      value: totalClasses, 
      trend: `${classePercentage}%` 
    },
    { icon: '📚', title: 'Total des Cours', value: '8,263', trend: '+45%' },
    { icon: '👨‍🏫', title: 'Total des Professeurs', value: '1,534', trend: '+8%' },
    { icon: '👤', title: 'Total des Responsables', value: '225', trend: '+5%' }
  ];

  return (
    <div className='dashboard'>
      <h1>Tableau de Bord</h1>
      <div className="widgets-grid">
        {widgets.map((widget, index) => (
          <div key={index} className="widget-card">
            <div className="widget-header">
              <span className="widget-icon">{widget.icon}</span>
              <span className="widget-title">{widget.title}</span>
            </div>
            <div className="widget-value">{widget.value}</div>
            <div
              className={`widget-trend ${widget.trend.startsWith('+') || widget.trend.endsWith('%') ? 'positive' : 'negative'}`}
            >
              {widget.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
