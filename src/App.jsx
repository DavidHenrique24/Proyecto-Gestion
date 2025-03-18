import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./componentes/UserContext";
import IniciSessio from './pages/IniciSessio';
import Registre from './pages/Registre';
import Panell from './pages/Panell';
import Header from './componentes/header.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';


// Inicializa la colección de tiquets si no existe con Localstoreage
if (!localStorage.getItem('dades_tiquets')) {
  localStorage.setItem('dades_tiquets', JSON.stringify([]));
}

// Inicializa la colección de usuarios si no existe
if (!localStorage.getItem('dades_usuaris')) {
  localStorage.setItem('dades_usuaris', JSON.stringify([])); //JSON.stringify([]): Convierte un array vacío en una cadena JSON para almacenarlo.
}


const App = () => {
  return (
    <UserProvider>
    <Router>
       <Header/>
      <Routes>
  
        <Route path="/IniciSessio" element={<IniciSessio />} />
        
        <Route path="/registre" element={<Registre />} />
        

        <Route path="/" element={<Panell />} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
