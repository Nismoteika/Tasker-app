import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';

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

function Header(props) {
  const classes = useStyles();

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
              <Button color="inherit" component={Link} to="/login">Вход</Button>
              {/* <Button color="inherit" component={Link} to="/task/edit">Изменить задачу</Button> */}
            </div>
          </Toolbar>
      </Container>
    </AppBar>
  );
}

export default connect(null, { push })(Header);
