import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '6px',
    marginBottom: '6px',
    height: '45px',
    width: '150px',
  },
  buttonContainer: {
    padding: theme.spacing(1, 0),
    textAlign: 'center',
    fontSize: 20,
  },
  noBorder: {
    padding: '0',
    margin: '0',
    backgroundColor: '#fff',
  },
}));

export default function BotonesEmpleado(props) {
  const { cancelar, aceptar, text1, text2, disabled1, disabled2 } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} className={classes.noBorder}>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button disabled={disabled1} variant="contained" color="primary" className={classes.button} onClick={() => cancelar.onChange()}>
              {text1}
            </Button>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button disabled={disabled2} variant="contained" color="primary" className={classes.button} onClick={() => aceptar.onChange()}>
              {text2}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}