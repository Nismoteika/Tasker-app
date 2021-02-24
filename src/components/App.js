import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Router from './Router';
import { getLocalToken } from '../actions/AuthAction';

function App({ getLocalToken }) {
  useEffect(() => {
    getLocalToken();
  })

  return (
    <React.Fragment>
      <Header />
      <Router />
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  getLocalToken: () => dispatch(getLocalToken())
})

export default connect(null, mapDispatchToProps)(App);
