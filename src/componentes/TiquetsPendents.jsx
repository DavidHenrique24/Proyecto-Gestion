import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../componentes/UserContext'; 
import supabase from '../ultis/supabase';

const TiquetsPendient = () => {
    // Estado para guardar los tickets desde Supabase
    const [tiquetsPendient, setTiquetsPendient] = useState([]);
    const navigate = useNavigate();
   const { user } = useUser(); //obtiene el usuario actual

    // Función para cargar los tickets pendientes desde la tabla tiquets'
    const fetchTiquets = async () => {
        const { data, error } = await supabase
            .from('tiquets')
            .select('*')
            .eq('estat', 'pendent');  // Solo tickets pendientes

        if (error) {
            console.error('Error al obtener tiquets:', error);
        } else {
            setTiquetsPendient(data);  // Actualiza el estado con los tickets 
        }
    };

    // useEffect para cargar los tickets una sola vez cuando se monta el componente
    useEffect(() => {
        fetchTiquets();
    }, []);

    // Función para marcar un ticket como resuelto (cambia estado y pone fecha actual)
    const resolverTiquet = async (id) => {
        // Fecha actual en formato ISO pero solo YYYY-MM-DD
        const fechaActual = new Date().toISOString().split('T')[0];
        
        const { error } = await supabase
            .from('tiquets')
            .update({ estat: 'resolt', fechaResuelto: fechaActual }) // Pone resuelto los tiquets 
            .eq('id', id);

        if (error) {
            console.error('Error al resolver tiquet:', error);
        } else {
            window.location.reload(); //Para que se carguen en los dos lados 
        }
    };

    // Función para eliminar un ticket por id
    const eliminarTiquet = async (id) => {
        const { error } = await supabase
            .from('tiquets')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error al eliminar tiquet:', error);
        } else {
            // Recarga la pagina eliminado
            fetchTiquets();
        }
    };

    // Función para navegar a la página de comentarios del ticket con el id pasado
    const handleVerComentarios = (id) => {
        navigate(`/comentarios/${id}`);
    };

    return (
        <div>
            <h2>Tiquets Pendientes</h2>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Aula</th>
                        <th>Grupo</th>
                        <th>Ordenador</th>
                        <th>Descripción</th>
                        <th>Alumno</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tiquetsPendient.map((tiquet) => (
                        <tr key={tiquet.id}>
                            <td>{tiquet.id}</td>
                            <td>{new Date(tiquet.fecha).toLocaleDateString()}</td>
                            <td>{tiquet.aula}</td>
                            <td>{tiquet.grupo}</td>
                            <td>{tiquet.ordenador}</td>
                            <td>{tiquet.descripcion}</td>
                            <td>{tiquet.alumno}</td>
                            <td>
                                {/* Botón para resolver ticket */}
                                <button 
                                    className="btn btn-success me-2" 
                                    title="Resolver ticket"
                                    onClick={() => resolverTiquet(tiquet.id)}
                                >
                                    Resolver
                                </button>

                                {/* Solo si el usuario tiene rol 'admin, se muestran los botones de editar y eliminar */}
                                {user?.rol === 'admin' && (
                                    <>
                                        <Link to={`/editTiquet/${tiquet.id}`}>
                                            <button 
                                                className="btn btn-warning me-2" 
                                                title="Editar ticket"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </Link>

                                        <button 
                                            className="btn btn-danger me-2" 
                                            title="Eliminar ticket"
                                            onClick={() => eliminarTiquet(tiquet.id)}
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </>
                                )}

                                {/* Botón para ver los comentarios del ticket */}
                                <button 
                                    className="btn btn-info me-2" 
                                    title="Ver comentarios"
                                    onClick={() => handleVerComentarios(tiquet.id)}
                                >
                                    <i className="bi bi-chat-left-text"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TiquetsPendient;
