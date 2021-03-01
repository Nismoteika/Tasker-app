import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AdjustIcon from '@material-ui/icons/Adjust';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(() => ({
  posSpan: {
    paddingTop: 2,
  },
  successCircle: {
    color: 'yellowgreen'
  }
}));

function GetStatus({ statusCode }) {
  const classes = useStyles();

  var completed = null;
  var edited = null;

  switch (statusCode) {
    case 0:
      completed = <AdjustIcon />;
      break;
    case 10:
      completed = <CheckCircleOutlineIcon className={classes.successCircle} />
      break;
    case 1:
      completed = <AdjustIcon />;
      edited = <span className={classes.posSpan}>отредактирована админом</span>;
      break;
    case 11:
      completed = <CheckCircleOutlineIcon className={classes.successCircle} />;
      edited = <span className={classes.posSpan}>отредактирована админом</span>;
      break;
    default:
      break;
  }
  return (
    <Grid container>
      <Grid item>
        {edited}
      </Grid>
      <Grid item>
        {completed}
      </Grid>
    </Grid>
  )
}

export default GetStatus;