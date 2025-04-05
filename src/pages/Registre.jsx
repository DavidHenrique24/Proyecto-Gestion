import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../ultis/supabase';  

const Registro = () => {
  // Estados para el formulario y mensajes
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [redirigir, setRedirigir] = useState(false);

  // Función para gestionar el registro
  const gestionarRegistro = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    // Registrar el nuevo usuario en Supabase 
    const { data, error} = await supabase.auth.signUp({
      email,
      password: contrasena,
    });

    setRedirigir(true);
  };

  if (redirigir) {
    return <Navigate to="/" />;  
  }

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registro</h1>
        <form onSubmit={gestionarRegistro} className="form p-4 border shadow mt-5 mx-auto" style={{ width: '400px' }}>
          <label htmlFor="email" className="mt-2 form-label">Correo Electrónico:</label>
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

        {mensaje && <p className="text-center mt-3">{mensaje}</p>}
      </div>
    </main>
  );
};

export default Registro;
