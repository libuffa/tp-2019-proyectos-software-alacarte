import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Error from '@material-ui/icons/Error';
import { ListItem, ListItemAvatar, ListItemText, List, ListSubheader, Typography, ListItemSecondaryAction, IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  lista: {
    padding: theme.spacing(0, 0),
  },
  mesaOcupada: {
    color: '#ff0000bf',
  },
  mesaLibre: {
    color: '#03a524bf',
  }
}));

export default function ListaMesasMozo(props) {
  const { mesas } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.lista}>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Mesas"} />
        </ListSubheader>
        <div className="dividerLista" />
        {mesas.map((mesa) => {
          return (
            <ListItem button key={mesa.id}>
              <ListItemAvatar >
                <Typography variant="h5" className={mesa.sesion ? classes.mesaOcupada : classes.mesaLibre}>
                  {mesa.id}
                </Typography>
              </ListItemAvatar>
              <ListItemText secondary={mesa.sesion ? "Disponible" : "Ocupada"} />
              <ListItemSecondaryAction>
                <IconButton edge="end" >
                  <Error color="error" fontSize="large" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}