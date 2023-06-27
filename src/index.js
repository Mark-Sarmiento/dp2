import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <HashRouter>
    <App />
  </HashRouter>
);