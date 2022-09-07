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
  const { setServiceProvidedForConfirmation } = useContext(NewServiceProvidedContext);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]); 
  const [newServiceProvided, setNewServiceProvided] = useState({
    clientId: '',
    serviceId: '',
    installmentsPaid: 1,
    service: {
      maxInstallments: 1,
      price: 0
    },
    installmentsContracted: 0
  });

  useEffect(() => {
    (async () => {
      setClients((await getClients()).data);
      setServices((await getServices()).data);
    })();
  }, []);

  function handleChange({ target: { value } }) {
    const service = services.find(({ id }) => id === value);

    setNewServiceProvided((prev) => ({
      ...prev,
      service,
      serviceId: service.id
    }));
  }

  function confirmationServiceProvided() {
    setServiceProvidedForConfirmation(newServiceProvided);
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
                  onChange={ ({ target }) => setNewServiceProvided((prev) => ({
                    ...prev,
                    clientId: target.value
                  })) }
                >
                  <option>Selecione o cliente</option>
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
                  variant="primary"
                >
                  Adicionar
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
                  onChange={ handleChange }
                >
                  <option>Selecione o serviço</option>
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
                  variant="primary"
                >
                  Adicionar
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
                  disabled={ !newServiceProvided.service.price }
                  onChange={ ({ target }) =>  setNewServiceProvided((prev) => ({
                    ...prev,
                    installmentsContracted: Number(target.value)
                  }))}
                >
                  { !newServiceProvided.service.price && <option>Nº de parcelas</option> }
                  { Array.from({ length: newServiceProvided.service.maxInstallments }).map((_, index) => (
                    <option
                      key={index}
                      value={index + 1}
                    >
                      {configInstallments(newServiceProvided.service.price, index + 1)}
                    </option>
                  ) )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            onClick={ confirmationServiceProvided }
          >
            Confirmar
          </Button>
        </Form>
      </Container>
    </>
  );
}