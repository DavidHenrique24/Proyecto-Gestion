import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciSessio from './pages/IniciSessio';
import Registre from './pages/Registre';
import Panell from './pages/Panell';
import Header from './componentes/Header';



const App = () => {
  return (
    <Router>
       <Header/>
      <Routes>
  
        <Route path="/IniciSessio" element={<IniciSessio />} />
        
        <Route path="/registre" element={<Registre />} />
        

        <Route path="/" element={<Panell />} />
      </Routes>
    </Router>
  );
};

export default App;
