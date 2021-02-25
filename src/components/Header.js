import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/AuthAction';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function Header({ getStoreToken, logoutUser, push }) {
  const classes = useStyles();

  const handleLogout = () => {
    document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = '/login';
    logoutUser();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="md">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">
              Tasker-app
            </Typography>
            <div>
              <Button color="inherit" component={Link} to="/">Главная</Button>
              <Button color="inherit" component={Link} to="/task/add">Добавить задачу</Button>
              { getStoreToken === '' &&
                <Button color="inherit" component={Link} to="/login">Вход</Button> }
              { getStoreToken !== '' &&
                <Button color="inherit" onClick={handleLogout}>Выход</Button> }
              
            </div>
          </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  getStoreToken: state.auth.currentToken,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
