import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HandleClient from '../../components/HandleClient';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import getOneClient from '../../services/getOneClient';
import putClient from '../../services/putClient';

export default function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setClient((await getOneClient(id)).data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  async function putClientWithId(data) {
    try {
      await putClient(data, id);
      navigate('/edit');
    } catch (error) {
      console.error(error.message);
    }
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
      {!client && <Loading />}
    </>
  );
}