import React, { useState } from 'react';
import NewServiceProvidedContext from './NewServiceProvidedContext';
import PropTypes from 'prop-types';

export default function ProviderNewServiceProvided({ children }) {
  const [serviceProvidedForConfirmation, setServiceProvidedForConfirmation] = useState({});

  return (
    <NewServiceProvidedContext.Provider value={{ serviceProvidedForConfirmation, setServiceProvidedForConfirmation }}>
      { children }
    </NewServiceProvidedContext.Provider>
  );
}

ProviderNewServiceProvided.propTypes = {
  children: PropTypes.elementType
};