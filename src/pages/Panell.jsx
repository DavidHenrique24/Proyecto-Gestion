import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  supabase  from '../ultis/supabase';
import TiquetsPendents from '../componentes/TiquetsPendents';
import TiquetsResolts from '../componentes/TiquetsResolts';

const Panell = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  // Cargar usuarios desde Supabase
  useEffect(() => {
    const cargarUsuarios = async () => {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (error) {
        setError(error.message);
        console.error('Error al cargar usuarios:', error.message);
      } else {
        setUsuarios(data);
        console.log('Usuarios cargados:', data);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <main className="container mt-5">
      <h1>Administración de incidencias</h1>

      <div className="text-start mb-4">
        <Link to="/tiquet" className="btn btn-primary">
          Crear Nuevo Tiquet
        </Link>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}
      {usuarios.length > 0 && (
        <div className="mb-4">
          <h5>Usuarios registrados:</h5>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.email}>{usuario.email} - {usuario.rol}</li>
            ))}
          </ul>
        </div>
      )}

      <TiquetsPendents />
      <TiquetsResolts />
    </main>
  );
};

export default Panell;
