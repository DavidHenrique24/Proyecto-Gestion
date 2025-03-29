export const obtenerComentarios = () => {
    return JSON.parse(localStorage.getItem('comentarios')) || [];
};

export const guardarComentario = (nuevoComentario) => {
    const comentarios = obtenerComentarios();
    comentarios.push(nuevoComentario); // Agrega el nuevo comentario sin borrar los previos
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
};
