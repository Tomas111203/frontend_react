import React from 'react';
import { useAuth } from 'react-oidc-context';
import Navbar from './components/Navbar';
import LoginHero from './components/LoginHero';
import Dashboard from './components/Dashboard';

export default function App() {
  const auth = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        {auth.isLoading ? (
          <div className="container py-5 text-center">
            <div className="glass-card p-5 mx-auto" style={{ maxWidth: '500px' }}>
              <div className="spinner-border text-info mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
              <h4 className="text-white brand-font mb-2">Verificando Estado OAuth2...</h4>
              <p className="text-muted font-mono small mb-0">
                Consultando sesión con Keycloak e intercambiando código PKCE por Token JWT...
              </p>
            </div>
          </div>
        ) : auth.isAuthenticated ? (
          <Dashboard />
        ) : (
          <LoginHero />
        )}
      </main>

      <footer className="border-top border-secondary py-3 mt-5 glass-card rounded-0">
        <div className="container text-center font-mono small text-muted">
          <span>
            Laboratorio de Ciberseguridad &copy; {new Date().getFullYear()} — Autenticación LDAP + Keycloak + React + Bootstrap
          </span>
        </div>
      </footer>
    </div>
  );
}
