import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="container d-flex justify-content-between">
        <h1>Gestion de Incidencias</h1>
        <div>
          <Link to="/" className="btn btn-primary mx-2">Panell</Link>
          <Link to="/IniciSessio" className="btn btn-primary mx-2">IniciSessio</Link>
          <Link to="/registre" className="btn btn-primary mx-2">Registre</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
