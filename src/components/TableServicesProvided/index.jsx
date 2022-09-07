import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import style from './style.module.css';
import RowBoardServiceProvided from '../RowBoardServiceProvided';

export default function TableServicesProvided({ servicesProvided, callModal }) {
  return (
    <Container>
      <Table hover  className={style.container__table } > 
        <thead>
          <tr>
            <th>Nome</th>
            <th>Serviço</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {servicesProvided.map((serviceProvided) => (
            <RowBoardServiceProvided
              key={serviceProvided.id}
              serviceProvided={serviceProvided}
              handleClick={ () => callModal(serviceProvided.id) }
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

TableServicesProvided.propTypes = {
  servicesProvided: PropTypes.array.isRequired,
  callModal: PropTypes.func.isRequired,
};