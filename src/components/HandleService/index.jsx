import React, { useState } from 'react';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MyModal from '../Modal';
import deleteService from '../../services/deleteService';
import verifyInputs from '../../Helpers/verifyInputs';
import schemaService from '../../schemas/service';
import Loading from '../Loading';

export default function HandleService({ editService, config }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState({
    name: true,
    price: true,
    maxInstallments: true,
  });
  const [destroy, setDestroy] = useState(false);
  const [newService, setNewService] = useState({
    name: editService.name,
    price: editService.price,
    maxInstallments: editService.maxInstallments,
    findByProps: editService.findByProps
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, price, maxInstallments } = newService;
    const schemaVerified = await schemaService({ name, price, maxInstallments });
    const isValidSubmit = verifyInputs(schemaVerified);
    if (isValidSubmit) {
      try {
        setLoading(true);
        await config.callback({ name, price, maxInstallments });
        navigate(config.path);
      } catch (error) {
        console.error(error.message);
      }
    } else setValidated(schemaVerified);
  }

  async function destroyService() {
    await deleteService(editService.id);
    navigate('/edit');
  }

  return (
    <>
      {
        loading ?
          <Loading /> :
          <Container>
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Form.Group className={ style.container__groupInput }>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    onChange={ ({ target }) => setNewService((prev) => ({
                      ...prev,
                      name: target.value
                    }))}
                    required
                    value={newService.name}
                    type="text"
                    maxLength="50"
                    placeholder="Nome"
                    isInvalid={!validated.name}
                  />
                  <Form.Control.Feedback type="invalid">O Nome deve ter mais de 2 caracteres</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className={ style.container__groupInput }>
                  <Form.Label>Pre??o</Form.Label>
                  <Form.Control
                    onChange={ ({ target }) => setNewService((prev) => ({
                      ...prev,
                      price: Number(target.value)
                    }))}
                    required
                    value={newService.price}
                    type="number"
                    min="0"
                    placeholder="Pre??o"
                    isInvalid={!validated.price}
                  />
                  <Form.Control.Feedback type="invalid">Insira um valor v??lido</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className={ style.container__groupInput }>
                  <Form.Label>N?? m??ximo de parcelas</Form.Label>
                  <Form.Control
                    onChange={ ({ target }) => setNewService((prev) => ({
                      ...prev,
                      maxInstallments: Number(target.value)
                    }))}
                    required
                    value={newService.maxInstallments}
                    type="number"
                    max="24"
                    min="0"
                    placeholder="N?? de parcelas"
                    isInvalid={!validated.maxInstallments}
                  />
                  <Form.Control.Feedback type="invalid">Somente acima de 1 parcela</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className={ style.container__group }>
                <Button
                  onClick={ () => navigate(config.path) }
                  variant='danger'
                >
            Cancelar
                </Button>
                {newService.findByProps &&
             <Button
               variant='danger'
               onClick={() => setDestroy(true)}
             >
                Apagar Servi??o
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
                  <Modal.Footer className={style.container__buttons}>
                    <Button
                      onClick={ destroyService }
                    >
                      Sim
                    </Button>
                    <Button
                      onClick={ () => setDestroy(false) }
                    >
                      N??o
                    </Button>
                  </Modal.Footer>
                </MyModal>
                <Button type="submit">{config.title}</Button>
              </Form.Group>
            </Form>
          </Container>}
    </>
  );
}

HandleService.defaultProps = {
  editService: {
    name: '',
    price: 0,
    maxInstallments: 1,
    id: '',
    findByProps: false
  }
};

HandleService.propTypes = {
  editService: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxInstallments: PropTypes.number.isRequired,
    findByProps: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  }),
  config: PropTypes.shape({
    callback: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};