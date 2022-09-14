import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HandleService from '../../components/HandleService';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import getOneService from '../../services/getOneService';
import putService from '../../services/putService';

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setService((await getOneService(id)).data);
      } catch (error) {
        console.log(error.message);
      }
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
      {!service && <Loading />}
    </>
  );
}