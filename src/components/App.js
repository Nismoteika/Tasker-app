import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Router from './Router';
import { getCookieToken } from '../actions/AuthAction';

function App({ getCookieToken }) {
  useEffect(() => {
    getCookieToken();
  })

  return (
    <React.Fragment>
      <Header />
      <Router />
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  getCookieToken: () => dispatch(getCookieToken())
})

export default connect(null, mapDispatchToProps)(App);
