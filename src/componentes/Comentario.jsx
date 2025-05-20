import React, { useState } from 'react';
import { useUser } from '../componentes/UserContext';

const Comentario = ({ codigoTiquet, agregarComentario }) => {
  const { user } = useUser();
  const [texto, setTexto] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Debes estar logueado para comentar');
      return;
    }

    const nuevoComentario = {
      usuario: user.email,
      comentario: texto,
      fecha: new Date().toISOString().split('T')[0],
      ticket_id: codigoTiquet,
    };

    const resultado = await agregarComentario(nuevoComentario);

    if (resultado) {
      setTexto('');
      setError(null);
    } else {
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
          rows="4"
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Comentario</button>

      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

export default Comentario;
