import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../../services/authService';

const LoggedInRoute = ({ component: Component, ...rest }) => {
  // const { component, ...rest } = props;
  return (
    <Route {...rest} render={props =>
        authService.isAuthenticated() 
        ? <Redirect to={{ pathname: '/rentals' }} />
        : <Component {...props} />
      }
    />
  );
};

export default LoggedInRoute;
