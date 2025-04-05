import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../componentes/UserContext';
import supabase from '../ultis/supabase';

const TiquetsPendient = () => {
    const [tiquetsPendient, setTiquetsPendient] = useState([]);
    const navigate = useNavigate();
    const { user } = useUser();

    // Cargar los tiquets pendientes desde Supabase
    const fetchTiquets = async () => {
        const { data, error } = await supabase
            .from('tiquets')
            .select('*')
            .eq('estat', 'pendent');

        if (error) {
            console.error('Error al obtener tiquets:', error);
        } else {
            setTiquetsPendient(data);
        }
    };

    useEffect(() => {
        fetchTiquets();
    }, []);

    const resolverTiquet = async (id) => {
        const fechaActual = new Date().toISOString().split('T')[0]; // Solo YYYY-MM-DD
        const { error } = await supabase
            .from('tiquets')
            .update({ estat: 'resolt', fechaResuelto: fechaActual })
            .eq('id', id);

        if (error) {
            console.error('Error al resolver tiquet:', error);
        } else {
            fetchTiquets(); // Recargar los pendientes
        }
    };

    const eliminarTiquet = async (id) => {
        const { error } = await supabase
            .from('tiquets')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error al eliminar tiquet:', error);
        } else {
            fetchTiquets(); // Recargar la lista
        }
    };

    const handleVerComentarios = (id) => {
        localStorage.setItem('codigo_tiquet', id); 
        navigate('/comentarios');
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
                                <button 
                                    className="btn btn-success me-2" 
                                    title="Resolver ticket"
                                    onClick={() => resolverTiquet(tiquet.id)}
                                >
                                    Resolver
                                </button>

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
