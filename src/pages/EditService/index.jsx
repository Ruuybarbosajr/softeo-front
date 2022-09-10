import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import HandleService from '../../components/HandleService';
import Header from '../../components/Header';
import getOneService from '../../services/getOneService';
import putService from '../../services/putService';
import style from './style.module.css';

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    (async () => {
      setService((await getOneService(id)).data);
    })();
  }, []);

  async function putServiceWithId(data) {
    await putService(data, id);
    navigate('/edit');
  }

  return (
    <>
      <Header />
      {service && 
        <HandleService 
          editService={{
            ...service,
            findByProps: true
          }}
          config={{
            callback: putServiceWithId,
            path: '/edit',
            title: 'Editar'
          }}
        />
      }
      {!service && <Spinner className={style.container__loading} animation="border" />}
    </>
  );
}