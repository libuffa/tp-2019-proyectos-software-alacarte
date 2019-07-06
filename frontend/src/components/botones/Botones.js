import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CartIcon from '@material-ui/icons/ListAlt';
import LocalDining from '@material-ui/icons/LocalDining';
import DeleteIcon from "@material-ui/icons/Delete";

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
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
  noBorder: {
    padding: '0',
    margin: '0',
    backgroundColor: '#fff',
  },
}));

export default function Botones(props) {
  const { handlersVolver, handlersAgregarAPedido, text1, text2, disabled, eliminar } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} className={classes.noBorder}>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => handlersVolver.onChange()}>
              {text1}
              <CartIcon className={classes.rightIcon} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.noBorder}>
          <div className={classes.buttonContainer}>
            <Button disabled={disabled} variant="contained" color="primary" className={classes.button} onClick={() => handlersAgregarAPedido.onChange()}>
              {text2}
              {eliminar ?
                <DeleteIcon className={classes.rightIcon} /> :
                <LocalDining className={classes.rightIcon} />
              }
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}