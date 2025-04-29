import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard';
import ListeCampus from './components/Campus/ListeCampus';
import AddCampus from './components/Campus/AddCampus';
import ModifierCampus from './components/Campus/ModifierCampus';

import ListeFilieres from './components/filieres/ListFilieres';
import AddFiliere from './components/filieres/AddFilieres';

import ListClasses from './components/Classes/ListClasses';
import AddClasses from './components/Classes/AddClasses';


export default function App() {
  return (
    <Routes>
      {/* Redirection vers login par défaut */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Route publique */}
      <Route path="/login" element={<Login />} />

      {/* Route protégée avec layout commun */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="campuses" element={<ListeCampus />} />
        <Route path="campuses/ajouter" element={<AddCampus />} />
        <Route path="campuses/modifier/:id" element={<ModifierCampus />} />
        {/* Filières */}
        <Route path="filieres" element={<ListeFilieres />} />
        <Route path="filieres/ajouter" element={<AddFiliere />} />
        {/* Classes */}
        <Route path="classes" element={<ListClasses />} />
        <Route path="classes/ajouter" element={<AddClasses />} />
      </Route>
    </Routes>
  );
}
