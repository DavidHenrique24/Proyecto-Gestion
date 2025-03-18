import React, { useEffect, useState } from 'react';

// Función para obtener los tiquets de localStorage
const tenerTiquets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets')) || [];  // JSON.parse(): Convierte esa cadena JSON en un array de objetos
};

// Función para resolver un tiquet
const resolverTiquet = (codigo, setTiquetsPendient) => {
    // Obtener los tiquets actuales del localStorage
    const tiquets = tenerTiquets();
    
    // Encontrar el tiquet que se desea resolver
    const tiquetResuelto = tiquets.map(tiquet => 
        tiquet.codigo === codigo ? { ...tiquet, estat: 'resolt' } : tiquet
    );
    
    // Guardar los tiquets actualizados en localStorage
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquetResuelto));
    
    // Actualizar el estado local con los tiquets pendientes
    setTiquetsPendient(tiquetResuelto.filter(tiquet => tiquet.estat === 'pendent'));
};

// Función para eliminar un tiquet
const eliminarTiquet = (codigo, setTiquetsPendient) => {
    // Obtener los tiquets actuales del localStorage
    const tiquets = tenerTiquets();
    
    // Filtrar el tiquet a eliminar
    const tiquetsActualizados = tiquets.filter(tiquet => tiquet.codigo !== codigo);
    
    // Guardar el array actualizado en el localStorage
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquetsActualizados));
    
    // Actualizar el estado local con los tiquets pendientes
    setTiquetsPendient(tiquetsActualizados.filter(tiquet => tiquet.estat === 'pendent'));
};

const TiquetsPendient = () => {
    const [tiquetsPendient, setTiquetsPendient] = useState([]);

    // Cargar los tiquets pendientes al montar el componente
    useEffect(() => {
        const tiquets = tenerTiquets().filter(tiquet => tiquet.estat === 'pendent');
        setTiquetsPendient(tiquets);
    }, []);

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
                                {/* Botón para resolver el tiquet */}
                                <button 
                                    className="btn btn-success me-2" 
                                    title="Resolver ticket"
                                    onClick={() => resolverTiquet(tiquet.codigo, setTiquetsPendient)}
                                >
                                    Resolver
                                </button>

                                {/* Botón para añadir comentario */}
                                <button className="btn btn-warning me-2" title="Añadir comentario" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-pencil"></i>
                                </button>

                                {/* Botón para ver los comentarios */}
                                <button className="btn btn-info me-2" title="Ver comentarios">
                                    <i className="bi bi-chat-left-text"></i>
                                </button>

                                {/* Botón para eliminar el tiquet */}
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
