import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importa useNavigate y useParams
import supabase from '../ultis/supabase'; // Importa el cliente Supabase

const EditTiquet = () => {
  const [formData, setFormData] = useState({
    aula: '',
    grupo: '',
    ordenador: '',
    descripcion: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const { codigo } = useParams(); // Obtiene el 'codigo' del tiquet desde los parámetros de la URL

  // Cargar los datos del tiquet al montar el componente
  useEffect(() => {
    const fetchTiquet = async () => {
      // Consulta el tiquet desde la base de datos usando Supabase
      const { data, error } = await supabase
        .from('tiquets') // Nombre de la tabla
        .select('*')
        .eq('id', codigo) // Filtra por el 'codigo'
        .single(); // Solo obtener un registro

      if (error) {
        console.error('Error al cargar el tiquet:', error.message);
        setError('Error al cargar el tiquet.');
      } else {
        setFormData({
          aula: data.aula,
          grupo: data.grupo,
          ordenador: data.ordenador,
          descripcion: data.descripcion,
        });
      }
    };

    fetchTiquet();
  }, [codigo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos sean completados
    if (!formData.aula || !formData.grupo || !formData.ordenador || !formData.descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Actualizar el tiquet en la base de datos
    const { data, error } = await supabase
      .from('tiquets') // Nombre de la tabla
      .update({
        aula: formData.aula,
        grupo: formData.grupo,
        ordenador: formData.ordenador,
        descripcion: formData.descripcion,
      })
      .eq('id', codigo); // Filtra por el 'codigo'

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
