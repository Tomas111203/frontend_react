import React, { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

const API_BASE = window.location.origin;

export default function AddGamePage({ onNavigateToCatalog, initialData, onFinish }) {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    platform: '',
    release_year: new Date().getFullYear(),
    rating: 8.5,
    developer: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        genre: initialData.genre || '',
        platform: initialData.platform || '',
        release_year: initialData.release_year || new Date().getFullYear(),
        rating: initialData.rating || 8.5,
        developer: initialData.developer || ''
      });
    } else {
      setFormData({
        name: '',
        genre: '',
        platform: '',
        release_year: new Date().getFullYear(),
        rating: 8.5,
        developer: ''
      });
    }
    setError(null);
    setSuccessMsg(null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const isEditing = Boolean(initialData?.id);
      const url = isEditing
        ? `${API_BASE}/api/videogames/${initialData.id}`
        : `${API_BASE}/api/videogames`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.detail || `Error HTTP ${res.status} al guardar`);
      }

      const savedData = await res.json();
      setSuccessMsg(
        isEditing
          ? `¡Videojuego "${savedData.name}" actualizado exitosamente!`
          : `¡Videojuego "${savedData.name}" creado e insertado en la base de datos!`
      );

      if (onFinish) onFinish();
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-2">
      <div className="glass-card p-4 p-md-5 mx-auto" style={{ maxWidth: '850px' }}>
        {/* Navigation & Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-3 border-bottom border-secondary gap-3">
          <div>
            <span className="badge bg-info bg-opacity-10 text-info border border-info font-mono px-3 py-1 mb-2">
              <i className="bi bi-controller me-1"></i> Formulario de Registro
            </span>
            <h3 className="text-white brand-font mb-0">
              {initialData ? 'Editar Videojuego' : 'Página para Agregar Videojuego'}
            </h3>
          </div>

          <button
            onClick={onNavigateToCatalog}
            className="btn btn-outline-info font-mono btn-sm d-flex align-items-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            <span>Volver al Catálogo</span>
          </button>
        </div>

        {error && (
          <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger font-mono mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Error:</strong> {error}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success bg-success bg-opacity-10 border-success text-success font-mono mb-4 d-flex justify-content-between align-items-center">
            <div>
              <i className="bi bi-check-circle-fill me-2"></i>
              {successMsg}
            </div>
            <button
              onClick={onNavigateToCatalog}
              className="btn btn-success btn-sm font-mono ms-3"
            >
              Ir al Catálogo
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label font-mono text-cyan fw-bold">
              Nombre del Videojuego *
            </label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-info">
                <i className="bi bi-controller"></i>
              </span>
              <input
                type="text"
                name="name"
                required
                className="form-control bg-dark text-white border-secondary font-mono"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. The Legend of Zelda: Tears of the Kingdom"
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label font-mono text-muted small">
                Atributo 1: Género *
              </label>
              <input
                type="text"
                name="genre"
                required
                className="form-control bg-dark text-white border-secondary font-mono"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Ej. Action / Adventure"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label font-mono text-muted small">
                Atributo 2: Plataforma *
              </label>
              <input
                type="text"
                name="platform"
                required
                className="form-control bg-dark text-white border-secondary font-mono"
                value={formData.platform}
                onChange={handleChange}
                placeholder="Ej. Nintendo Switch, PC, PS5"
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label font-mono text-muted small">
                Atributo 3: Año de Lanzamiento *
              </label>
              <input
                type="number"
                name="release_year"
                required
                min="1970"
                max="2030"
                className="form-control bg-dark text-white border-secondary font-mono"
                value={formData.release_year}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label font-mono text-muted small">
                Atributo 4: Calificación / Rating (0.0 a 10.0) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="rating"
                required
                className="form-control bg-dark text-white border-secondary font-mono"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label font-mono text-muted small">
              Atributo 5: Desarrollador / Estudio *
            </label>
            <input
              type="text"
              name="developer"
              required
              className="form-control bg-dark text-white border-secondary font-mono"
              value={formData.developer}
              onChange={handleChange}
              placeholder="Ej. Nintendo EPD"
            />
          </div>

          <div className="d-flex justify-content-end gap-3 pt-3 border-top border-secondary">
            <button
              type="button"
              className="btn btn-outline-secondary font-mono px-4"
              onClick={onNavigateToCatalog}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cyber-btn-primary font-mono px-4 d-flex align-items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-check2-circle fs-5"></i>
                  <span>{initialData ? 'Actualizar Registro' : 'Guardar Videojuego'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
