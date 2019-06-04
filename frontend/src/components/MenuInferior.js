import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function MenuInferior(props) {
  const { handlers } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Button variant="outlined" color="inherit" onClick={() => handlers.onChange()}>
            Ver Pedido
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}