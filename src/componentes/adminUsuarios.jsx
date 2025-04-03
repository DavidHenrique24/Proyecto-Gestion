import React, { useState, useEffect } from 'react';

const AdminUsuarios = () => {
  // Estado para almacenar los usuarios
  const [datosUsuarios, setDatosUsuarios] = useState([]);

  // Cargar los usuarios desde localStorage al montar el componente
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('datos_usuarios')) || [];
    setDatosUsuarios(usuariosGuardados);
  }, []);

  // Función para manejar el cambio de rol
  const handleRoleChange = (email, nuevoRol) => {
    // Actualizar el rol del usuario en la lista
    const usuariosActualizados = datosUsuarios.map((usuario) =>
      usuario.email === email ? { ...usuario, rol: nuevoRol } : usuario
    );

    setDatosUsuarios(usuariosActualizados);

    // Guardar los cambios en localStorage
    localStorage.setItem('datos_usuarios', JSON.stringify(usuariosActualizados));
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
