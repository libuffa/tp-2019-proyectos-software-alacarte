import React from 'react'
import { ListItemSecondaryAction, IconButton, ListItemText, ListItem, Typography } from '@material-ui/core';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Error from '@material-ui/icons/Error';
import './ItemPedidoCocina.scss'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  estado: {
    padding: theme.spacing(0, 2),
  },
}));

export default function ItemPedidoCocina(props) {
  const classes = useStyles();
  const { pedido, handlers } = props

  return (
    <ListItem button>
      <ListItemText
        primary={pedido.comentarios === "" ? pedido.itemCarta.titulo : <div>{pedido.itemCarta.titulo + " "}<Error color="error" fontSize="small" /></div>}
        secondary={"Cantidad: " + pedido.cantidad} />
      <ListItemText secondary={
        <Typography color="textSecondary" align="right" className={classes.estado}>{pedido.estado.replace('_', ' ')}</Typography>
      } />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Comments" onClick={() => handlers.onChange(pedido.id)}>
          <PlayCircleFilled color="primary" fontSize="large" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}