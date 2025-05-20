import React, { useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../componentes/UserContext'; 

const Header = () => {
  const { user, setUser } = useUser();
  // Hook para navegación 
  const navigate = useNavigate();

  // Recupera el usuario guardado en localStorage y lo establece en el contexto
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
      setUser(usuarioGuardado);
    }
  }, [setUser]);
  
  // Función para cerrar sesión
  // Limpia el estado del usuario y elimina los datos guardados en localStorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <header className="bg-dark text-white py-3">
      <nav className="container d-flex justify-content-between align-items-center">
        {/* Título principal de la aplicación */}
        <h1 className="m-0">Gestión de Incidencias</h1>
        <div>
          {user ? (
            <>
              {/* Si hay usuario, mostrar enlace al panel principal */}
              <Link to="/Panel" className="btn btn-secondary mx-2">Panel</Link>

              {/* Si el usuario es admin, mostrar enlace al panel de administración */}
              {user.rol === "admin" && (
                <Link to="/adminUsuarios" className="btn btn-warning mx-2">Admin</Link>
              )}

           
              <span className="mx-2">Hola, {user.email}</span>
              <button className="btn btn-danger mx-2" onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              {/* Si no hay usuario, mostrar botones para iniciar sesión*/}
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
