import React from 'react';
import { useAuth } from 'react-oidc-context';

export default function LoginHero() {
  const auth = useAuth();

  return (
    <div className="container py-4">
      {/* Hero Header */}
      <div className="glass-card p-4 p-md-5 mb-5 text-center position-relative overflow-hidden">
        <div className="position-absolute top-0 end-0 p-3 opacity-25">
          <i className="bi bi-shield-check display-1 text-info"></i>
        </div>

        <span className="badge bg-info bg-opacity-10 text-info border border-info px-3 py-2 rounded-pill font-mono mb-3">
          <i className="bi bi-lock-fill me-1"></i> Laboratorio de Autenticación Ciberseguridad
        </span>

        <h1 className="display-4 fw-bold text-white mb-3 brand-font">
          Inicio de Sesión <span className="text-info">LDAP + OAuth2 / OIDC</span>
        </h1>

        <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '750px' }}>
          Esta aplicación demuestra la federación de usuarios de <strong>OpenLDAP</strong> a través de <strong>Keycloak 26</strong> utilizando el estándar <strong>OAuth2 + PKCE</strong>, manejando la sesión JWT mediante la librería <code>react-oidc-context</code> y asegurando un API REST en <strong>FastAPI</strong>.
        </p>

        {auth.error && (
          <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger mx-auto mb-4 text-start font-mono" style={{ maxWidth: '700px' }}>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Error de Autenticación:</strong> {auth.error.message}
          </div>
        )}

        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
          <button
            onClick={() => auth.signinRedirect()}
            className="cyber-btn-primary btn-lg d-flex align-items-center gap-3 font-mono"
            disabled={auth.isLoading}
          >
            {auth.isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Conectando a Keycloak...</span>
              </>
            ) : (
              <>
                <i className="bi bi-key-fill fs-4"></i>
                <span>Iniciar Sesión con LDAP / OAuth2</span>
              </>
            )}
          </button>

          <a
            href="http://localhost:8081/realms/cybersecurity/.well-known/openid-configuration"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light btn-lg rounded-3 font-mono text-muted d-flex align-items-center gap-2"
          >
            <i className="bi bi-file-earmark-code"></i>
            <span>Ver Config OIDC</span>
          </a>
        </div>
      </div>

      {/* Grid of Features & Credentials */}
      <div className="row g-4 mb-5">
        {/* Test Credentials Card */}
        <div className="col-md-6 col-lg-4">
          <div className="glass-card p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-3 p-3 bg-info bg-opacity-10 text-info border border-info">
                <i className="bi bi-people-fill fs-3"></i>
              </div>
              <div>
                <h5 className="mb-0 text-white brand-font">Usuarios LDAP</h5>
                <small className="text-muted font-mono">Credenciales de prueba</small>
              </div>
            </div>

            <p className="text-secondary small mb-3">
              Los siguientes usuarios residen en el servidor <strong>OpenLDAP</strong> y se federan automáticamente a <strong>Keycloak</strong>:
            </p>

            <div className="list-group font-mono small">
              <div className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-person-fill text-info me-2"></i>
                  <strong>Alice Smith</strong>
                </div>
                <span className="badge bg-secondary">alice / alice123</span>
              </div>
              <div className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-person-fill text-info me-2"></i>
                  <strong>Bob Jones</strong>
                </div>
                <span className="badge bg-secondary">bob / bob123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Flow Card */}
        <div className="col-md-6 col-lg-4">
          <div className="glass-card p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-3 p-3 bg-warning bg-opacity-10 text-warning border border-warning">
                <i className="bi bi-diagram-3-fill fs-3"></i>
              </div>
              <div>
                <h5 className="mb-0 text-white brand-font">Flujo OAuth2 PKCE</h5>
                <small className="text-muted font-mono">Arquitectura del Lab</small>
              </div>
            </div>

            <ol className="text-secondary small ps-3 mb-0">
              <li className="mb-2">
                <strong className="text-white">React Frontend</strong> solicita login mediante <code>react-oidc-context</code>.
              </li>
              <li className="mb-2">
                <strong className="text-white">Keycloak</strong> autentica las credenciales contra <strong>OpenLDAP</strong>.
              </li>
              <li className="mb-2">
                Keycloak emite un <strong>Token JWT RS256</strong> con claims y firma digital.
              </li>
              <li className="mb-0">
                <strong className="text-white">FastAPI</strong> valida la firma del token mediante el endpoint JWKS público.
              </li>
            </ol>
          </div>
        </div>

        {/* Stack Technologico Card */}
        <div className="col-md-12 col-lg-4">
          <div className="glass-card p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success border border-success">
                <i className="bi bi-cpu-fill fs-3"></i>
              </div>
              <div>
                <h5 className="mb-0 text-white brand-font">Stack Tecnológico</h5>
                <small className="text-muted font-mono">Tecnologías integradas</small>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-dark border border-info text-info p-2 font-mono">
                <i className="bi bi-filetype-jsx me-1"></i> React 19
              </span>
              <span className="badge bg-dark border border-primary text-primary p-2 font-mono">
                <i className="bi bi-bootstrap-fill me-1"></i> Bootstrap 5
              </span>
              <span className="badge bg-dark border border-success text-success p-2 font-mono">
                <i className="bi bi-code-square me-1"></i> react-oidc-context
              </span>
              <span className="badge bg-dark border border-warning text-warning p-2 font-mono">
                <i className="bi bi-shield-check me-1"></i> Keycloak 26
              </span>
              <span className="badge bg-dark border border-danger text-danger p-2 font-mono">
                <i className="bi bi-hdd-network me-1"></i> OpenLDAP
              </span>
              <span className="badge bg-dark border border-info text-info p-2 font-mono">
                <i className="bi bi-lightning-charge me-1"></i> FastAPI + Postgres
              </span>
            </div>

            <p className="text-muted small mb-0">
              Diseño responsivo optimizado para pruebas en tiempo real de endpoints REST protegidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
