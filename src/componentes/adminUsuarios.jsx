import React, { useState, useEffect } from 'react';
import { useUser } from '../componentes/UserContext';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { user } = useUser(); // Obtenemos el usuario actual del contexto

  useEffect(() => {
    // Cargar la lista de usuarios desde localStorage
    const datosUsuarios = JSON.parse(localStorage.getItem('datos_usuarios')) || [];
    setUsuarios(datosUsuarios);
  }, []);

  const handleRoleChange = (id, nuevoRol) => {
    // Actualizar el rol del usuario en la lista
    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
    );
    setUsuarios(usuariosActualizados);

    // Guardar los cambios en localStorage
    localStorage.setItem('datos_usuarios', JSON.stringify(usuariosActualizados));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Usuarios</h1>

      {user?.rol !== 'admin' ? (
        <p>No tienes permisos para acceder a esta página.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  <select
                    value={usuario.rol}
                    onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
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
      )}
    </div>
  );
};

export default AdminUsuarios;