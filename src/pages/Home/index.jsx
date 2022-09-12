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
import { Modal, Spinner, Toast } from 'react-bootstrap';
import configPrice from '../../Helpers/configPrice';
import getServiceProvided from '../../services/getOneServiceProvided';
import TotalPrice from '../../components/TotalPrice';
import Loading from '../../components/Loading';

export default function Home() {
  const navigate = useNavigate();
  const [inputChecked, setInputChecked] = useState(false);
  const [servicesProvided, setServicesProvided] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth());
  const [period, setPeriod] = useState({ initial: new Date(), final: new Date() });
  const [modalShow, setModalShow] = useState(false);
  const [serviceProvided, setServiceProvided] = useState({
    client: {
      name: ''
    },
    service: {
      price: 0
    },
    installment: {
      priceInstallment: 0
    },
    numberInstallment: 1
  });

  useEffect(() => {
    (async () => {
      try {
        setServicesProvided((await getServicesProvided()).data);
        setLoading(false);
        setLoadingBtn(false);
      } catch (error) {
        setLoading(false);
        setLoadingBtn(false);
        console.error(error.message);
      }
    })();
  }, []);

  async function handleClick() {
    setLoadingBtn(true);
    try {
      if (!inputChecked) {
        setServicesProvided((await getServicesProvidedByMonth(month))?.data);
        setLoadingBtn(false);
      } else {
        const initial = new Date(period.initial).toISOString();
        const final = new Date(period.final).toISOString();
        setServicesProvided((await getServicesProvidedByPeriod(initial, final))?.data);
        setLoadingBtn(false);
      }
    } catch (error) {
      setLoadingBtn(false);
      console.error(error.message);
    }
  }

  async function callModal(id, numberInstallment) {
    try {
      const serviceProvided = (await getServiceProvided(id)).data;
      const { installmentsServiceProvided: [installment] } = serviceProvided;
      setServiceProvided({
        ...serviceProvided,
        installment,
        numberInstallment
      });
      setModalShow(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <Header />
      {loading ?
        <Loading /> :
        <>
          <Container fluid="sm">
            <Form className={ style.container__form }>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Select
                      disabled={inputChecked}
                      aria-label="Selecione o mês"
                      value={month}
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
                <Form.Label htmlFor='check'>
                  <Form.Check
                    id='check'
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
              <Form.Group className={style.container__buttons}>
                <Button
                  onClick={ handleClick }
                  variant="primary"
                >
                  {loadingBtn ?  
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> 
                    : 
                    'Buscar' }
                </Button>
                { servicesProvided?.length ? 
                  <Button
                    onClick={ () => navigate('/register') }
                    variant="primary"  
                  >
                Adicionar serviço
                  </Button> : null
                }
              </Form.Group>
            </Form>
          </Container>
          <TotalPrice servicesProvided={servicesProvided} />
          { servicesProvided?.length ?
            <TableServicesProvided
              callModal={ callModal }
              servicesProvided={servicesProvided}/> :
            <Toast className={style.container__toast}>
              <Toast.Body className={style.container__toast_body}>
              Você não possui serviço
              
              </Toast.Body>
              <Toast.Body>
                <Button
                  onClick={ () => navigate('/register') }
                  variant="primary"  
                >
                Adicionar
                </Button>
              </Toast.Body>
            </Toast>
          }
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
              <p> Valor da parcela: {configPrice(serviceProvided.installment?.priceInstallment) }</p>
              <p> Parcelas: {`${serviceProvided.numberInstallment}/${serviceProvided.installmentsContracted}`}</p>
              <p> Data: {new Date(serviceProvided.installment.dateInstallment).toLocaleDateString()}</p>
              <p> Valor total: {configPrice(serviceProvided.service?.price) }</p>
              {serviceProvided.obs && <p>Obs: {serviceProvided.obs}</p>}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ () => setModalShow(false) }>Voltar</Button>
            </Modal.Footer>
          </MyModal>
        </>}
    </>
  );
}