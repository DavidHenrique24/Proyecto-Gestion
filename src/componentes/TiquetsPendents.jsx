import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EditTiquet from '../pages/editTiquet';

// Función para obtener los tiquets de localStorage
const tenerTiquets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets')) || [];
};

// Función para resolver un tiquet
const resolverTiquet = (codigo, setTiquetsPendient) => {
    const tiquets = tenerTiquets();
    const tiquetResuelto = tiquets.map(tiquet => 
        tiquet.codigo === codigo ? { ...tiquet, estat: 'resolt' } : tiquet
    );
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquetResuelto));
    setTiquetsPendient(tiquetResuelto.filter(tiquet => tiquet.estat === 'pendent'));
};

// Función para eliminar un tiquet
const eliminarTiquet = (codigo, setTiquetsPendient) => {
    const tiquets = tenerTiquets();
    const tiquetsActualizados = tiquets.filter(tiquet => tiquet.codigo !== codigo);
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquetsActualizados));
    setTiquetsPendient(tiquetsActualizados.filter(tiquet => tiquet.estat === 'pendent'));
};

const TiquetsPendient = () => {
    const [tiquetsPendient, setTiquetsPendient] = useState([]);
    const navigate = useNavigate(); // Usar useNavigate

    useEffect(() => {
        const tiquets = tenerTiquets().filter(tiquet => tiquet.estat === 'pendent');
        setTiquetsPendient(tiquets);
    }, []);

    // Función para ver los comentarios de un tiquet
    const handleVerComentarios = (codigo) => {
        // Guardamos el código del tiquet en el localStorage para poder acceder a él en la página de comentarios
        localStorage.setItem('codigo_tiquet', codigo);
        navigate('/comentarios'); // Redirigir a la página de comentarios
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

                                <Link to={`/editTiquet/${tiquet.codigo}`}>
                                 <button 
                                          className="btn btn-warning me-2" 
                                          title="Añadir comentario" 
                                           data-bs-toggle="modal" 
                                             data-bs-target="#exampleModal" 
                                         >
              <i className="bi bi-pencil"></i>
            </button>
          </Link>
                                

                                {/* Boton para ver los comentarios */}
                                <button 
                                    className="btn btn-info me-2" 
                                    title="Ver comentarios"
                                    onClick={() => handleVerComentarios(tiquet.codigo)} // Redirigir al hacer clic
                                >
                                    <i className="bi bi-chat-left-text"></i>
                                </button>

                                {/* Botom para eliminar el tiquet */}
                                <button 
                                    className="btn btn-danger" 
                                    title="Eliminar ticket"
                                    onClick={() => eliminarTiquet(tiquet.codigo, setTiquetsPendient)}
                                >
                                    <i className="bi bi-trash3"></i>
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
