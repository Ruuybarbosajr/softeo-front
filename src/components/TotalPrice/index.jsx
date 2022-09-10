import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import configPrice from '../../Helpers/configPrice';
import style from './style.module.css';

export default function TotalPrice({ servicesProvided }) {
  const installments = servicesProvided.map((serviceProvided) => 
    serviceProvided.installmentsServiceProvided).flat();

  const price = useMemo(() => {
    return installments.reduce((acc, { priceInstallment }) => 
      acc + priceInstallment ,0);
  }, [servicesProvided]);

  return (
    <Container className={style.container__price} >
      <p>Valor total: {configPrice(price) }</p>
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