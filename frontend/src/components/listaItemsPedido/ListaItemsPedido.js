import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItem, IconButton, Typography, ListItemAvatar, Avatar, ListItemText, List, ListItemSecondaryAction, Divider, ListSubheader } from '@material-ui/core';

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
  const { pedidos, disabled, handlers } = props

  if (pedidos === null) {
    return <div></div>
  } else {
    return (
      <div className={classes.root}>
        <List className={classes.lista}>
          <Divider />
          <ListSubheader disableSticky color="inherit" key={-1}>
            <ListItemText primary="Tu Pedido" />
          </ListSubheader>
          <Divider />
          {pedidos.map((pedido) => {
            return (
              <ListItem key={pedido.id} button disabled={disabled}>
                <ListItemAvatar>
                  <Avatar
                    src={pedido.itemCarta.imagenes[0]}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={pedido.itemCarta.titulo}
                  secondary={"Cantidad: " + pedido.cantidad}
                />
                <ListItemText
                  secondary={
                    <Typography
                      color="textSecondary"
                      align="right"
                      className={classes.estado}
                    >
                      {pedido.estado.replace('_', ' ')}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Comments" onClick={() => handlers.onChange(pedido)}>
                    <DeleteIcon />
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