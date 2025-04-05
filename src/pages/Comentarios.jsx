import React, { useState, useEffect } from 'react';
import Comentario from '../componentes/Comentario';
import supabase from '../ultis/supabase';

export default function Comentarios() {
    const [comentarios, setComentarios] = useState([]);
    const [codigoTiquet, setCodigoTiquet] = useState('');

    useEffect(() => {
        const codigo = localStorage.getItem('codigo_tiquet');
        setCodigoTiquet(codigo);

        // Cargar los comentarios desde Supabase
        const cargarComentarios = async () => {
            try {
                const { data, error } = await supabase
                    .from('comentarios')
                    .select('*')
                    .eq('ticket_id', codigo); // Filtramos por el ticket_id

                if (error) {
                    throw error;
                }

                setComentarios(data || []);
            } catch (err) {
                console.error('Error al cargar comentarios:', err.message);
            }
        };

        if (codigo) {
            cargarComentarios();
        }
    }, []);

    // Función para agregar un nuevo comentario sin perder los anteriores
    const agregarComentario = async (nuevoComentario) => {
        try {
            // Insertar el nuevo comentario en la tabla 'comentarios' de Supabase
            const { data, error } = await supabase
                .from('comentarios')
                .insert([nuevoComentario]);

            if (error) {
                throw error;
            }

            // Agregar el nuevo comentario al estado local
            setComentarios(prevComentarios => [...prevComentarios, data[0]]);
        } catch (err) {
            console.error('Error al agregar comentario:', err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Comentarios</h1>
            <h2 className="my-4">Código ticket: <span>{codigoTiquet}</span></h2>

            {/* Pasamos la función para agregar comentarios */}
            <Comentario agregarComentario={agregarComentario} codigoTiquet={codigoTiquet} />

            <div className="mt-4">
                {comentarios.length > 0 ? (
                    comentarios.map((comentario) => (
                        <div key={comentario.id} className="card p-3 mt-2">
                            <h5 className="text-end">Autor: <span>{comentario.usuario}</span><span className="ms-4">{comentario.fecha}</span></h5>
                            <p>{comentario.comentario}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios disponibles.</p>
                )}
            </div>
        </div>
    );
}
