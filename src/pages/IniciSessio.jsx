import React from 'react';


const IniciSessio = () => {
  return (
    <div>
      <h1>Inicio de sesion </h1>
      {/* Texto de prueba  */}
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
      
     

  );
};

export default IniciSessio;
