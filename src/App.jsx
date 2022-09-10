import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './pages/Register';
import ProviderNewServiceProvided from '../src/context/ProviderNewServiceProvided';
import ConfirmNewServiceProvided from './pages/ConfirmNewServiceProvided';
import CreateClient from './pages/CreateClient';
import CreateService from './pages/CreateService';
import Edit from './pages/Edit';
import EditClient from './pages/EditClient';
import EditService from './pages/EditService';

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
          <Route path='/register/client' element={ <CreateClient /> }/>
          <Route path='/register/service' element={ <CreateService /> }/>
          <Route path='/edit' element={ <Edit /> }/>
          <Route path='/edit/client/:id' element={ <EditClient /> }/>
          <Route path='/edit/service/:id' element={ <EditService /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
