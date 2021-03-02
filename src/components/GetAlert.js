import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

function GetAlert({ state }) {
  var errors = [];
  if (state !== undefined) {
    const object = state;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const textAlert = object[key];
        errors.push(
          <Grid item key={key}>
            <Alert severity="error">{`${key}: ${textAlert}`}</Alert>
          </Grid>
        );
      }
    }
  }

  return (
    <Grid container style={{margin: 10}}>
        { errors.map(item => item) }
    </Grid>
  )
}

export default GetAlert;