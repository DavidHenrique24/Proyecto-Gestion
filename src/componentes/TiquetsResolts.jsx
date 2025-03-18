import React, { useEffect, useState } from 'react';

// Función para obtener los tiquets de localStorage
const tenerTiquets = () => {
    return JSON.parse(localStorage.getItem('dades_tiquets')) || [];  // JSON.parse(): Convierte esa cadena JSON en un array de objetos
};

const TiquetsResolts = () => {
    const [tiquetsResolts, setTiquetsResolts] = useState([]);

    // Cargar los tiquets resueltos al montar el componente
    useEffect(() => {
        const tiquets = tenerTiquets().filter(tiquet => tiquet.estat === 'resolt');
        setTiquetsResolts(tiquets);
    }, []);

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
                        <tr key={tiquet.codigo}>
                            <td>{tiquet.codigo}</td>
                            <td>{tiquet.fecha}</td>
                            <td>{tiquet.fechaResuelto}</td>
                            <td>{tiquet.aula}</td>
                            <td>{tiquet.grupo}</td>
                            <td>{tiquet.ordenador}</td>
                            <td>{tiquet.descripcion}</td>
                            <td>{tiquet.alumno}</td>
                            <td>
                                <button className="btn btn-info me-2" title="Ver comentarios">
                                    <i className="bi bi-chat-left-text"></i>
                                </button>
                                {/* aca ya estan los botones */}
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

export default TiquetsResolts;
