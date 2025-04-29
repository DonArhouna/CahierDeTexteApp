# CahierDeTexteApp


# 💻 README.md – Frontend (/frontend)
# 🖥️ Cahier de Texte – Frontend React

Ce frontend React permet aux administrateurs et responsables
de gérer les campus, filières, classes, cours, ainsi que de
visualiser les rapports. Les professeurs peuvent émarger sans compte, via matricule.

## ✨ Fonctionnalités

- Connexion JWT pour responsables
- Tableau de bord (admin global)
- Interface CRUD :
  - Campus / Filières / Classes / Cours / Responsables / Professeurs
- Interface d’émargement (professeurs)
- Visualisation de rapports (mensuels / semestriels)

## 🔧 Stack technique

- React 18+
- Axios (requêtes API)
- React Router DOM
- React Icons
- CoreUI / TailwindCSS (optionnel)

## 📁 Arborescence
frontend/ ├── src/ │ ├── components/ # Composants réutilisables (navbar, sidebar) │
├── pages/ # Pages principales (Dashboard, Campus, etc.) │
├── services/ # Fichier API (Axios avec token JWT) │
├── App.js # Déclaration des routes │ └── index.js


## ▶️ Lancer l'application localement

```bash
cd frontend
npm install
npm start

🔐 Authentification
JWT stocké dans localStorage

Rafraîchissement automatique via /token/refresh/

ProtectedRoute pour protéger les routes sensibles

import api from './services/api';

api.get('/campuses/')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
