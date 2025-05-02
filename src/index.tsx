import 'reflect-metadata'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './presentation/components/app';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento com ID 'root' não encontrado no DOM");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);