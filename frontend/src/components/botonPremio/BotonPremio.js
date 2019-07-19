import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  add: {
    position: 'absolute',
    bottom: '52px',
    marginLeft: '-36.82px',
  },
}));

export default function BotonPremio(props) {
  const { handler } = props
  const classes = useStyles();

  return (
    <div className="fullWidth botonCentrado">
      <Fab variant="extended" size="small" color="primary" aria-label="Add" className={classes.add} onClick={() => handler.onChange()} >
        {"Premio"}
      </Fab>
    </div>
  );
}