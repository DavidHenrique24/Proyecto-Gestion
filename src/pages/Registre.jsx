import React, { useState } from 'react';

const IniciSessio = () => {
  //Se crea los estados para el email y la contraseña
  const [email, setEmail] = useState(''); // Para almacenar el email
  const [contrasenya, setContrasenya] = useState('');  // Para almacenar la contraseña
const [mensaje, setMensaje] = useState(''); // Para almacenar el mensaje de error
  const gestionarInicio = (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario
    
    //Crea el objeto con los datos del usuario
    const datosUsuarios = { email, contrasenya };

    //Guardar los datos
    localStorage.setItem('datosUsuarios', JSON.stringify(datosUsuarios));

    window.location.href = '/'; // Redirige a la página de inicio
 //obtener los datos del usuario en Localstorage
    const usuarioGuardado = JSON.parse(localStorage.getItem('datosUsuarios'));
    console.log(usuarioGuardado); //Para ver el usuario 
    const usuarioExistente = JSON.parse(localStorage.getItem('datosUsuarios'));




  };

  return (  
    //Es el que ya esta hecho
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registro</h1>
        {/* Se agrega onSubmit al formulario */}
        <form onSubmit={gestionarInicio} className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }}>
          <label htmlFor="email" className="mt-2 form-label">User: </label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
  
          <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
          <input 

            className="form-control" 
            value={contrasenya}
            onChange={(e) => setContrasenya(e.target.value)} 
          />
  
          <input type="submit" className="mt-4 w-100 btn btn-primary" value="Entrar" id="enviar" />
        </form>
      </div>
    </main>
  );
};

export default IniciSessio;
