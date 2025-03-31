import React, { useState } from 'react';

const PanelAdmin = () => {
  // Estado con la lista de usuarios y sus roles
  const [dadesUsuaris, setDadesUsuaris] = useState([
    { id: 1, nom: 'Usuari 1', rol: 'Administrador' },
    { id: 2, nom: 'Usuari 2', rol: 'Editor' },
    { id: 3, nom: 'Usuari 3', rol: 'Visualitzador' },
  ]);

  // Función para cambiar el rol del usuario
  const handleRoleChange = (id, nouRol) => {
    setDadesUsuaris((prevUsuaris) =>
      prevUsuaris.map((usuari) =>
        usuari.id === id ? { ...usuari, rol: nouRol } : usuari
      )
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Panell d'Administració d'Usuaris</h1>
      
      {/* Tabla de usuarios */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center">Nom</th>
              <th className="text-center">Rol</th>
            </tr>
          </thead>
          <tbody>
            {dadesUsuaris.map((usuari) => (
              <tr key={usuari.id}>
                {/* Nombre del usuario */}
                <td className="align-middle text-center">{usuari.nom}</td>
                {/* Selector de rol con Bootstrap */}
                <td className="align-middle text-center">
                  <select
                    className="form-select"
                    value={usuari.rol}
                    onChange={(e) => handleRoleChange(usuari.id, e.target.value)}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Editor">Editor</option>
                    <option value="Visualitzador">Visualitzador</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelAdmin;
