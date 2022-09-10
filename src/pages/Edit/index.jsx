import React, { useState } from 'react';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import getClients from '../../services/getClients';
import getServices from '../../services/getServices';
import style from './style.module.css';

export default function Edit() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);

  const [client, setClient] = useState({
    id: '',
    name: '',
  });
  const [service, setService] = useState({
    id: '',
    name: '',
  });

  function handleChangeClient({ target: { value } }) {
    const findClient = clients.find((client) => client.id === value);
    setClient({ id: findClient?.id, name: findClient?.name || '' });
  }

  function handleChangeService({ target: { value } }) {
    const findService = services.find((client) => client.id === value);
    setService({ id: findService?.id, name: findService?.name  || ''});
  }

  useState(() => {
    (async () => {
      setClients((await getClients()).data);
      setServices((await getServices()).data);
    })();
  }, []);

  return (
    <>
      <Header />
      <Container className={ style.container }>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Editar cliente</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={ (event) => {
                event.preventDefault();
                navigate(`/edit/client/${client.id}`);
              } }>
                <Row>
                  <Col>
                    <Form.Group className={style.container__group}>
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
                    </Form.Group>
                    <Form.Group className={style.container__group}>
                      <Form.Control
                        disabled
                        value={client.name}></Form.Control>
                      <Form.Control.Feedback type="invalid">selecione um cliente</Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      disabled={!client.name}
                      type='submit'>
                    Editar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Editar serviço</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={ (event) => {
                event.preventDefault();
                navigate(`/edit/service/${service.id}`);
              } }>
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
                    </Form.Group>
                    <Form.Group className={style.container__group}>
                      <Form.Control
                        disabled
                        value={service.name}></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={!service.name}
                      type='submit'>
                    Editar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}