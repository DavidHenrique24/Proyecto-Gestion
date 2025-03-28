import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../componentes/UserContext'; 

const Header = () => {
  const { user, setUser } = useUser(); // Accedemos al usuario y al método setUser desde el contexto
  const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario

  // Al cargar el componente, verificamos si hay un usuario almacenado en localStorage
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
      setUser(usuarioGuardado);
    }
  }, [setUser]);

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null); // Limpiamos el contexto del usuario
    localStorage.removeItem('usuario'); // Eliminamos el usuario del localStorage
    navigate('/IniciSessio'); // Redirigimos al inicio de sesión
  };

  return (
    <header className="bg-dark text-white py-3">
      <nav className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">Gestión de Incidencias</h1>
        <div>
          {user ? (
            <>
              <Link to="/Panel" className="btn btn-secondary mx-2">Panel</Link>
              <span className="mx-2">Hola, {user.email}</span>
              <button className="btn btn-danger mx-2" onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/" className="btn btn-primary mx-2">Iniciar Sesión</Link>
              <Link to="/registre" className="btn btn-primary mx-2">Registro</Link>
            
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
