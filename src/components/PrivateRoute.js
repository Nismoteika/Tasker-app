import React, { useEffect, useState } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, path, getStoreToken, ...rest }) => {
  
  return (
    <Route path={path} {...rest}
      render={props =>
        getStoreToken.length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                prevLocation: path,
                error: 'Сначала авторизуйтесь!'
              }
            }}
          />
        )
      }
    />
  )
};

const mapStateToProps = state => ({
  getStoreToken: state.auth.currentToken,
});

export default connect(mapStateToProps, null)(withRouter(PrivateRoute));