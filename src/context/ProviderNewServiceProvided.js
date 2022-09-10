import React, { useState } from 'react';
import NewServiceProvidedContext from './NewServiceProvidedContext';
import PropTypes from 'prop-types';

export default function ProviderNewServiceProvided({ children }) {
  const [serviceProvidedForConfirmation, setServiceProvidedForConfirmation] = useState({
    clientId: '',
    serviceId: '',
    installmentsPaid: 1,
    service: {
      maxInstallments: 1,
      price: 0
    },
    client: {},
    installmentsContracted: 1,
    obs: ''
  });

  return (
    <NewServiceProvidedContext.Provider value={{ serviceProvidedForConfirmation, setServiceProvidedForConfirmation }}>
      { children }
    </NewServiceProvidedContext.Provider>
  );
}

ProviderNewServiceProvided.propTypes = {
  children: PropTypes.element.isRequired
};