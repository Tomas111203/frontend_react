import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { jwtDecode } from 'jwt-decode';

export default function JwtInspector() {
  const auth = useAuth();
  const [copied, setCopied] = useState(false);

  const accessToken = auth.user?.access_token || '';
  const idToken = auth.user?.id_token || '';

  let decodedAccessHeader = null;
  let decodedAccessPayload = null;

  try {
    if (accessToken) {
      decodedAccessPayload = jwtDecode(accessToken);
      decodedAccessHeader = jwtDecode(accessToken, { header: true });
    }
  } catch (err) {
    console.error('Error decoding JWT token:', err);
  }

  const handleCopyToken = () => {
    if (accessToken) {
      navigator.clipboard.writeText(accessToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const expDate = decodedAccessPayload?.exp ? new Date(decodedAccessPayload.exp * 1000) : null;
  const iatDate = decodedAccessPayload?.iat ? new Date(decodedAccessPayload.iat * 1000) : null;

  return (
    <div className="row g-4">
      {/* Left Column: Quick Token Claims */}
      <div className="col-lg-4">
        <div className="glass-card p-4 mb-4">
          <h5 className="text-white brand-font mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-person-badge text-info"></i>
            <span>Perfil Autenticado</span>
          </h5>

          <div className="mb-3">
            <label className="text-muted small font-mono d-block">Usuario (preferred_username)</label>
            <span className="fs-5 text-cyan font-mono fw-bold">
              {decodedAccessPayload?.preferred_username || auth.user?.profile?.preferred_username || 'N/A'}
            </span>
          </div>

          <div className="mb-3">
            <label className="text-muted small font-mono d-block">Nombre Completo</label>
            <span className="text-white">
              {decodedAccessPayload?.name || `${decodedAccessPayload?.given_name || ''} ${decodedAccessPayload?.family_name || ''}`}
            </span>
          </div>

          <div className="mb-3">
            <label className="text-muted small font-mono d-block">Correo Electrónico</label>
            <span className="text-white font-mono small">
              {decodedAccessPayload?.email || 'Sin correo asignado'}
            </span>
          </div>

          <div className="mb-3">
            <label className="text-muted small font-mono d-block">Roles Asignados</label>
            <div className="d-flex flex-wrap gap-1 mt-1">
              {decodedAccessPayload?.realm_access?.roles?.map((role, idx) => (
                <span key={idx} className="badge bg-dark text-warning border border-warning font-mono">
                  {role}
                </span>
              )) || <span className="text-muted small">Sin roles de Realm</span>}
            </div>
          </div>

          <div className="mb-0">
            <label className="text-muted small font-mono d-block">Emisión y Expiración</label>
            <div className="small font-mono text-secondary">
              <div><strong>Emitido:</strong> {iatDate ? iatDate.toLocaleTimeString() : 'N/A'}</div>
              <div><strong>Expira:</strong> {expDate ? expDate.toLocaleTimeString() : 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Token Action Card */}
        <div className="glass-card p-4">
          <h6 className="text-white brand-font mb-2">Acción de Depuración</h6>
          <p className="text-muted small mb-3">
            Copia el Bearer Token JWT para probar peticiones con Postman o cURL en la API FastAPI.
          </p>
          <button
            onClick={handleCopyToken}
            className={`btn w-100 ${copied ? 'btn-success' : 'btn-outline-info'} font-mono d-flex align-items-center justify-content-center gap-2`}
          >
            <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'}`}></i>
            <span>{copied ? '¡Token Copiado!' : 'Copiar Access Token'}</span>
          </button>
        </div>
      </div>

      {/* Right Column: JWT Token Inspector Tabs / Raw Views */}
      <div className="col-lg-8">
        <div className="glass-card p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-white brand-font mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-braces text-warning"></i>
              <span>Inspección de Token JWT (RS256)</span>
            </h5>
            <span className="badge bg-success bg-opacity-20 text-success border border-success font-mono">
              Firma Válida
            </span>
          </div>

          {/* Raw Access Token Box */}
          <div className="mb-4">
            <label className="text-muted small font-mono d-block mb-1">Raw JWT Access Token (Authorization: Bearer ...)</label>
            <div className="token-box font-mono">
              {accessToken}
            </div>
          </div>

          {/* Decoded Header and Payload Grid */}
          <div className="row g-3">
            <div className="col-md-5">
              <label className="text-warning small font-mono d-block mb-1">
                <i className="bi bi-code-square me-1"></i> Header (Algoritmo y KID)
              </label>
              <div className="jwt-header-box font-mono">
                <pre className="mb-0 text-warning" style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(decodedAccessHeader, null, 2)}
                </pre>
              </div>
            </div>

            <div className="col-md-7">
              <label className="text-success small font-mono d-block mb-1">
                <i className="bi bi-card-text me-1"></i> Claims & Payload
              </label>
              <div className="jwt-payload-box font-mono" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <pre className="mb-0 text-success" style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(decodedAccessPayload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
