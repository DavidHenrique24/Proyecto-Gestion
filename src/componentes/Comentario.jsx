import React, { useState } from 'react';
import { useUser } from '../componentes/UserContext'; // Asegúrete de tener el contexto de usuario

const Comentario = ({ setComentarios, comentarios, codigoTiquet }) => {
    const { user } = useUser();  // Obtén el usuario desde el contexto
    const [texto, setTexto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user && texto) {
            const nuevoComentario = {
                autor: user.email, // Usamos el email del usuario como autor
                texto,
                fecha: new Date().toLocaleString(),
                codigo: codigoTiquet, // Incluimos el código del ticket
            };

            const nuevosComentarios = [...comentarios, nuevoComentario];
            setComentarios(nuevosComentarios);

            // Guardar los comentarios actualizados en localStorage
            localStorage.setItem('comentarios', JSON.stringify(nuevosComentarios));

            // Limpiar el campo de texto
            setTexto('');
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <div className="mb-3">
                <label htmlFor="comentario" className="form-label">Comentario</label>
                <textarea
                    id="comentario"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    className="form-control"
                    placeholder="Escriba su comentario"
                    rows="4"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={new Date().toISOString().slice(0, 16)}
                    disabled
                />
            </div>
            <button type="submit" className="btn btn-primary">Agregar Comentario</button>
        </form>
    );
};

export default Comentario;