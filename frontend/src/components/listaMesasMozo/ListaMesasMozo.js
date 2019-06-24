import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Error from '@material-ui/icons/Error';
import MoneyIcon from '@material-ui/icons/AttachMoney';
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
  const { mesas, handlers, entregarPedido } = props;
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
            <ListItem button key={mesa.id} onClick={() => handlers.onChange(mesa)}>
              <ListItemAvatar >
                <Typography variant="h5" className={mesa.sesion ? classes.mesaOcupada : classes.mesaLibre}>
                  {mesa.id}
                </Typography>
              </ListItemAvatar>
              <ListItemText secondary={mesa.sesion ? "Ocupada" : "Disponible"} />
              {mesa.sesion ? mesa.sesion.pideCuenta ?
                <MoneyIcon color="error" fontSize="large" /> : "" : ""
              }
              {mesa.sesion ? mesa.sesion.pedidos.some((pedido) => pedido.estado === "Finalizado") ?
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => entregarPedido.onChange(mesa.sesion.pedidos.filter((pedido) => pedido.estado === "Finalizado")[0].id)}>
                    <Error color="error" fontSize="large" />
                  </IconButton>
                </ListItemSecondaryAction> : "" : ""
              }
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}