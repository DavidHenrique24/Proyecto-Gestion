import React, { useState } from 'react';
import { useUser } from '../componentes/UserContext';

const Comentario = ({ codigoTiquet, agregarComentario }) => {
  // Obtener el usuario actual del contexto con su estado
  const { user } = useUser();
  const [texto, setTexto] = useState('');
  // Estado para manejar errores al agregar comentario
  const [error, setError] = useState(null);


  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si no hay usuario logueado, no mostrar
    if (!user) {
      alert('Debes estar logueado para comentar');
      return;
    }

    //creo objeto para el comentario
    const nuevoComentario = {
      usuario: user.email,
      comentario: texto,
      // Fecha actual en formato YYYY-MM-DD (por eso salia error)
      fecha: new Date().toISOString().split('T')[0],
      ticket_id: codigoTiquet,
    };

    // Llamar a la función para agregar el comentario (recibida por props)
    const resultado = await agregarComentario(nuevoComentario);

    // Si se agregó correctamente, limpiar el texto y si no muestrar el error
    if (resultado) {
      setTexto('');
    } else {
      // Si hubo un problema, mostrar mensaje de error
      setError('No se pudo agregar el comentario.');
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
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Comentario</button>

      {/* Mostrar mensaje de error si existe */}
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

export default Comentario;
