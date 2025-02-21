import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="container d-flex justify-content-between">
        <h1>Gestion de Incidencias</h1>
        <div>
          <Link to="/" className="btn btn-primary mx-2">Panel</Link>
          <Link to="/IniciSessio" className="btn btn-primary mx-2">Inicio Sesion</Link>
          <Link to="/registre" className="btn btn-primary mx-2">Registro</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
