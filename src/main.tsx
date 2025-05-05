import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Or HashRouter if using GitHub Pages
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Or <HashRouter> if needed */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
