import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comentario from '../componentes/Comentario';
import supabase from '../ultis/supabase';

export default function Comentarios() {
  const { id } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [codigoTiquet, setCodigoTiquet] = useState('');

  useEffect(() => {
    if (!id) return;

    setCodigoTiquet(id);

    const cargarComentarios = async () => {
      try {
        const { data, error } = await supabase
          .from('comentarios')
          .select('*')
          .eq('ticket_id', id);

        if (error) throw error;

        setComentarios(data || []);
      } catch (err) {
        console.error('Error al cargar comentarios:', err.message);
      }
    };

    cargarComentarios();
  }, [id]);

  // Función que agrega el comentario a la base y también actualiza estado local
  const agregarComentario = async (nuevoComentario) => {
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .insert([nuevoComentario])
        .select();  // IMPORTANTE para que devuelva data después de insertar

      if (error) throw error;

      // Actualiza comentarios agregando el nuevo que insertó supabase (data[0])
      setComentarios(prev => [...prev, data[0]]);
      return true;
    } catch (err) {
      console.error('Error al agregar comentario:', err.message);
      return false;
    }
  };

  return (
    <div className="container mt-5">
      <h1>Comentarios</h1>
      <h2 className="my-4">Código ticket: <span>{codigoTiquet}</span></h2>

      <Comentario agregarComentario={agregarComentario} codigoTiquet={codigoTiquet} />

      <div className="mt-4">
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <div key={comentario.id} className="card p-3 mt-2">
              <h5 className="text-end">
                Autor: <span>{comentario.usuario}</span>
                <span className="ms-4">{comentario.fecha}</span>
              </h5>
              <p>{comentario.comentario}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
      </div>
    </div>
  );
}
