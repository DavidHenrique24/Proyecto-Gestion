import React from 'react';
import TiquetsPendents from '../componentes/TiquetsPendents';
import TiquetsResolts from '../componentes/TiquetsResolts';

const Panell = () => {
  return (
    <main className="container mt-5">
      <h1>Administración de incidencias</h1>
      
      {/* Componente para tickets pendientes */}
      <TiquetsPendents />

      {/* Componente para tickets resueltos */}
      <TiquetsResolts />

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Código incidencia: <span>123546</span></p>
              <label htmlFor="comentario" className="form-label">Comentario:</label> 
              <input className="form-control" defaultValue="Este es un comentario sobre esta incidencia" />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Panell;
