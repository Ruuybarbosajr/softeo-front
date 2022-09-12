import React, { useState } from 'react';
import style from './style.module.css';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import verifyInputs from '../../Helpers/verifyInputs';
import schemaLogin from '../../schemas/login';
import postLogin from '../../services/postLogin';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });
  const [validated, setValidated] = useState({
    username: true,
    password: true
  });
  
  async function handleSubmit(event) {
    event.preventDefault();
    const schemaVerified = await schemaLogin(login);
    const isValidSubmit = verifyInputs(schemaVerified);
    if (isValidSubmit) {
      try {
        setLoadingBtn(true);
        const { token } = (await postLogin(login)).data;
        localStorage.setItem('token', token);
        navigate('/home');
      } catch (error) {
        setLoadingBtn(false);
        setValidated({
          username: false,
          password: false
        });
        console.error(error.message);
      }
    } else setValidated(schemaVerified);
  }

  return (
    <Container className={ style.container }>
      <Form
        onSubmit={ handleSubmit }
        className={ style.container__form }>
        <Form.Label>Acesso</Form.Label>
        <Form.Group>
          <Form.Control
            onChange={ ({ target }) => setLogin((prev) => ({
              ...prev,
              username: target.value
            }))}  
            value={login.username}
            isInvalid={!validated.username}
            type="text"
            placeholder="Nome de usuário"
          />
          <Form.Control.Feedback type='invalid'>Insira um usuário válido</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            onChange={ ({ target }) => setLogin((prev) => ({
              ...prev,
              password: target.value
            }))} 
            value={login.password}
            isInvalid={!validated.password}
            type="password"
            placeholder="Senha" />
          <Form.Control.Feedback type='invalid'>Insira uma senha válida</Form.Control.Feedback>
        </Form.Group>
        <Button
          type='submit'
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
            'Entrar' }
        </Button>
      </Form>
    </Container>
  );
}