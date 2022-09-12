import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import style from './style.module.css';

export default function Loading(){
  return (
    <Container className={style.container}>
      <Spinner animation="grow" />
    </Container>
  );
}