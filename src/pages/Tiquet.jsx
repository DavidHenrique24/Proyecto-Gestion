import React, { useState } from 'react';

const Tiquet = () => {
  const [formData, setFormData] = useState({
    aula: '',
    ordenador: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario enviados:', formData);
  
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Formulario de Tiquet</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="aula" className="form-label">Aula:</label>
          <input
            type="text"
            id="aula"
            name="aula"
            className="form-control"
            value={formData.aula}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ordenador" className="form-label">Ordenador:</label>
          <input
            type="text"
            id="ordenador"
            name="ordenador"
            className="form-control"
            value={formData.ordenador}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Tiquet;