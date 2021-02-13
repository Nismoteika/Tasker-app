import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import AdjustIcon from '@material-ui/icons/Adjust';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
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
  pos: {
    marginBottom: 12,
  },
}));

function TaskCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.email == undefined ? "?" : props.email}
        </Typography>
        <Typography variant="h5" component="h3">
            {props.username == undefined ? "?" : props.username}
        </Typography>
        <Typography variant="body2" component="p">
          {props.text == undefined ? "?" : props.text}
        </Typography>
        <div style={{float: 'right'}}>
          { props.status === 1 ? 
              <CheckCircleOutlineIcon />
              :
              <AdjustIcon />
          }
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskCard;