// src/App.tsx
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/notes" replace /> : <LoginPage />}
        />

        {/* Note */}
        <Route
          path="/notes"
          element={isAuthenticated ? <NotesPage /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all: reindirizza in base allo stato di autenticazione */}
        <Route
          path="*"
          element={
            isAuthenticated
              ? <Navigate to="/notes" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
