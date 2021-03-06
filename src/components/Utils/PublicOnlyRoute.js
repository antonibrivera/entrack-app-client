import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenServices from '../../services/token-services';

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component

  return (
    <Route
      {...props}
      render={componentProps => (
        TokenServices.hasAuthToken()
          ? <Redirect to={'/dashboard'}/>
          : <Component {...componentProps} />
      )}
    />
  )
}