import React from 'react';
import { decodeToken } from 'react-jwt';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthToken({ children }) {
  const redirect = decodeToken(localStorage.getItem('token'));
  return (
    !redirect ? <Navigate replace to="/" /> : children
  );
}

AuthToken.propTypes = {
  children: PropTypes.element.isRequired
};