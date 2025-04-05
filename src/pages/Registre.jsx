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
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: contrasena,
    });

    if (authError) {
      setMensaje('Error al registrar el usuario: ' + authError.message);
      console.error('Error al registrar el usuario:', authError.message);
    } else if (authData) {
      // Actualizar los datos del usuario en la tabla 'usuarios'
      const { data: updateData, error: updateError } = await supabase
        .from('usuarios') // Asegúrate de que la tabla se llame 'usuarios'
        .upsert({
          email: email,              // Establece el correo electrónico
          rol: 'user',               // Establece el rol predeterminado como 'user'
          user_id: authData.user.id  // Asocia el user_id de Supabase con el registro
        });

      if (updateError) {
        setMensaje('Error al actualizar los datos del usuario: ' + updateError.message);
        console.error('Error al actualizar los datos del usuario:', updateError.message);
      } else {
        // Limpiar el formulario y mostrar mensaje de éxito
        setEmail('');
        setContrasena('');
        setMensaje('Registro exitoso. Redirigiendo al inicio de sesión...');

        // Redirigir al inicio de sesión automáticamente
        setRedirigir(true);
      }
    } else {
      setMensaje('Error al registrar el usuario: No se recibió información del usuario.');
    }
  };

  // Si redirigir es true, navega al inicio de sesión
  if (redirigir) {
    return <Navigate to="/" />;  // Aquí se redirige a la página de inicio de sesión
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
