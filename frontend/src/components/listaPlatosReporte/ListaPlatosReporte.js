import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Star from '@material-ui/icons/Star';
import { ListItem, ListItemAvatar, ListItemText, List, ListSubheader, Typography, Avatar, ListItemSecondaryAction } from '@material-ui/core';

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
  empleadoActivo: {
    color: '#ffffff',
    backgroundColor: '#03a524bf',
  },
  empleadoInactivo: {
    color: '#ffffff',
    backgroundColor: '#ff0000bf',
  },
}));

export default function ListaPlatosReporte(props) {
  const { platos } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.lista}>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Ranking de items mas comprados"} />
        </ListSubheader>
        <div className="dividerLista" />
        {platos.map((plato) => {
          return (
            <ListItem key={plato.id}>
              <ListItemAvatar >
                <Avatar>
                  <Typography variant="h5" >
                    {platos.indexOf(plato) + 1}
                  </Typography>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={plato.titulo} secondary={"Veces Comprado: " + plato.vecesComprado} />
              <ListItemSecondaryAction>
                {platos.indexOf(plato) + 1 === 1 && <Star color="action" fontSize="large" />}
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}