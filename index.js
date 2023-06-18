import React from 'react';
import ReactDOM from 'react-dom';
import '../src/pages/index.css';
import App from './src/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);