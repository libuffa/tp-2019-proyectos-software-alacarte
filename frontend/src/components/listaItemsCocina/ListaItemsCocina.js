import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Error from '@material-ui/icons/Error';
import { ListItem, IconButton, Typography, ListItemText, List, ListItemSecondaryAction, Divider, ListSubheader } from '@material-ui/core';

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
  estado: {
    padding: theme.spacing(0, 2),
  },
}));

export default function ListaItemsCocina(props) {
  const classes = useStyles();
  const { pedidos, handlers } = props

  if (pedidos === null) {
    return <div></div>
  } else {
    return (
      <div className={classes.root}>
        <List className={classes.lista}>
          <Divider />
          <ListSubheader disableSticky color="inherit" key={-1}>
            <ListItemText primary="Pedidos Cocina" />
          </ListSubheader>
          <Divider />
          {pedidos.map((pedido) => {
            return (
              <ListItem key={pedido.id} button>
                <ListItemText
                  primary={pedido.comentarios === "" ?
                    pedido.itemCarta.titulo :
                    <div>{pedido.itemCarta.titulo + " "}
                      <Error color="error" fontSize="small" />
                    </div>}
                  secondary={"Cantidad: " + pedido.cantidad}
                />
                <ListItemText secondary={
                  <Typography color="textSecondary" align="right" className={classes.estado}>{pedido.estado.replace('_', ' ')}</Typography>
                } />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Comments" onClick={() => handlers.onChange(pedido.id)}>
                    <PlayCircleFilled color="primary" fontSize="large" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}