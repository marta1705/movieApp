import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Naglowek} from "./components/glowneStrony/Naglowek";
import {Biblioteka} from "./components/glowneStrony/Biblioteka";
import {Szukaj} from "./components/glowneStrony/Szukaj";
import {Glowna} from "./components/glowneStrony/Glowna";
import { GlobalProvider } from './components/Context/GlobalState';

import './App.css';
import "./components/lib/font-awesome/css/all.min.css";



function App() {
  return (
    <GlobalProvider>
      <Router>
        <Naglowek/>
        <div className='app'>
          <Routes> 
            <Route path="/" element={<Glowna/>} />
            <Route path='/biblioteka' element={<Biblioteka/>} />
            <Route path="/szukaj" element={<Szukaj />} />
          </Routes>
        
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
