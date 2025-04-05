import React, { useState } from 'react';
import { useUser } from '../componentes/UserContext';
import supabase from '../ultis/supabase';

const Comentario = ({ codigoTiquet }) => {
    const { user } = useUser();
    const [texto, setTexto] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user && texto.trim()) {
            const nuevoComentario = {
                usuario: user.email,
                comentario: texto,
                fecha: new Date().toLocaleDateString(),
                ticket_id: codigoTiquet,
            };

            try {
                // Insertamos el nuevo comentario en Supabase
                const { data, error } = await supabase
                    .from('comentarios')
                    .insert([nuevoComentario]);

                if (error) {
                    setError(error.message);
                    console.error('Error al agregar comentario:', error.message);
                } else {
                    // Limpiar el campo de texto si todo es correcto
                    setTexto('');
                    console.log('Comentario agregado correctamente:', data);
                }
            } catch (err) {
                setError(err.message);
                console.error('Error al agregar comentario:', err.message);
            }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    return (
        <div>
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

            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default Comentario;
