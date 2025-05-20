import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import Comentario from '../componentes/Comentario'; 
import supabase from '../ultis/supabase'; 

export default function Comentarios() {
  const { id } = useParams(); //agarra la id del url
  const [comentarios, setComentarios] = useState([]);
  const [codigoTiquet, setCodigoTiquet] = useState(''); 

  // useEffect para cargar los comentarios cuando el componente se monta o cambia el id del ticket
  useEffect(() => {
    //Si no hay usuario, pa atras mi loco
    if (!id) return;

    // Actualiza el estado con el id del ticket actual
    setCodigoTiquet(id);

    // Función async para cargar los cometarios de la bd
    const cargarComentarios = async () => {
      try {
        // Consulta la tabla comentarios filtrando por el  ticket_id igual a id
        const { data, error } = await supabase
          .from('comentarios')
          .select('*')
          .eq('ticket_id', id);

        // Si hay error, lo lanza para que sea capturado en el catch
        if (error) throw error;
        // Actualiza el estado con los comentarios recibidos, o un array vacío si no hay datos
        setComentarios(data || []);
      } catch (err) {
        // En caso de error, lo muestra por consola
        console.error('Error al cargar comentarios:', err.message);
      }
    };

    // Llama a la función para cargar comentarios
    cargarComentarios();
  }, [id]); // Se ejecuta cuando cambia id

  // Funcion async para agregar un nuevo comentario a la bd
  const agregarComentario = async (nuevoComentario) => {
    try {
      // Inserta el nuevo comentario en la tabla comentarios
      // .select() al final hace que devuelva el nuevo registro insertado con todos sus campos (incluido id generado)
      const { data, error } = await supabase
        .from('comentarios')
        .insert([nuevoComentario])
        .select();

      if (error) throw error;

      // Actualiza el estado de comentarios agregando el nuevo que ha insertado supabase (data[0])
      setComentarios(prev => [...prev, data[0]]);
      return true; // Indica que la operación fue exitosa
    } catch (err) {
      // En caso de error muestra por consola y devuelve false
      console.error('Error al agregar comentario:', err.message);
      return false;
    }
  };

  return (
    <div className="container mt-5">
      <h1>Comentarios</h1>
      {/* Muestra el código del ticket en el html */}
      <h2 className="my-4">Código ticket: <span>{codigoTiquet}</span></h2>

      {/* Componente que contiene el formulario para agregar nuevos comentarios */}
      <Comentario agregarComentario={agregarComentario} codigoTiquet={codigoTiquet} />

      <div className="mt-4">
        {/* Si hay comentarios, los muestra */}
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
          // Si no hay comentarios, muestra un mensaje 
          <p>No hay comentarios disponibles.</p>
        )}
      </div>
    </div>
  );
}
