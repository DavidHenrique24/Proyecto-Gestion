import React, { useState, useEffect } from 'react';
import { useUser } from '../componentes/UserContext'; // Importamos el contexto del usuario
import { useNavigate } from 'react-router-dom';
import supabase from '../ultis/supabase'; // Importa el cliente Supabase

const AdminUsuarios = () => {
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const { user, setUser } = useUser(); // Accedemos al usuario en sesión
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    //Desactivo por si quiero volver a usarlo
    // // Verificar si el usuario es admin antes de cargar la lista
    // if (user && user.rol !== 'admin') {
    //   navigate('/'); // Redirigir a la página principal si no es admin
    // }

    const fetchUsuarios = async () => {
      // Obtener todos los usuarios desde Supabase
      const { data, error } = await supabase
        .from('usuarios') // Nombre de la tabla en Supabase
        .select('*'); // Seleccionar todos los campos

      if (error) {
        console.error('Error al cargar los usuarios:', error.message);
      } else {
        setDatosUsuarios(data);
      }
    };

    fetchUsuarios(); //Para cargar los usuarios al iniciar el componente
  }, [user, navigate]);

  const handleRoleChange = async (email, nuevoRol) => {
    // Actualizar el rol del usuario en Supabase
    const { data, error } = await supabase
      .from('usuarios') // Nombre de la tabla en Supabase
      .update({ rol: nuevoRol }) // Actualizar el rol
      .eq('email', email); // Filtrar por el email del usuario

    if (error) {
      console.error('Error al actualizar el rol:', error.message);
    } else {
      // Si el rol actualizado es del usuario logueado, actualizamos también el contexto
      if (user && user.email === email) {
        const usuarioActualizado = { ...user, rol: nuevoRol };
        setUser(usuarioActualizado);
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      }

      // Actualizar el estado de los usuarios para reflejar los cambios
      setDatosUsuarios(datosUsuarios.map((usuario) =>
        usuario.email === email ? { ...usuario, rol: nuevoRol } : usuario
      ));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Usuarios</h1>
      
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Cambiar Rol</th>
          </tr>
        </thead>
        <tbody>
          {datosUsuarios.map((usuario) => (
            <tr key={usuario.email}>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <select
                  value={usuario.rol}
                  onChange={(e) => handleRoleChange(usuario.email, e.target.value)}
                  className="form-select"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
