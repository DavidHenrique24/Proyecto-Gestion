import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciSessio from './pages/IniciSessio';
import Registre from './pages/Registre';
import Panell from './pages/Panell';


const App = () => {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<IniciSessio />} />
        
        {/* Ruta per a la vista de Registre */}
        <Route path="/registre" element={<Registre />} />
        

        <Route path="/panell" element={<Panell />} />
      </Routes>
    </Router>
  );
};

export default App;
