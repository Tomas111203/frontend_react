import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from 'react-oidc-context';

const API_BASE = window.location.origin;

export default function VideogamesManager({ onNavigateToAddGame, onEditGame }) {
  const auth = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [unauthorizedTestResult, setUnauthorizedTestResult] = useState(null);
  const [authorizedTestResult, setAuthorizedTestResult] = useState(null);

  const token = auth.user?.access_token;

  const fetchGames = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setAuthorizedTestResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/videogames`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setGames(data);
      setAuthorizedTestResult({
        status: res.status,
        count: data.length,
        message: '¡Acceso Concedido! Token JWT validado correctamente en el backend FastAPI.'
      });
    } catch (err) {
      console.error('Error fetching games:', err);
      setAuthorizedTestResult({
        status: 'Error',
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Security Verification: Test API without JWT Bearer Token
  const testUnauthorizedAccess = async () => {
    setUnauthorizedTestResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/videogames`, {
        headers: {
          'Accept': 'application/json'
          // Intentionally omitting Authorization Bearer token!
        }
      });
      const data = await res.json().catch(() => ({}));
      setUnauthorizedTestResult({
        status: res.status,
        detail: data.detail || 'Not Authenticated',
        success: res.status === 401
      });
    } catch (err) {
      setUnauthorizedTestResult({
        status: 'Error',
        detail: err.message,
        success: false
      });
    }
  };

  const handleDeleteGame = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de eliminar el videojuego "${name}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/videogames/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status} al eliminar`);
      }
      await fetchGames();
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  const filteredGames = games.filter(g => {
    const query = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(query) ||
      g.genre.toLowerCase().includes(query) ||
      g.platform.toLowerCase().includes(query) ||
      g.developer.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Security Verification Test Bench */}
      <div className="glass-card p-4 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
          <div>
            <h5 className="text-white brand-font mb-1 d-flex align-items-center gap-2">
              <i className="bi bi-shield-check text-success"></i>
              <span>Banco de Pruebas de Seguridad API (JWT OAuth2)</span>
            </h5>
            <p className="text-muted small mb-0 font-mono">
              Verifica el comportamiento del endpoint <code>GET /api/videogames</code> con y sin token de autorización.
            </p>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            <button
              onClick={fetchGames}
              className="btn btn-outline-success btn-sm font-mono d-flex align-items-center gap-1"
              disabled={loading}
            >
              <i className="bi bi-shield-lock-fill"></i>
              <span>Probar Con Token (200 OK)</span>
            </button>
            <button
              onClick={testUnauthorizedAccess}
              className="btn btn-outline-warning btn-sm font-mono d-flex align-items-center gap-1"
            >
              <i className="bi bi-shield-slash-fill"></i>
              <span>Probar Sin Token (401 Unauthorized)</span>
            </button>
          </div>
        </div>

        {/* Test Result Alerts */}
        {authorizedTestResult && (
          <div className="alert alert-success bg-success bg-opacity-10 border-success text-success font-mono small mb-2 d-flex align-items-center justify-content-between">
            <div>
              <i className="bi bi-check-circle-fill me-2"></i>
              <strong>Status {authorizedTestResult.status}:</strong> {authorizedTestResult.message} ({authorizedTestResult.count} videojuegos obtenidos)
            </div>
            <span className="badge bg-success font-mono">200 OK</span>
          </div>
        )}

        {unauthorizedTestResult && (
          <div className={`alert ${unauthorizedTestResult.success ? 'alert-danger bg-danger bg-opacity-10 border-danger text-danger' : 'alert-warning'} font-mono small mb-0 d-flex align-items-center justify-content-between`}>
            <div>
              <i className="bi bi-lock-fill me-2"></i>
              <strong>Prueba Sin Token → Status {unauthorizedTestResult.status}:</strong> Detalle: {JSON.stringify(unauthorizedTestResult.detail)}
            </div>
            <span className="badge bg-danger font-mono">HTTP 401 Bloqueado</span>
          </div>
        )}
      </div>

      {/* Main Videogames Data Card */}
      <div className="glass-card p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h4 className="text-white brand-font mb-0">Catálogo de Videojuegos (SQL DB)</h4>
            <span className="text-muted small font-mono">
              Total de registros: {games.length}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="input-group input-group-sm font-mono" style={{ maxWidth: '280px' }}>
              <span className="input-group-text bg-dark border-secondary text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Buscar por nombre, género..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={onNavigateToAddGame}
              className="cyber-btn-primary btn-sm font-mono d-flex align-items-center gap-1 text-nowrap"
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Página Agregar Videojuego</span>
            </button>
          </div>
        </div>

        {/* Videogames Table */}
        <div className="table-responsive">
          <table className="table table-cyber table-hover align-middle mb-0">
            <thead>
              <tr>
                <th># ID</th>
                <th>Nombre del Juego</th>
                <th>Atributo 1: Género</th>
                <th>Atributo 2: Plataforma</th>
                <th>Atributo 3: Año</th>
                <th>Atributo 4: Rating</th>
                <th>Atributo 5: Desarrollador</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 font-mono text-muted">
                    <div className="spinner-border spinner-border-sm text-info me-2" role="status"></div>
                    Cargando catálogo desde FastAPI SQL Database...
                  </td>
                </tr>
              ) : filteredGames.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted font-mono">
                    No se encontraron videojuegos registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                filteredGames.map((game) => (
                  <tr key={game.id}>
                    <td className="font-mono text-info fw-bold">#{game.id}</td>
                    <td className="fw-bold text-white fs-6">{game.name}</td>
                    <td>
                      <span className="badge bg-dark border border-secondary text-light font-mono">
                        {game.genre}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-dark border border-info text-info font-mono">
                        {game.platform}
                      </span>
                    </td>
                    <td className="font-mono text-muted">{game.release_year}</td>
                    <td>
                      <span className="badge bg-warning bg-opacity-10 text-warning border border-warning font-mono">
                        <i className="bi bi-star-fill me-1"></i>
                        {game.rating}
                      </span>
                    </td>
                    <td className="font-mono text-light">{game.developer}</td>
                    <td className="text-end">
                      <button
                        onClick={() => onEditGame(game)}
                        className="btn btn-outline-info btn-sm me-2 rounded-circle"
                        title="Editar Juego (Página Dedicada)"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game.id, game.name)}
                        className="btn btn-outline-danger btn-sm rounded-circle"
                        title="Eliminar Juego"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
