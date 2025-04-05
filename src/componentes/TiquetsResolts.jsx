import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../componentes/UserContext';
import supabase from '../ultis/supabase';

const TiquetsResolts = () => {
  const [tiquetsResolts, setTiquetsResolts] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  // Cargar los tiquets resueltos desde Supabase
  const fetchTiquetsResolts = async () => {
    const { data, error } = await supabase
      .from('tiquets')
      .select('*')
      .eq('estat', 'resolt');

    if (error) {
      console.error('Error al obtener tiquets resueltos:', error.message);
    } else {
      setTiquetsResolts(data || []);
    }
  };

  useEffect(() => {
    fetchTiquetsResolts();
  }, []);

  // Eliminar un tiquet resuelto
  const eliminarTiquet = async (codigo) => {
    const { error } = await supabase
      .from('tiquets')
      .delete()
      .eq('codigo', codigo);

    if (error) {
      console.error('Error al eliminar tiquet:', error.message);
    } else {
      setTiquetsResolts((prev) =>
        prev.filter((tiquet) => tiquet.codigo !== codigo)
      );
    }
  };

  const handleVerComentarios = (codigo) => {
    localStorage.setItem('codigo_tiquet', codigo);
    navigate('/comentarios');
  };

  return (
    <div>
      <h2>Tiquets Resueltos</h2>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Fecha resuelto</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiquetsResolts.map((tiquet) => (
            <tr key={tiquet.id}>
              <td>{tiquet.id}</td>
              <td>{new Date(tiquet.fecha).toLocaleDateString()}</td>
              <td>{new Date(tiquet.fechaResuelto).toLocaleDateString()}</td>
              <td>{tiquet.aula}</td>
              <td>{tiquet.grupo}</td>
              <td>{tiquet.ordenador}</td>
              <td>{tiquet.descripcion}</td>
              <td>{tiquet.alumno}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  title="Ver comentarios"
                  onClick={() => handleVerComentarios(tiquet.codigo)}
                >
                  <i className="bi bi-chat-left-text"></i>
                </button>

                {user?.rol === 'admin' && (
                  <button
                    className="btn btn-danger"
                    title="Eliminar ticket"
                    onClick={() => eliminarTiquet(tiquet.codigo)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TiquetsResolts;
