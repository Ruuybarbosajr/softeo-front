import React, { useState } from 'react';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MyModal from '../Modal';
import deleteClient from '../../services/deleteClient';
import schemaClient from '../../schemas/client';
import verifyInputs from '../../Helpers/verifyInputs';
import Loading from '../Loading';

export default function HandleClient({ editClient, config }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState({
    name: true,
    email: true,
    tel: true
  });
  const [destroy, setDestroy] = useState(false);
  const [newClient, setNewClient] = useState({
    name: editClient.name,
    email: editClient.email,
    tel: editClient.tel,
    findByProps: editClient.findByProps
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, name, tel } = newClient;
    const schemaVerified = await schemaClient({ email, name, tel });
    const isValidSubmit = verifyInputs(schemaVerified);
    if (isValidSubmit) {
      try {
        setLoading(true);
        await config.callback({ email, name, tel });
        navigate(config.path);
      } catch (error) {
        console.error(error);
      }
    } else setValidated(schemaVerified);
  }

  async function destroyClient() {
    setLoading(true);
    await deleteClient(editClient.id);
    navigate('/edit');
  }

  return (
    <>
      {loading ?
        <Loading /> :
        <Container>
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group className={ style.container__groupInput }>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  onChange={ ({ target }) => setNewClient((prev) => ({
                    ...prev,
                    name: target.value
                  }))}
                  required
                  value={newClient.name}
                  type="text"
                  placeholder="Ex: José da Silva"
                  isInvalid={!validated.name}
                />
                <Form.Control.Feedback type="invalid">O Nome deve ter mais de 2 caracteres</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={ style.container__groupInput }>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={ ({ target }) => setNewClient((prev) => ({
                    ...prev,
                    email: target.value
                  }))}
                  required
                  value={newClient.email}
                  disabled={newClient.findByProps}
                  type="email"
                  placeholder="exemplo@email.com"
                  isInvalid={!validated.email}
                />
                <Form.Control.Feedback type="invalid">Insira um email válido</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={ style.container__groupInput }>
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  onChange={ ({ target }) => setNewClient((prev) => ({
                    ...prev,
                    tel: target.value
                  }))}
                  required
                  type="tel"
                  value={newClient.tel}
                  placeholder="(xx) xxxxx-xxxx"
                  isInvalid={!validated.tel}
                />
                <Form.Control.Feedback type="invalid">Insira um telefone válido</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className={ style.container__group }>
              <Button
                onClick={ () => navigate(config.path) }
                variant='danger'
              >
            Cancelar
              </Button>
              {newClient.findByProps &&
             <Button
               variant='danger'
               onClick={() => setDestroy(true)}
             >
                Apagar Cliente
             </Button>
              }
              <MyModal
                show={destroy}
              >
                <Modal.Header>
                  <Modal.Title>
                  Tem certeza que deseja apagar?
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Button
                    onClick={ destroyClient }
                  >
                  Sim
                  </Button>
                  <Button
                    onClick={ () => setDestroy(false) }
                  >
                  Não
                  </Button>
                </Modal.Footer>
              </MyModal>
              <Button
                type="submit"
              >
                {config.title}
              </Button>
            </Form.Group>
          </Form>
        </Container>
      }
    </>
  );
}

HandleClient.defaultProps = {
  editClient: {
    name: '',
    email: '',
    tel: '',
    id: '',
    findByProps: false
  }
};

HandleClient.propTypes = {
  editClient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    findByProps: PropTypes.bool.isRequired
  }),
  config: PropTypes.shape({
    callback: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })
};