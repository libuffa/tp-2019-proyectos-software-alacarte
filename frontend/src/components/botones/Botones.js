import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CartIcon from '@material-ui/icons/ListAlt';
import LocalDining from '@material-ui/icons/LocalDining';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    height: '45px',
    width: '150px',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  buttonContainer: {
    padding: theme.spacing(1, 0),
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
  noBorder: {
    padding: '0',
    margin: '0',
  },
}));

export default function IconLabelButtons(props) {
  const { handlersVolver, handlersAgregarAPedido } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} className={classes.noBorder}>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => handlersVolver.onChange()}>
              Volver
              <CartIcon className={classes.rightIcon} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => handlersAgregarAPedido.onChange()}>
              Pedir
              <LocalDining className={classes.rightIcon} />
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}