import React from 'react';
import HandleService from '../../components/HandleService';
import Header from '../../components/Header';
import postNewService from '../../services/postNewService';

export default function CreateService() {
  return(
    <>
      <Header />
      <HandleService config={{
        callback: postNewService,
        path: '/register',
        title: 'Cadastrar'
      }}/>
    </>
  );
}