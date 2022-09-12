import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import NewServiceProvidedContext from '../../context/NewServiceProvidedContext';
import configInstallments from '../../Helpers/configInstallments';
import configPrice from '../../Helpers/configPrice';
import postNewServiceProvided from '../../services/postNewServiceProvided';
import style from './style.module.css';

export default function ConfirmNewServiceProvided() {
  const [obs, setObs] = useState('');
  const  navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    serviceProvidedForConfirmation: {
      client,
      service,
      installmentsContracted,
      clientId,
      serviceId,
      installmentsPaid,
    } 
  } = useContext(NewServiceProvidedContext);

  async function submitNewServiceProvided() {
    setLoading(true);
    try {
      await postNewServiceProvided({
        clientId,
        serviceId,
        installmentsPaid,
        installmentsContracted,
        obs
      });
      navigate('/home');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <Container>
        <Header />
        {loading ?
          <Loading /> :
          <Form>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Nome</Form.Label>
              <Form.Control value={client?.name} placeholder="Nome do cliente" disabled />
            </Form.Group>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Email</Form.Label>
              <Form.Control value={client?.email} placeholder="Email" disabled />
            </Form.Group>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Telefone</Form.Label>
              <Form.Control value={client?.tel} placeholder="Tel" disabled />
            </Form.Group>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Serviço</Form.Label>
              <Form.Control value={service?.name} placeholder="Nome do service" disabled />
            </Form.Group>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Valor</Form.Label>
              <Form.Control value={configPrice(service?.price)} placeholder="Preço do serviço" disabled />
            </Form.Group>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Parcelas</Form.Label>
              <Form.Control
                value={configInstallments(service?.price, installmentsContracted)}
                placeholder="Nº de parcelas"
                disabled />
            </Form.Group>
            <Form.Group className={ style.container__groupInput }>
              <Form.Label>Obs:</Form.Label>
              <Form.Control
                onChange={ ({ target }) => setObs(target.value) }
                value={obs}
                placeholder="Observações"
                as="textarea"
              />
            </Form.Group>
            <Form.Group className={ style.container__group }>
              <Button
                onClick={ () => navigate('/register') }
                variant='danger'
              >
            Cancelar
              </Button>
              <Button
                onClick={ submitNewServiceProvided }
                variant='primary'
              >
            Confirmar
              </Button>
            </Form.Group>
          </Form>}
      </Container>
    </>
  );
}