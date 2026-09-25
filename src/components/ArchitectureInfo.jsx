import React from 'react';

export default function ArchitectureInfo() {
  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <div className="glass-card p-4 h-100">
          <h5 className="text-white brand-font mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-shield-lock-fill text-info"></i>
            <span>Arquitectura de Autenticación Federada</span>
          </h5>

          <p className="text-secondary small mb-3">
            Este laboratorio implementa un esquema de seguridad de <strong>Zero Trust</strong> y <strong>Single Sign-On (SSO)</strong> desacoplando el proveedor de identidad (IdP) del servidor de recursos de API:
          </p>

          <ul className="list-group list-group-flush bg-transparent font-mono small mb-4">
            <li className="list-group-item bg-transparent text-white border-secondary px-0 py-2">
              <strong className="text-info">1. OpenLDAP (`openldap2`):</strong> Almacena los usuarios estructurados en árbol LDAP (<code>ou=users,dc=example,dc=com</code>).
            </li>
            <li className="list-group-item bg-transparent text-white border-secondary px-0 py-2">
              <strong className="text-warning">2. Keycloak (`keycloak`):</strong> Configurado con <em>User Storage Provider LDAP</em>. Valida las contraseñas contra OpenLDAP y firma los tokens con su llave privada RS256.
            </li>
            <li className="list-group-item bg-transparent text-white border-secondary px-0 py-2">
              <strong className="text-primary">3. Client Application (React SPA):</strong> Usa <code>react-oidc-context</code> para gestionar la redirección OAuth2 PKCE y almacenar en memoria los JWTs.
            </li>
            <li className="list-group-item bg-transparent text-white border-secondary px-0 py-2">
              <strong className="text-success">4. Resource Server (FastAPI):</strong> Consulta dinámicamente las llaves públicas en el endpoint JWKS (<code>/certs</code>) de Keycloak para verificar la firma de cada Bearer Token entrante.
            </li>
          </ul>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="glass-card p-4 h-100">
          <h5 className="text-white brand-font mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-gear-fill text-warning"></i>
            <span>Parámetros del Realm `cybersecurity`</span>
          </h5>

          <div className="table-responsive font-mono small">
            <table className="table table-dark table-sm mb-0">
              <tbody>
                <tr>
                  <td className="text-muted">Realm Name</td>
                  <td className="text-info">cybersecurity</td>
                </tr>
                <tr>
                  <td className="text-muted">Client ID</td>
                  <td className="text-warning">fastapi-api</td>
                </tr>
                <tr>
                  <td className="text-muted">OAuth Flow</td>
                  <td className="text-white">Authorization Code + PKCE (S256)</td>
                </tr>
                <tr>
                  <td className="text-muted">Signature Alg</td>
                  <td className="text-success">RS256 (Asymmetric RSA)</td>
                </tr>
                <tr>
                  <td className="text-muted">LDAP User DN</td>
                  <td className="text-white">ou=users,dc=example,dc=com</td>
                </tr>
                <tr>
                  <td className="text-muted">FastAPI JWKS URL</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    http://keycloak:8080/realms/cybersecurity/protocol/openid-connect/certs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
