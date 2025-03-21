import React, { useState } from 'react';

export default function Comentario({ setComentarios, comentarios }) {
    const [comentario, setComentario] = useState('');
    const [fecha, setFecha] = useState('');
    const [autor, setAutor] = useState('Javier Caraculo'); // El autor puede ser estático o dinámico

    const handleAddComentario = (e) => {
        e.preventDefault();

        if (comentario.trim() === '') return; // Evita comentarios vacíos

        const nuevoComentario = {
            autor,
            fecha,
            texto: comentario,
        };

        // Actualizamos la lista de comentarios
        const nuevosComentarios = [...comentarios, nuevoComentario];
        setComentarios(nuevosComentarios);

        // Guardamos los nuevos comentarios en localStorage
        localStorage.setItem('comentarios', JSON.stringify(nuevosComentarios));

        // Limpiamos los campos
        setComentario('');
        setFecha('');
    };

    return (
        <form onSubmit={handleAddComentario} className="form card p-3 shadow">
            <label htmlFor="comentario" className="form-label">Comentario: </label>
            <textarea 
                id="comentario"
                className="form-control"
                cols="3"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
            ></textarea>

            <label htmlFor="fecha" className="form-label me-2 mt-3">Fecha: </label>
            <div className="d-flex align-items-center">
                <input
                    type="datetime-local"
                    className="form-control w-25"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <button className="btn btn-success ms-auto">Añadir comentario</button>
            </div>
        </form>
    );
}
