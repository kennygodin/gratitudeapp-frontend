import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GratitudesContextProvider } from './context/GratitudeContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <GratitudesContextProvider>
        <App />
      </GratitudesContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
