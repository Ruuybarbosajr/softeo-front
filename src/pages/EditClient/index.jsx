import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import HandleClient from '../../components/HandleClient';
import Header from '../../components/Header';
import getOneClient from '../../services/getOneClient';
import putClient from '../../services/putClient';
import style from './style.module.css';

export default function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    (async () => {
      setClient((await getOneClient(id)).data);
    })();
  }, []);

  async function putClientWithId(data) {
    await putClient(data, id);
    navigate('/edit');
  }

  return (
    <>
      <Header />
      {client && 
        <HandleClient 
          editClient={{
            ...client,
            findByProps: true
          }}
          config={{
            callback: putClientWithId,
            path: '/edit',
            title: 'Editar'
          }}
        />
      }
      {!client && <Spinner className={style.container__loading} animation="border" />}
    </>
  );
}