import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intentamos cargar el usuario desde localStorage al montar el componente
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
      setUser(usuarioGuardado); // Si existe, establecerlo en el estado
    }
  }, []); // Este useEffect solo se ejecuta una vez al cargar el componente

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => {
  return useContext(UserContext);
};
