import React, { useState } from 'react';

const IniciSessio = () => {
  const [email, setEmail] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  
  // Datos de usuarios 
  const dades_usuaris = [
    { email: 'usu@gmail.com', contrasenya: '123456' },
    { email: 'didac@gmail.com', contrasenya: '123456' },
  ];

  const VerificarUsu = (e) => {
    e.preventDefault();

    // Comprobar si las credenciales coinciden con alguna de las de dades_usuaris
    const usuarioValido = dades_usuaris.find(
      (usuario) => usuario.email === email && usuario.contrasenya === contrasenya
    );

    if (usuarioValido) {
      alert('Login exitoso');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Login</h1>
        <form onSubmit={VerificarUsu} className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }}>
          <label htmlFor="email" className="mt-2 form-label">User: </label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
          <input
            type="password"
            className="form-control"
            value={contrasenya}
            onChange={(e) => setContrasenya(e.target.value)}
          />
  
          <input
            type="submit"
            className="mt-4 w-100 btn btn-primary"
            value="Entrar"
            id="enviar"
          />
        </form>
      </div>
    </main>
  );
};

export default IniciSessio;
