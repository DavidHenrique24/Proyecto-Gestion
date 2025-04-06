import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TiquetsPendents from '../componentes/TiquetsPendents';
import TiquetsResolts from '../componentes/TiquetsResolts';

const Panell = () => {


  return (
    <main className="container mt-5">
      <h1>Administración de incidencias</h1>

      <div className="text-start mb-4">
        <Link to="/tiquet" className="btn btn-primary">
          Crear Nuevo Tiquet
        </Link>
      </div>


      <TiquetsPendents />
      <TiquetsResolts />
    </main>
  );
};

export default Panell;
