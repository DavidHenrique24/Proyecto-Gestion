import React, { useState, useEffect } from 'react';
import Comentario from '../componentes/Comentario';

export default function Comentarios() {
    const [comentarios, setComentarios] = useState([]);
    const [codigoTiquet, setCodigoTiquet] = useState('');

    useEffect(() => {
        // Obtener el código del tiquet desde el localStorage
        const codigo = localStorage.getItem('codigo_tiquet');
        setCodigoTiquet(codigo);

        // Cargar los comentarios desde localStorage
        let comentariosGuardados;
        try {
            comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
        } catch (error) {
            console.error('Error parsing comentarios from localStorage:', error);
            comentariosGuardados = [];
        }
        if (comentariosGuardados) {
            setComentarios(comentariosGuardados.filter(comentario => comentario.codigo === codigo));
        }
    }, []);

    // Guardar los comentarios en localStorage
    useEffect(() => {
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }, [comentarios]);

    return (
        <div className="container mt-5">
            <h1>Comentarios</h1>
            <h2 className="my-4">Código ticket: <span>{codigoTiquet}</span></h2>
            {/* Componente para agregar un comentario */}
            <Comentario setComentarios={setComentarios} comentarios={comentarios} codigoTiquet={codigoTiquet} />

   

            <div className="mt-4">
                {comentarios.length > 0 ? (
                    comentarios.map((comentario, index) => (
                        <div key={index} className="card p-3 mt-2">
                            <h5 className="text-end">Autor: <span>{comentario.autor}</span><span className="ms-4">{comentario.fecha}</span></h5>
                            <p>{comentario.texto}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios disponibles.</p>
                )}
            </div>
        </div>
    );
}