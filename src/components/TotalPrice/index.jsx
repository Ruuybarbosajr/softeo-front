import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import configPrice from '../../Helpers/configPrice';
import style from './style.module.css';

export default function TotalPrice({ servicesProvided }) {
  return (
    <Container className={style.container__price} >
      <p>Valor total: {configPrice(servicesProvided.reduce((acc, { service }) => acc + service.price ,0)) }</p>
    </Container>
  );
}

TotalPrice.propTypes = {
  servicesProvided: PropTypes.arrayOf(PropTypes.shape({
    service: PropTypes.shape({
      price: PropTypes.number
    })
  }))
};