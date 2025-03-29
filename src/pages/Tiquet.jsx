import React, { useState, useEffect } from 'react';

const Tiquet = () => {
  const [formData, setFormData] = useState({
    aula: '',
    ordenador: '',
    descripcion: '',
  });

  const [error, setError] = useState('');
  const [dadesTiquets, setDadesTiquets] = useState([]);

  useEffect(() => {
    // Cargar los tiquets guardados en localStorage
    const tiquetsGuardados = JSON.parse(localStorage.getItem('dades_tiquets')) || [];
    setDadesTiquets(tiquetsGuardados);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.aula || !formData.ordenador || !formData.descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const nuevoTiquet = {
      id: Date.now(),
      aula: formData.aula,
      ordenador: formData.ordenador,
      descripcion: formData.descripcion,
      fecha: new Date().toLocaleString(),
    };

    // Agregar el nuevo tiquet al array
    const nuevosTiquets = [...dadesTiquets, nuevoTiquet];
    setDadesTiquets(nuevosTiquets);

    // Guardar en localStorage
    localStorage.setItem('dades_tiquets', JSON.stringify(nuevosTiquets));

    console.log('Tiquet guardado:', nuevoTiquet);

    // Limpiar el formulario
    setFormData({
      aula: '',
      ordenador: '',
      descripcion: '',
    });

    setError('');
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
