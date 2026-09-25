import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { jwtDecode } from 'jwt-decode';
import VideogamesManager from './VideogamesManager';
import AddGamePage from './AddGamePage';
import JwtInspector from './JwtInspector';
import ArchitectureInfo from './ArchitectureInfo';

export default function Dashboard() {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState('catalog');
  const [editingGameData, setEditingGameData] = useState(null);

  const token = auth.user?.access_token;
  const username = auth.user?.profile?.preferred_username || auth.user?.profile?.name || 'Usuario LDAP';

  // REQUIREMENT: Print JWT to browser console every time page/tab changes!
  useEffect(() => {
    console.log(
      `%c[JWT SECURITY TRACKER] 📄 Cambio de página -> Pestaña Activa: "${activeTab.toUpperCase()}"`,
      'color: #00f0ff; background: #0c1322; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 13px; border: 1px solid #00f0ff;'
    );

    if (token) {
      console.log('%c🔑 Raw Access Token (Bearer JWT):', 'color: #10b981; font-weight: bold; font-size: 12px;');
      console.log(token);

      try {
        const decoded = jwtDecode(token);
        console.log('%c📋 Claims Decoded Payload:', 'color: #f59e0b; font-weight: bold; font-size: 12px;', decoded);
      } catch (err) {
        console.error('Error decodificando token:', err);
      }
    } else {
      console.warn('⚠️ No hay token JWT disponible en la sesión actual.');
    }
  }, [activeTab, token]);

  const handleNavigateToAddGame = () => {
    setEditingGameData(null);
    setActiveTab('add-game');
  };

  const handleEditGame = (game) => {
    setEditingGameData(game);
    setActiveTab('add-game');
  };

  return (
    <div className="container py-3">
      {/* Session Welcome Header */}
      <div className="glass-card p-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success bg-opacity-10 text-success border border-success font-mono px-3 py-1 mb-2">
            <span className="status-dot status-dot-active me-2"></span>
            Sesión LDAP / OAuth2 Activa
          </span>
          <h2 className="text-white brand-font mb-1">
            Bienvenido, <span className="text-cyan">{username}</span>
          </h2>
          <p className="text-muted small mb-0 font-mono">
            Has iniciado sesión mediante Keycloak 26 federado con OpenLDAP.
          </p>
        </div>

        {/* Tab Controls */}
        <ul className="nav nav-pills glass-card p-1 border-secondary">
          <li className="nav-item">
            <button
              className={`nav-link font-mono small d-flex align-items-center gap-2 ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <i className="bi bi-controller"></i>
              <span>Catálogo & API</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link font-mono small d-flex align-items-center gap-2 ${activeTab === 'add-game' ? 'active' : ''}`}
              onClick={() => {
                setEditingGameData(null);
                setActiveTab('add-game');
              }}
            >
              <i className="bi bi-plus-circle"></i>
              <span>{editingGameData ? 'Editar Juego' : 'Página Agregar Juego'}</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link font-mono small d-flex align-items-center gap-2 ${activeTab === 'jwt' ? 'active' : ''}`}
              onClick={() => setActiveTab('jwt')}
            >
              <i className="bi bi-code-slash"></i>
              <span>Inspector JWT</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link font-mono small d-flex align-items-center gap-2 ${activeTab === 'arch' ? 'active' : ''}`}
              onClick={() => setActiveTab('arch')}
            >
              <i className="bi bi-diagram-3"></i>
              <span>Arquitectura</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Dynamic Page Content */}
      <div className="tab-content">
        {activeTab === 'catalog' && (
          <VideogamesManager
            onNavigateToAddGame={handleNavigateToAddGame}
            onEditGame={handleEditGame}
          />
        )}
        {activeTab === 'add-game' && (
          <AddGamePage
            initialData={editingGameData}
            onNavigateToCatalog={() => setActiveTab('catalog')}
            onFinish={() => setEditingGameData(null)}
          />
        )}
        {activeTab === 'jwt' && <JwtInspector />}
        {activeTab === 'arch' && <ArchitectureInfo />}
      </div>
    </div>
  );
}
