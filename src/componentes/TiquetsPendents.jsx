import React, { useEffect, useState } from 'react';

// Funcion para obtener los tiquets de localStorage
const tenerTiquets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets')) || [];  // JSON.parse(): Convierte esa cadena JSON en un array de objetos
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
                                <button className="btn btn-success me-2" title="Resolver ticket">Resolver</button>
                                <button className="btn btn-warning me-2" title="Añadir comentario" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-info me-2" title="Ver comentarios">
                                    <i className="bi bi-chat-left-text"></i>
                                </button>
                                {/*  Aca ya estan los botones */}
                                <button className="btn btn-danger" title="Eliminar ticket">     
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
