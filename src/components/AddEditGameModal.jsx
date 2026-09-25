import React, { useState, useEffect } from 'react';

export default function AddEditGameModal({ show, onHide, onSubmit, initialData }) {
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
  }, [initialData, show]);

  if (!show) return null;

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
    try {
      await onSubmit(formData);
      onHide();
    } catch (err) {
      setError(err.message || 'Error guardando videojuego');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-card border-info text-white">
          <div className="modal-header border-secondary">
            <h5 className="modal-title brand-font text-cyan">
              <i className={`bi ${initialData ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
              {initialData ? 'Editar Videojuego' : 'Nuevo Videojuego'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger font-mono small mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i> {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label font-mono small text-muted">Nombre del Videojuego *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control bg-dark text-white border-secondary font-mono"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Cyberpunk 2077"
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label font-mono small text-muted">Género (Atributo 1)</label>
                  <input
                    type="text"
                    name="genre"
                    required
                    className="form-control bg-dark text-white border-secondary font-mono"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Ej. Action RPG"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label font-mono small text-muted">Plataforma (Atributo 2)</label>
                  <input
                    type="text"
                    name="platform"
                    required
                    className="form-control bg-dark text-white border-secondary font-mono"
                    value={formData.platform}
                    onChange={handleChange}
                    placeholder="Ej. PC, PS5, Xbox"
                  />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label font-mono small text-muted">Año (Atributo 3)</label>
                  <input
                    type="number"
                    name="release_year"
                    required
                    className="form-control bg-dark text-white border-secondary font-mono"
                    value={formData.release_year}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label font-mono small text-muted">Rating (Atributo 4)</label>
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

              <div className="mb-3">
                <label className="form-label font-mono small text-muted">Desarrollador (Atributo 5)</label>
                <input
                  type="text"
                  name="developer"
                  required
                  className="form-control bg-dark text-white border-secondary font-mono"
                  value={formData.developer}
                  onChange={handleChange}
                  placeholder="Ej. CD Projekt Red"
                />
              </div>
            </div>

            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-outline-secondary font-mono" onClick={onHide} disabled={loading}>
                Cancelar
              </button>
              <button type="submit" className="cyber-btn-primary font-mono" disabled={loading}>
                {loading ? 'Guardando...' : (initialData ? 'Guardar Cambios' : 'Crear Registro')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
