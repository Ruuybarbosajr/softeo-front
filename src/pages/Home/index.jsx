import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import getServicesProvided from '../../services/getServicesProvided';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import TableServicesProvided from '../../components/TableServicesProvided';
import style from './style.module.css';
import MyModal from '../../components/Modal';
import getServicesProvidedByMonth from '../../services/getServicesProvidedByMonth';
import getServicesProvidedByPeriod from '../../services/getServicesProvidedByPeriod';
import { Modal } from 'react-bootstrap';
import configPrice from '../../Helpers/configPrice';
import getServiceProvided from '../../services/getServiceProvided';
import TotalPrice from '../../components/TotalPrice';

export default function Home() {
  const navigate = useNavigate();
  const [inputChecked, setInputChecked] = useState(false);
  const [servicesProvided, setServicesProvided] = useState([]);
  const [month, setMonth] = useState('');
  const [period, setPeriod] = useState({ initial: new Date(), final: new Date() });
  const [modalShow, setModalShow] = useState(false);
  const [serviceProvided, setServiceProvided] = useState({
    client: {
      name: ''
    },
    service: {
      price: 0
    }
  });

  useEffect(() => {
    (async () => {
      setServicesProvided((await getServicesProvided()).data);
    })();
  }, []);

  async function handleClick() {
    if (!inputChecked) {
      setServicesProvided((await getServicesProvidedByMonth(month))?.data);
    } else {
      const initial = new Date(period.initial).toISOString();
      const final = new Date(period.final).toISOString();
      setServicesProvided((await getServicesProvidedByPeriod(initial, final))?.data);
    }
  }

  async function callModal(id) {
    setServiceProvided((await getServiceProvided(id)).data);
    setModalShow(true);
  }


  return (
    <>
      <Header />
      <Container fluid="sm">
        <Form className={ style.container__form }>
          <Row>
            <Col>
              <Form.Group>
                <Form.Select
                  disabled={inputChecked}
                  aria-label="Selecione o mês"
                  placeholder="Mês"
                  onChange={ ({ target }) => setMonth(target.value) }
                >
                  <option value="">Todos os meses</option>
                  <option value="0">Janeiro</option>
                  <option value="1">Fevereiro</option>
                  <option value="2">Março</option>
                  <option value="3">Abril</option>
                  <option value="4">Maio</option>
                  <option value="5">Junho</option>
                  <option value="6">Julho</option>
                  <option value="7">Agosto</option>
                  <option value="8">Setembro</option>
                  <option value="9">Outubro</option>
                  <option value="10">Novembro</option>
                  <option value="11">Dezembro</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className={ style.container__row }>
            <Form.Label>
              <Form.Check
                checked={inputChecked}
                type="checkbox"
                onChange={ () => setInputChecked((prev) => !prev) }
                label="Selecionar o período"
              />
            </Form.Label>
            <Col>
              <Form.Group className={ style.container__groupData }>
                <Form.Label>Início</Form.Label>
                <Form.Control
                  onChange={ ({ target: { value } }) => setPeriod((prev) => ({ ...prev, initial: value })) }
                  disabled={!inputChecked}
                  type='date'
                  label="Início"
                />
              </Form.Group>
              <Form.Group className={ style.container__groupData }>
                <Form.Label>Fim</Form.Label>
                <Form.Control
                  onChange={ ({ target: { value } }) => setPeriod((prev) => ({ ...prev, final: value })) }
                  disabled={!inputChecked}
                  type='date'
                  label="Final"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            onClick={ handleClick }
            variant="primary"
          >
            Buscar
          </Button>
          <Button
            onClick={ () => navigate('/register') }
            variant="dark"
          >
            Adicionar
          </Button>
        </Form>
      </Container>
      <TotalPrice servicesProvided={servicesProvided} />
      <TableServicesProvided
        callModal={ callModal }
        servicesProvided={servicesProvided}/> 
      <MyModal
        show={modalShow}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Serviço prestado
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={ style.container__modalBody }>
          <h4>{serviceProvided.client?.name}</h4>
          <p> Serviço: {serviceProvided.service?.name}</p>
          <p> Valor: {configPrice(serviceProvided.service?.price) }</p>
          <p> Parcelas: {`${serviceProvided.installmentsPaid}/${serviceProvided.installmentsContracted}`}</p>
          {serviceProvided.obs && <p>Obs: {serviceProvided.obs}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () => setModalShow(false) }>Voltar</Button>
        </Modal.Footer>
      </MyModal>
    </>
  );
}