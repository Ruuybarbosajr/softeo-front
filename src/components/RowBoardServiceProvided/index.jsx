import React from 'react';
import configName from '../../Helpers/configName';
import configPrice from '../../Helpers/configPrice';
import PropTypes from 'prop-types';
import style from './style.module.css';

export default function RowBoardServiceProvided({ serviceProvided, handleClick }) {
  return (
    <tr
      className={style.container__tr} 
      onClick={ handleClick }>
      <td>{configName(serviceProvided.client.name)}</td>
      <td>{serviceProvided.service.name}</td>
      <td>{configPrice(serviceProvided.service.price)}</td>
    </tr>
  );
}

RowBoardServiceProvided.propTypes = {
  serviceProvided: PropTypes.shape({
    client: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    service: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
  }),
  handleClick: PropTypes.func.isRequired
};