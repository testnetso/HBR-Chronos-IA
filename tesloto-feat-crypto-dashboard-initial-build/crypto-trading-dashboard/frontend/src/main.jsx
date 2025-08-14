import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './i18n'; // Initialize i18next
import './styles/global.css'; // Import global styles

const root = createRoot(document.getElementById('root'));

import { ThemeProvider } from './context/ThemeContext';

root.render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);
