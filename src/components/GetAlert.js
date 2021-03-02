import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

function GetAlert({ state }) {
  var errors = [];
  if (state !== undefined) {
    const object = state;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const textAlert = object[key];
        errors.push(<Alert severity="error" key={key}>{`${key}: ${textAlert}`}</Alert>);
      }
    }
  }

  const items = errors.map(item => (<Grid item>{ item }</Grid>));
  return (
    <Grid container style={{margin: 10}}>
        { items }
    </Grid>
  )
}

export default GetAlert;