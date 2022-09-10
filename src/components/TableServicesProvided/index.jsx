import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import style from './style.module.css';
import RowBoardServiceProvided from '../RowBoardServiceProvided';
import { v4 as uuidv4 } from 'uuid';

export default function TableServicesProvided({ servicesProvided, callModal }) {
  const installments = servicesProvided.map((service) => service.installmentsServiceProvided).flat();

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
          {
            installments.map((installment) => (
              <RowBoardServiceProvided
                key={uuidv4()}
                serviceProvided={{ 
                  ...installment
                }}
                handleClick={ () => callModal(installment.serviceProvidedId, installment.numberInstallment) }
              />
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

TableServicesProvided.propTypes = {
  servicesProvided: PropTypes.array.isRequired,
  callModal: PropTypes.func.isRequired,
};