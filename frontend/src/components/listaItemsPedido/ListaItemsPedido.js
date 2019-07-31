import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import PanTool from "@material-ui/icons/PanTool";
import { ListItem, IconButton, Typography, ListItemAvatar, Avatar, ListItemText, List, ListItemSecondaryAction } from '@material-ui/core';
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
  listItemTitulo: {
    marginTop: '4px',
    marginBottom: '4px',
  },
  premio: {
    backgroundColor: '#d4c22691',
  }
}));

export default function ListaItemsPedido(props) {
  const classes = useStyles();
  const { pedidos, disabled, handlers, handlersDetalleItemPedido, llamarMozo, mozoLLamado } = props

  function validarBajaPedido(pedido) {
    return (((pedido.estado !== "Creado") && (ControllerDeEmpleado.getSesionActiva() === null)) || disabled)
  }

  return (
    <div className={classes.root}>
      <List className={classes.lista}>
        <div className="dividerLista" />
        <ListItem color="inherit" key={-1} className={classes.listItemTitulo}>
          <ListItemText primary="Tu Pedido" />
          {!ControllerDeEmpleado.getSesionActiva() &&
            <ListItemSecondaryAction>
              <IconButton disabled={mozoLLamado} color="primary" edge="end" aria-label="Comments" onClick={() => llamarMozo.onChange()}>
                <PanTool />
              </IconButton>
            </ListItemSecondaryAction>
          }
        </ListItem>
        <div className="dividerLista" />
        {pedidos ? pedidos.map((pedido) => {
          if (pedido.itemCarta.categoria === "Bebida") {
            return (
              <ListItem className={pedido.premio ? classes.premio : ""} key={pedido.id} button disabled={disabled} onClick={() => handlersDetalleItemPedido.onChange(pedido)}>
                <ListItemAvatar>
                  <Avatar
                    src={pedido.itemCarta.imagenes[0] ? pedido.itemCarta.imagenes[0] : "/imagenes/default.jpg"}
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
            )
          } else {
            return (<div key={pedido.id}></div>)
          }
        }) : <div></div>}
        {pedidos.some(pedido => pedido.itemCarta.categoria === "Bebida") && pedidos.some(pedido => pedido.itemCarta.categoria !== "Bebida") ? <div className="dividerLista" /> : ""}
        {pedidos ? pedidos.map((pedido) => {
          if (pedido.itemCarta.categoria !== "Bebida") {
            return (
              <ListItem className={pedido.premio ? classes.premio : ""} key={pedido.id} button disabled={disabled} onClick={() => handlersDetalleItemPedido.onChange(pedido)}>
                <ListItemAvatar>
                  <Avatar
                    src={pedido.itemCarta.imagenes[0] ? pedido.itemCarta.imagenes[0] : "/imagenes/default.jpg"}
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
            )
          } else {
            return (<div key={pedido.id}></div>)
          }
        }) : <div></div>}
      </List>
    </div>
  );
}