import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../componentes/UserContext'; // Importar el contexto de usuario

const tenerTiquets = () => JSON.parse(localStorage.getItem('dades_tiquets')) || [];

const resolverTiquet = (codigo, setTiquetsPendient) => {
    const tiquets = tenerTiquets().map(tiquet => 
        tiquet.codigo === codigo ? { ...tiquet, estat: 'resolt' } : tiquet
    );
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquets));
    setTiquetsPendient(tiquets.filter(tiquet => tiquet.estat === 'pendent'));
};

const eliminarTiquet = (codigo, setTiquetsPendient) => {
    const tiquets = tenerTiquets().filter(tiquet => tiquet.codigo !== codigo);
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquets));
    setTiquetsPendient(tiquets.filter(tiquet => tiquet.estat === 'pendent'));
};

const TiquetsPendient = () => {
    const [tiquetsPendient, setTiquetsPendient] = useState([]);
    const navigate = useNavigate();
    const { user } = useUser(); // Obtener el usuario en sesión

    useEffect(() => {
        setTiquetsPendient(tenerTiquets().filter(tiquet => tiquet.estat === 'pendent'));
    }, []);

    const handleVerComentarios = (codigo) => {
        localStorage.setItem('codigo_tiquet', codigo);
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
                        <tr key={tiquet.codigo}>
                            <td>{tiquet.codigo}</td>
                            <td>{tiquet.fecha}</td>
                            <td>{tiquet.aula}</td>
                            <td>{tiquet.grupo}</td>
                            <td>{tiquet.ordenador}</td>
                            <td>{tiquet.descripcion}</td>
                            <td>{tiquet.alumno}</td>
                            <td>
                                <button 
                                    className="btn btn-success me-2" 
                                    title="Resolver ticket"
                                    onClick={() => resolverTiquet(tiquet.codigo, setTiquetsPendient)}
                                >
                                    Resolver
                                </button>

                                {/* Solo los administradores pueden editar y eliminar */}
                                {user?.rol === 'admin' && (
                                    <>
                                        <Link to={`/editTiquet/${tiquet.codigo}`}>
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
                                            onClick={() => eliminarTiquet(tiquet.codigo, setTiquetsPendient)}
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </>
                                )}

                                <button 
                                    className="btn btn-info me-2" 
                                    title="Ver comentarios"
                                    onClick={() => handleVerComentarios(tiquet.codigo)}
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

