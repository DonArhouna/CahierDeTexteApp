import React from 'react';
import { createRoot } from 'react-dom/client'; // Import correct pour React 18
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Sélectionnez l'élément racine de votre application
const container = document.getElementById('root');

// Créez une racine React
const root = createRoot(container);

// Rendu de l'application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 */