import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../componentes/UserContext";
import supabase from "../ultis/supabase";

const TiquetsResolts = () => {
  // Estado para guardar los tickets resueltos obtenidos de la base de datos
  const [tiquetsResolts, setTiquetsResolts] = useState([]);
  // Hook para redirigir a otras rutas
  const navigate = useNavigate();
  // Obtener información del usuario desde el contexto
  const { user } = useUser();

  // Función que obtiene los tickets resueltos desde la tabla 'tiquets' en Supabase
  const fetchTiquetsResolts = async () => {
    // Consulta a Supabase: selecciona todos los registros donde 'estat' es 'resolt'
    const { data, error } = await supabase
      .from("tiquets")
      .select("*")
      .eq("estat", "resolt");

    if (error) {
      // Si ocurre un error, se muestra en consola
      console.error("Error al obtener tiquets resueltos:", error.message);
    } else {
      // Si no hay error, se actualiza el estado con los datos recibidos o con un array vacío
      setTiquetsResolts(data || []);
    }
  };

  // Hook useEffect que se ejecuta una vez al montar el componente
  // para cargar los tickets resueltos
  useEffect(() => {
    fetchTiquetsResolts();
  }, []);

  // Función para eliminar un ticket resuelto dado su id
  const eliminarTiquet = async (id) => {
    // Llama a Supabase para eliminar el registro con el id especificado
    const { error } = await supabase.from("tiquets").delete().eq("id", id);

    if (error) {
      // Si ocurre un error, se muestra en consola
      console.error("Error al eliminar tiquet:", error.message);
    } else {
      // Si se elimina correctamente, se actualiza el estado eliminando el ticket borrado
      setTiquetsResolts((prev) => prev.filter((tiquet) => tiquet.id !== id));
    }
  };

  // Función para navegar a la página de comentarios de un ticket específico
  const handleVerComentarios = (id) => {
    navigate(`/comentarios/${id}`);
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
              <td>
                {/* Mostrar la fecha original en formato local, o "Sin fecha" si no existe */}
                {tiquet.fecha
                  ? new Date(tiquet.fecha).toLocaleDateString()
                  : "Sin fecha"}
              </td>
              <td>
                {/* Mostrar la fecha de resolución en formato local, o "Sin fecha" si no existe */}
                {tiquet.fechaResuelto
                  ? new Date(tiquet.fechaResuelto).toLocaleDateString()
                  : "Sin fecha"}
              </td>
              <td>{tiquet.aula}</td>
              <td>{tiquet.grupo}</td>
              <td>{tiquet.ordenador}</td>
              <td>{tiquet.descripcion}</td>
              <td>{tiquet.alumno}</td>
              <td>
                {/* Botón para ver comentarios del ticket */}
                <button
                  className="btn btn-info me-2"
                  title="Ver comentarios"
                  onClick={() => handleVerComentarios(tiquet.id)}
                >
                  <i className="bi bi-chat-left-text"></i>
                </button>

                {/* Si el usuario tiene rol 'admin', mostrar botón para eliminar ticket */}
                {user?.rol === "admin" && (
                  <button
                    className="btn btn-danger"
                    title="Eliminar ticket"
                    onClick={() => eliminarTiquet(tiquet.id)}
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
