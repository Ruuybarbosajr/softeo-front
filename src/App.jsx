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
import Login from './pages/Login';
import AuthToken from './components/AuthToken';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login />}/>
          <Route path="/home" element={ 
            <AuthToken>
              <Home />
            </AuthToken>
          }/>
          <Route path="/register" element={ 
            <AuthToken>
              <ProviderNewServiceProvided>
                <Register />
              </ProviderNewServiceProvided>
            </AuthToken>
          }/>
          <Route path="/confirm-service" element={
            <AuthToken>
              <ProviderNewServiceProvided>
                <ConfirmNewServiceProvided />
              </ProviderNewServiceProvided>
            </AuthToken>
          }/>
          <Route path='/register/client' element={ 
            <AuthToken>
              <CreateClient /> 
            </AuthToken>
          }/>
          <Route path='/register/service' element={ 
            <AuthToken>
              <CreateService /> 
            </AuthToken>
          }/>
          <Route path='/edit' element={ 
            <AuthToken>
              <Edit />
            </AuthToken>
          }/>
          <Route path='/edit/client/:id' element={
            <AuthToken>
              <EditClient />
            </AuthToken>
          }/>
          <Route path='/edit/service/:id' element={
            <AuthToken>
              <EditService />
            </AuthToken> 
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
