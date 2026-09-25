import React from 'react';
import { useAuth } from 'react-oidc-context';

export default function Navbar() {
  const auth = useAuth();
  const user = auth.user?.profile;

  const handleLogout = () => {
    // End session in Keycloak and local OIDC context
    auth.signoutRedirect().catch(() => {
      auth.removeUser();
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-card mb-4 px-3 py-2 border-0 rounded-0 rounded-bottom">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold text-info" href="#">
          <i className="bi bi-shield-lock-fill fs-4 text-cyan"></i>
          <span className="brand-font fs-5 text-white">
            CyberLab <span className="text-info font-mono fs-6">v1.0</span>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCyber"
          aria-controls="navbarCyber"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCyber">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item ms-lg-3">
              <span className="badge bg-dark text-cyan border border-info px-2 py-1 me-2 font-mono">
                <i className="bi bi-hdd-network me-1"></i> OpenLDAP
              </span>
              <span className="badge bg-dark text-warning border border-warning px-2 py-1 me-2 font-mono">
                <i className="bi bi-key-fill me-1"></i> Keycloak 26 (RS256)
              </span>
              <span className="badge bg-dark text-success border border-success px-2 py-1 font-mono">
                <i className="bi bi-cpu-fill me-1"></i> FastAPI JWT
              </span>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {auth.isAuthenticated ? (
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center bg-dark bg-opacity-75 border border-info rounded-pill px-3 py-1">
                  <div className="rounded-circle bg-info text-dark d-flex align-items-center justify-content-center me-2 font-mono fw-bold" style={{ width: '32px', height: '32px' }}>
                    {(user?.preferred_username || user?.given_name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="lh-1 text-start">
                    <div className="fw-bold text-white small font-mono">
                      {user?.preferred_username || 'Usuario LDAP'}
                    </div>
                    <div className="text-muted text-truncate font-mono" style={{ fontSize: '0.75rem', maxWidth: '140px' }}>
                      {user?.email || 'Federado vía LDAP'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                  title="Cerrar Sesión OAuth2"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => auth.signinRedirect()}
                className="cyber-btn-primary btn-sm text-dark font-mono d-flex align-items-center gap-2"
                disabled={auth.isLoading}
              >
                <i className="bi bi-box-arrow-in-right fs-5"></i>
                <span>Iniciar Sesión OAuth2</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
