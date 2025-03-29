import React, { useState } from 'react';
import { useUser } from '../componentes/UserContext';

const Comentario = ({ agregarComentario, codigoTiquet }) => {
    const { user } = useUser();
    const [texto, setTexto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user && texto.trim()) {
            const nuevoComentario = {
                autor: user.email,
                texto,
                fecha: new Date().toLocaleString(),
                codigo: codigoTiquet,
            };

            // Agregar el nuevo comentario
            agregarComentario(nuevoComentario);

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
            <button type="submit" className="btn btn-primary">Agregar Comentario</button>
        </form>
    );
};

export default Comentario;
