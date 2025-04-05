import React, { useState, useEffect } from 'react';
import { useUser } from '../componentes/UserContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import supabase from '../ultis/supabase'; // Importamos el cliente Supabase

const Tiquet = () => {
  const { user } = useUser(); // Obtener usuario desde el contexto
  const [formData, setFormData] = useState({
    aula: user?.aula || '',
    grupo: user?.grupo || '',
    ordenador: '',
    descripcion: '',
    alumno: user?.email || '', // Solo mostrar email
  });

  const [error, setError] = useState('');
  const [dadesTiquets, setDadesTiquets] = useState([]);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Cargar los tiquets de la base de datos al iniciar el componente
  useEffect(() => {
    const fetchTiquets = async () => {
      const { data, error } = await supabase
        .from('tiquets') // Nombre de la tabla en Supabase
        .select('*');

      if (error) {
        console.error('Error al cargar los tiquets:', error.message);
      } else {
        setDadesTiquets(data);
      }
    };

    fetchTiquets();
  }, []);

  // Actualizar los campos del formulario cuando cambie el usuario
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      alumno: user?.email || '',
      aula: user?.aula || '',
      grupo: user?.grupo || '',
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Para no saltear campos
    if (!formData.aula || !formData.grupo || !formData.ordenador || !formData.descripcion || !formData.alumno) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const nuevoTiquet = {
      id: Math.floor(100 + Math.random() * 900), // Generar un código aleatorio
      aula: formData.aula,
      grupo: formData.grupo,
      ordenador: formData.ordenador,
      descripcion: formData.descripcion,
      alumno: formData.alumno, // Solo email
      fecha: new Date().toLocaleDateString(),
      estat: 'pendent',
    };

    // Guardar el nuevo tiquet en Supabase
    const { data, error } = await supabase
      .from('tiquets') // Nombre de la tabla en Supabase
      .insert([nuevoTiquet]);

    if (error) {
      console.error('Error al guardar el tiquet:', error.message);
      setError('Hubo un error al guardar el tiquet.');
    } else {
      // Si el tiquet se guardó correctamente, actualizar el estado
      setDadesTiquets((prevTiquets) => [...prevTiquets, data[0]]);
      setFormData({
        aula: '', // Mantener aula ingresada
        grupo: '', // Mantener grupo ingresado
        ordenador: '',
        descripcion: '',
        alumno: formData.alumno, // Mantener email
      });
      setError('');

      // Redirigir al panel después de guardar el tiquet
      navigate('/panel'); // Asegúrate de que '/panel' es la ruta del panel
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Formulario de Tiquet</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="alumno" className="form-label">Email del Alumno:</label>
          <input
            type="text"
            name="alumno"
            className="form-control"
            value={formData.alumno}
            disabled
          />
        </div>

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

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Tiquet;
