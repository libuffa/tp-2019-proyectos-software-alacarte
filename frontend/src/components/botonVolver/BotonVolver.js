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
    left: 0,
    fontSize: 20,
  },
  noBorder: {
    padding: '0',
    margin: '0',
    backgroundColor: '#fff',
  },
}));

export default function BotonVolver(props) {
  const { cancelar, text, disabled } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} className={classes.noBorder}>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button disabled={disabled} variant="contained" color="primary" className={classes.button} onClick={() => cancelar.onChange()}>
              {text}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}