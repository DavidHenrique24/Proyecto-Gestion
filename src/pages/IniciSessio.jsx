import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../componentes/UserContext'; // Importamos el contexto del usuario

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { setUser } = useUser(); // Accedemos a setUser desde el contexto
  const navigate = useNavigate();

  // Obtener usuarios del localStorage
  const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem('datosUsuarios')) || [];
  };

  const gestionarLogin = (e) => {
    e.preventDefault();

    const usuariosExistentes = obtenerUsuarios();

    // Verificar si el usuario existe
    const usuarioAutenticado = usuariosExistentes.find((usuario) => usuario.email === email && usuario.contrasena === contrasena);
    
    if (!usuarioAutenticado) {
      setMensaje('Usuario o contraseña incorrectos');
      return;
    }

    // Guardar usuario en el contexto y en localStorage
    setUser(usuarioAutenticado);
    localStorage.setItem('usuario', JSON.stringify(usuarioAutenticado));

    // Redirigir al panel
    navigate('/'); 
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Iniciar Sesión</h1>
        <form onSubmit={gestionarLogin} className="form p-4 border shadow mt-5 mx-auto" style={{ width: '400px' }}>
          <label htmlFor="email" className="mt-2 form-label">Usuario:</label>
          <input 
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="pass" className="mt-2 form-label">Contraseña:</label>
          <input 
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <input type="submit" className="mt-4 w-100 btn btn-primary" value="Iniciar Sesión" />
        </form>

        {mensaje && <p className="text-center mt-3">{mensaje}</p>}
      </div>
    </main>
  );
};

export default IniciarSesion;
