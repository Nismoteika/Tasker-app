import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AdjustIcon from '@material-ui/icons/Adjust';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  posSpan: {
    paddingTop: 2,
  },
  successCircle: {
    color: 'yellowgreen'
  }
}));

function GetStatus({ statusCode }) {
  const classes = useStyles();

  switch (statusCode) {
    case 0:
      return <AdjustIcon />
    case 10:
      return <CheckCircleOutlineIcon className={classes.successCircle} />
    case 1:
      return (
        <Grid container>
          <span className={classes.posSpan}>отредактирована админом</span>
          <AdjustIcon />
        </Grid>
      );
    case 11:
      return (
        <Grid container>
          <span className={classes.posSpan}>отредактирована админом</span>
          <CheckCircleOutlineIcon className={classes.successCircle} />
        </Grid>
      );
    default:
      return <AdjustIcon />
  }
}

function TaskCard({ objectTask, getStoreToken }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {objectTask.email === undefined ? "?" : objectTask.email}
        </Typography>
        <Typography variant="h5" component="h3">
            {objectTask.username === undefined ? "?" : objectTask.username}
        </Typography>
        <Typography variant="body2" component="p">
          {objectTask.text === undefined ? "?" : objectTask.text}
        </Typography>
        { getStoreToken !== '' &&
            <Button variant="contained" color="primary" className={classes.linkEdit} component={Link} to={{ 
              pathname: `/task/edit/${objectTask.id}`,
              state: { objectTask: objectTask },
              }}>
              Редактировать {objectTask.id}
            </Button>
          }
        <div style={{float: 'right'}}>
          <GetStatus statusCode={objectTask.status} />
        </div>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = state => ({
  getStoreToken: state.auth.currentToken,
})

export default connect(mapStateToProps, null)(TaskCard);