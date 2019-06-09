import React, { Component } from 'react'
import { ListItemSecondaryAction, IconButton, ListItemText, ListItem, Grid } from '@material-ui/core';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Error from '@material-ui/icons/Error';
import './ItemPedidoCocina.scss'

export default class ItemPedidoCocina extends Component {
  render() {
    const { pedido, handlers } = this.props

    return (
      <ListItem button>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <ListItemText
              primary={pedido.comentarios === "" ? pedido.itemCarta.titulo :
                <div>
                  {pedido.itemCarta.titulo + " "}
                  <Error color="error" fontSize="small" />
                </div>
              }
              secondary={"Cantidad: " + pedido.cantidad} />
          </Grid>
          <Grid item xs={5}>
            <ListItemText secondary={
              <IconButton disabled>
                <div className="contenedorEstado">{pedido.estado.replace('_', ' ')}</div>
              </IconButton>
            } />
            <ListItemText primary={
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Comments" onClick={() => handlers.onChange(pedido.id)}>
                  <PlayCircleFilled color="primary" fontSize="large" />
                </IconButton>
              </ListItemSecondaryAction>
            } />
          </Grid>
        </Grid>
      </ListItem>
    )
  }
}
