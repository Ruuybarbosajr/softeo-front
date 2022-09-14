import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import getClients from '../../services/getClients';
import Header from '../../components/Header';
import getServices from '../../services/getServices';
import configInstallments from '../../Helpers/configInstallments';
import style from './style.module.css';
import NewServiceProvidedContext from '../../context/NewServiceProvidedContext';

export default function Registers() {
  const navigate = useNavigate();
  const {
    setServiceProvidedForConfirmation,
    serviceProvidedForConfirmation
  } = useContext(NewServiceProvidedContext);

  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]); 

  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (serviceProvidedForConfirmation.clientId && serviceProvidedForConfirmation.serviceId) {
      setBtnDisabled(false);
    }
  }, [serviceProvidedForConfirmation]);

  useEffect(() => {
    (async () => {
      try {
        setClients((await getClients()).data);
        setServices((await getServices()).data);
      } catch (error) {
        console.error(error.message);
      }

    })();
  }, []);

  function handleChangeService({ target: { value } }) {
    if (!value) return;
    const service = services.find(({ id }) => id === value);

    setServiceProvidedForConfirmation((prev) => ({
      ...prev,
      service,
      serviceId: service.id
    }));
  }

  function handleChangeClient({ target: { value } }) {
    if (!value) return;
    const client = clients.find(({ id }) => id === value);

    setServiceProvidedForConfirmation((prev) => ({
      ...prev,
      clientId: value,
      client
    }));
  }

  function confirmationServiceProvided() {
    setServiceProvidedForConfirmation(serviceProvidedForConfirmation);
    navigate('/confirm-service');
  }

  return (
    <>
      <Header />
      <Container className={ style.container }>
        <Form>
          <Row>
            <Col>
              <Form.Group className={ style.container__group }>
                <Form.Select
                  aria-label="Selecione o cliente"
                  placeholder="cliente"
                  onChange={ handleChangeClient }
                >
                  <option value="" >Selecione o cliente</option>
                  { clients.map((client) => (
                    <option
                      key={client.id}
                      value={client.id}
                    >
                      {client.name}
                    </option>
                  ) )}
                </Form.Select>
                <Button
                  onClick={ () => navigate('/register/client') }
                  variant="primary"
                >
                  Criar Cliente
                </Button>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className={ style.container__group }>
                <Form.Select
                  aria-label="Selecione o cliente"
                  placeholder="Mês"
                  onChange={ handleChangeService }
                >
                  <option value="" >Selecione o serviço</option>
                  { services.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                    >
                      {service.name}
                    </option>
                  ) )}
                </Form.Select>
                <Button
                  onClick={ () => navigate('/register/service') }
                  variant="primary"
                >
                  Criar Serviço
                </Button>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className={ style.container__group }>
                <Form.Select
                  className={style.select_installments}
                  aria-label="Selecione o cliente"
                  placeholder="Mês"
                  disabled={ !serviceProvidedForConfirmation.service.price }
                  onChange={ ({ target }) =>  setServiceProvidedForConfirmation((prev) => ({
                    ...prev,
                    installmentsContracted: Number(target.value)
                  }))}
                >
                  { !serviceProvidedForConfirmation.service.price && <option>Nº de parcelas</option> }
                  { Array.from({ length: serviceProvidedForConfirmation.service.maxInstallments }).map((_, index) => (
                    <option
                      key={index}
                      value={index + 1}
                    >
                      {configInstallments(serviceProvidedForConfirmation.service.price, index + 1)}
                    </option>
                  ) )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button
            disabled={btnDisabled}
            variant="primary"
            onClick={ confirmationServiceProvided }
          >
            Confirmar Serviço
          </Button>
        </Form>
      </Container>
    </>
  );
}