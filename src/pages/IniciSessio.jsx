import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../componentes/UserContext'; // Importamos el contexto del usuario
import supabase from '../ultis/supabase'; // Importamos el cliente Supabase

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { setUser } = useUser(); // Accedemos a setUser desde el contexto
  const navigate = useNavigate();

  // Función para gestionar el inicio de sesión
  const gestionarLogin = async (e) => {
    e.preventDefault();

    // Usar Supabase para autenticar al usuario con los valores del formulario
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    });

    // Comprobamos si hubo un error
    if (error) {
      setMensaje('Usuario o contraseña incorrectos');
      console.error('Error de autenticación:', error.message);
      return;
    }

    // Si la autenticación fue exitosa, obtener el rol del usuario desde la tabla 'usuarios'
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('user_id', data.user.id) // Asegúrate de que el campo que almacena el ID del usuario es 'user_id'
      .single(); // Obtener solo un registro

    if (userError) {
      console.error('Error al obtener el rol del usuario:', userError.message);
      return;
    }

    // Guardar el usuario y su rol en el contexto
    setUser({
      ...data.user,
      rol: userData?.rol, // Guardar el rol del usuario
    });

    // Redirigir al panel de usuario
    navigate('/Panel');
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
