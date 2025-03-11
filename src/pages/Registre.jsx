import React, { useState, useEffect } from 'react';

const Registro = () => {
  // Estados para el formulario y mensajes
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar usuarios existentes al iniciar
  const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem('datosUsuarios')) || [];
  };

  const gestionarRegistro = (e) => {
    e.preventDefault();//e.preventDefault() evita que el formulario se envíe de manera tradicional (lo que recargaría la página).

    // Obtener lista actual de usuarios
    const usuariosExistentes = obtenerUsuarios();

 
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registro</h1>
        <form onSubmit={gestionarRegistro} className="form p-4 border shadow mt-5 mx-auto" style={{ width: '400px' }}>
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
  
          <input type="submit" className="mt-4 w-100 btn btn-primary" value="Registrarse" />
        </form>

  
      </div>
    </main>
  );
};

export default Registro;
