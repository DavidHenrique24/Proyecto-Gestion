import React, { useState, useEffect } from 'react';
import { useUser } from '../componentes/UserContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../ultis/supabase';

const Tiquet = () => {
  const { user } = useUser();

  // Estado para manejar los datos del formulario 
  const [formData, setFormData] = useState({
    aula: user?.aula || '',          
    grupo: user?.grupo || '',         
    ordenador: '',                  
    descripcion: '',                  
    alumno: user?.email || '',      
  });

  const [error, setError] = useState('');
  const [dadesTiquets, setDadesTiquets] = useState([]);
  // Hook para redirigir a otras rutas dentro de la app
  const navigate = useNavigate();

  // Efecto que se ejecuta al montar el componente para cargar los tiquets desde Supabase
  useEffect(() => {
    const fetchTiquets = async () => {
      const { data, error } = await supabase.from('tiquets').select('*');
      if (error) {
        // Si hay error, lo mostramos en consola
        console.error('Error al cargar los tiquets:', error.message);
        return;
      }
      // Si no hay error, guardamos los datos en el estado
      setDadesTiquets(data);
    };
    fetchTiquets();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Efecto que actualiza los campos dependientes del usuario cuando este cambia
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      alumno: user?.email || '',  // Actualiza email alumno
      aula: user?.aula || '',     // Actualiza aula
      grupo: user?.grupo || '',   // Actualiza grupo
    }));
  }, [user]); // Se ejecuta cada vez que cambia 'user'

  // Función para manejar cambios en cualquier campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene nombre y valor del input modificado
    setFormData(prev => ({ ...prev, [name]: value })); // Actualiza solo ese campo en formData
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del form (recarga página)
    setError('');       // Limpia errores previos

    // Validación simple: comprueba que ningún campo esté vacío
    if (!formData.aula || !formData.grupo || !formData.ordenador || !formData.descripcion || !formData.alumno) {
      setError('Todos los campos son obligatorios.');
      return; // Sale de la función si hay algún campo vacío
    }

    // Construcción del nuevo tiquet con los datos del formulario
    const nuevoTiquet = {
      id: Math.floor(100 + Math.random() * 900), // ID aleatorio entre 100 y 999
      aula: formData.aula,
      grupo: formData.grupo,
      ordenador: formData.ordenador,
      descripcion: formData.descripcion,
      alumno: formData.alumno,
      fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      estat: 'pendent', // Estado inicial del tiquet
    };

    // Inserta el nuevo tiquet en la tabla 'tiquets' de Supabase
    const { data, error } = await supabase.from('tiquets').insert([nuevoTiquet]);

    if (error) {
      // Si hay error en la inserción, se muestra y se actualiza el estado de error
      console.error('Error al guardar el tiquet:', error.message);
      setError('Hubo un error al guardar el tiquet.');
      return;
    }

    // Si se guarda correctamente, se añade a la lista local de tiquets
if (data && data.length > 0) {
  setDadesTiquets(prev => [...prev, data[0]]);
}


    // Limpia los campos del formulario excepto el email del alumno (que es fijo)
    setFormData({
      aula: '',
      grupo: '',
      ordenador: '',
      descripcion: '',
      alumno: formData.alumno,
    });

    // Redirige a la página del panel después de guardar el tiquet
    navigate('/panel');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Formulario de Tiquet</h1>

      {/*Si el error esta, lo muestraa */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Campo email alumno deshabilitado para que no se modifique */}
        <div className="mb-3">
          <label htmlFor="alumno" className="form-label">Email del Alumno:</label>
          <input type="text" name="alumno" className="form-control" value={formData.alumno} disabled />
        </div>

        <div className="mb-3">
          <label htmlFor="aula" className="form-label">Aula:</label>
          <input type="text" name="aula" className="form-control" value={formData.aula} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="grupo" className="form-label">Grupo:</label>
          <input type="text" name="grupo" className="form-control" value={formData.grupo} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="ordenador" className="form-label">Ordenador:</label>
          <input type="text" name="ordenador" className="form-control" value={formData.ordenador} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea name="descripcion" className="form-control" rows="3" value={formData.descripcion} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Tiquet;
