import React, { useState, useEffect } from 'react';
import Comentario from '../componentes/Comentario';

export default function Comentarios() {
    const [comentarios, setComentarios] = useState([]);

    // Cargar los comentarios desde localStorage al cargar el componente
    useEffect(() => {
        const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios'));
        if (comentariosGuardados) {
            setComentarios(comentariosGuardados);
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1>Comentarios</h1>

            {/* Componente para agregar un comentario */}
            <Comentario setComentarios={setComentarios} comentarios={comentarios} />

            <h2 className="my-4">Comentarios existentes:</h2>

            <div className="mt-4">
                {comentarios.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Autor</th>
                                <th>Fecha</th>
                                <th>Comentario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comentarios.map((comentario, index) => (
                                <tr key={index}>
                                    <td>{comentario.autor}</td>
                                    <td>{comentario.fecha}</td>
                                    <td>{comentario.texto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay comentarios disponibles.</p>
                )}
            </div>
        </div>
    );
}
