import React, { useState, useEffect } from 'react';
import { useUser } from '../componentes/UserContext';
import { useNavigate, useParams } from 'react-router-dom'; // Importa useNavigate y useParams

const EditTiquet = () => {
  const { user } = useUser(); // Obtener usuario desde el contexto
  const [formData, setFormData] = useState({
    aula: '',
    grupo: '',
    ordenador: '',
    descripcion: '',
  });

  const [error, setError] = useState('');
  const [dadesTiquets, setDadesTiquets] = useState([]);
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const { codigo } = useParams(); // Obtiene el 'codigo' del tiquet desde los parámetros de la URL

  useEffect(() => {
    const tiquetsGuardados = JSON.parse(localStorage.getItem('dades_tiquets')) || [];
    setDadesTiquets(tiquetsGuardados);
    const tiquetParaEditar = tiquetsGuardados.find((tiquet) => tiquet.codigo === parseInt(codigo));

    if (tiquetParaEditar) {
      setFormData({
        aula: tiquetParaEditar.aula,
        grupo: tiquetParaEditar.grupo,
        ordenador: tiquetParaEditar.ordenador,
        descripcion: tiquetParaEditar.descripcion,
        alumno: tiquetParaEditar.alumno,
      });
    }
  }, [codigo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos sean completados
    if (!formData.aula || !formData.grupo || !formData.ordenador || !formData.descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Actualizar el tiquet en el almacenamiento local
    const nuevosTiquets = dadesTiquets.map((tiquet) => {
      if (tiquet.codigo === parseInt(codigo)) {
        return {
          ...tiquet,
          aula: formData.aula,
          grupo: formData.grupo,
          ordenador: formData.ordenador,
          descripcion: formData.descripcion,
        };
      }
      return tiquet;
    });

    setDadesTiquets(nuevosTiquets);
    localStorage.setItem('dades_tiquets', JSON.stringify(nuevosTiquets));

    console.log('Tiquet editado:', formData);

    setError('');
    navigate('/panel'); // Redirigir al panel después de guardar los cambios
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Tiquet</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="aula" className="form-label">Aula:</label>
          <input
            type="text"
            name="aula"
            className="form-control"
            value={formData.aula}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="grupo" className="form-label">Grupo:</label>
          <input
            type="text"
            name="grupo"
            className="form-control"
            value={formData.grupo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ordenador" className="form-label">Ordenador:</label>
          <input
            type="text"
            name="ordenador"
            className="form-control"
            value={formData.ordenador}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditTiquet;
