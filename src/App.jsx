import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registers from './pages/Registers';
import ProviderNewServiceProvided from '../src/context/ProviderNewServiceProvided';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <Home />}/>
          <Route path="/register" element={ 
            <ProviderNewServiceProvided>
              <Registers />
            </ProviderNewServiceProvided>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
