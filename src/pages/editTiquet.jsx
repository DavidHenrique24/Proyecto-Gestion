import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import supabase from '../ultis/supabase';

const EditTiquet = () => {
  // Estado local para el formulario con los campos que se van a editar
  const [formData, setFormData] = useState({
    aula: '',
    grupo: '',
    ordenador: '',
    descripcion: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Hook para obtener el codigo de la url
  const { codigo } = useParams();

  // useEffect para cargar los datos del tiquet
  useEffect(() => {
    const fetchTiquet = async () => {
      // Consulta la bd filtrando por id igual acodigo, esperando solo un registro
      const { data, error } = await supabase
        .from('tiquets')
        .select('*')
        .eq('id', codigo)
        .single();

      if (error) {
        // Si hay error en la consulta, mostrarlo en consola y guardar mensaje en estado error para mostrar al usuario
        console.error('Error al cargar el tiquet:', error.message);
        setError('Error al cargar el tiquet.');
      } else {
        // Si no hay error, actualizar el estado del formulario con los datos obtenidos para mostrar en inputs
        setFormData({
          aula: data.aula,
          grupo: data.grupo,
          ordenador: data.ordenador,
          descripcion: data.descripcion,
        });
      }
    };

    fetchTiquet(); // Ejecuta la función para cargar datos
  }, [codigo]); // Se ejecuta cuando el componente monta y cada vez que codigo cambia


  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del input modificado
    setFormData({
      ...formData, // Copia los valores actuales
      [name]: value, // Actualiza solo el campo que cambió
    });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto de recargar la página
    setError(''); // Limpia cualquier error previo

    // Actualiza el registro del tiquet en la bd
    const { error } = await supabase
      .from('tiquets')
      .update({
        aula: formData.aula,
        grupo: formData.grupo,
        ordenador: formData.ordenador,
        descripcion: formData.descripcion,
      })
      .eq('id', codigo); // Solo actualiza el tiquet con el id igual a codigo

    if (error) {
      //Si hay error muestra
      setError('Error al actualizar el tiquet.');
    } else {
      // Si esta bien, lleva al panel
      navigate(`/panel`);
    }
  };

 
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Tiquet</h1>

      {/* Si existe un error, mostrarlo en un alert */}
      {error && <div className="alert alert-danger">{error}</div>}


      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="aula" className="form-label">Aula:</label>
          <input
            type="text"
            name="aula"
            className="form-control"
            value={formData.aula} // Valor actual del campo aula
            onChange={handleChange} // Actualiza estado al cambiar
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
