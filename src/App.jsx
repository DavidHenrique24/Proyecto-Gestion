import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./componentes/UserContext";
import IniciSessio from './pages/IniciSessio';
import Registre from './pages/Registre';
import Panell from './pages/Panell';
import Header from './componentes/header.jsx';
import Comentarios from './pages/Comentarios.jsx';
import Tiquet from './pages/Tiquet.jsx';
import EditTiquet from './pages/editTiquet.jsx';
import AdminUsuarios from './componentes/adminUsuarios.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App = () => {
  return (
    <UserProvider>
    <Router>
       <Header/>
      <Routes>
  
        <Route path="/" element={<IniciSessio />} />
        
        <Route path="/registre" element={<Registre />} />
        <Route path="/editTiquet/:codigo" element={<EditTiquet />} />
         <Route path="/comentarios/:id" element={<Comentarios />} />
        <Route path="/tiquet" element={<Tiquet />} />
        <Route path="/Panel" element={<Panell />} />
        <Route path="/adminUsuarios" element={<AdminUsuarios />} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
