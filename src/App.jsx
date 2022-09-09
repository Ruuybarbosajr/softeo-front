import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './pages/Register';
import ProviderNewServiceProvided from '../src/context/ProviderNewServiceProvided';
import ConfirmNewServiceProvided from './pages/ConfirmNewServiceProvided';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <Home />}/>
          <Route path="/register" element={ 
            <ProviderNewServiceProvided>
              <Register />
            </ProviderNewServiceProvided>
          }/>
          <Route path="/confirm-service" element={ 
            <ProviderNewServiceProvided>
              <ConfirmNewServiceProvided />
            </ProviderNewServiceProvided>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
