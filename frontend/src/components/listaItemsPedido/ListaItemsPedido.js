import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItem, IconButton, Typography, ListItemAvatar, Avatar, ListItemText, List, ListItemSecondaryAction, ListSubheader } from '@material-ui/core';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';

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

export default function ListaItemsPedido(props) {
  const classes = useStyles();
  const { pedidos, disabled, handlers, handlersDetalleItemPedido } = props

  function validarBajaPedido(pedido) {
    return (((pedido.estado !== "Creado") && (ControllerDeEmpleado.getSesionActiva() === null)) || disabled)
  }

  return (
    <div className={classes.root}>
      <List className={classes.lista}>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit" key={-1}>
          <ListItemText primary="Tu Pedido" />
        </ListSubheader>
        <div className="dividerLista" />
        {pedidos ? pedidos.map((pedido) => {
          return (
            <ListItem key={pedido.id} button disabled={disabled} onClick={() => handlersDetalleItemPedido.onChange(pedido)}>
              <ListItemAvatar>
                <Avatar
                  src={pedido.itemCarta.imagenes[0]}
                />
              </ListItemAvatar>
              <ListItemText
                primary={pedido.itemCarta.titulo}
                secondary={"Cantidad: " + pedido.cantidad}
              />
              <div className="fondoEstado"></div>
              <ListItemSecondaryAction>
                <IconButton edge="end" disabled={true}>
                  <Typography color="textSecondary">
                    {pedido.estado.replace('_', ' ')}
                  </Typography>
                </IconButton>
                <IconButton disabled={validarBajaPedido(pedido)} edge="end" aria-label="Comments" onClick={() => handlers.onChange(pedido)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        }) : <div></div>}
      </List>
    </div>
  );
}