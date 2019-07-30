import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
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
  root: {
    padding: theme.spacing(1, 2),
  },
}));

export default function Botones(props) {
  const { handlersVolver, handlersAgregarAPedido, text1, text2, disabled, eliminar } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <Button fullWidth variant="contained" color="primary" onClick={() => handlersVolver.onChange()}>
            <Typography variant="overline">
              {text1}
            </Typography>
            <ArrowBack className={classes.rightIcon} />
          </Button>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5} >
          <Button fullWidth disabled={disabled} variant="contained" color="primary" onClick={() => handlersAgregarAPedido.onChange()}>
            <Typography variant="overline">
              {text2}
            </Typography>
            {eliminar ?
              <DeleteIcon className={classes.rightIcon} /> :
              <LocalDining className={classes.rightIcon} />
            }
          </Button>
        </Grid>
      </Grid>
      <br/>
    </div>
  );
}