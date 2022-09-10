import React from 'react';
import HandleClient from '../../components/HandleClient';
import Header from '../../components/Header';
import postNewClient from '../../services/postNewClient';

export default function CreateClient() {
  return(
    <>
      <Header />
      <HandleClient config={{
        callback: postNewClient,
        path: '/register',
        title: 'Cadastrar'
      }}/>
    </>
  );
}