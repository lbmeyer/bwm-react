import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../../services/authService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const { component, ...rest } = props;
  return (
    <Route {...rest} render={props =>
        authService.isAuthenticated() 
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login' }} />
      }
    />
  );
};

export default ProtectedRoute;
