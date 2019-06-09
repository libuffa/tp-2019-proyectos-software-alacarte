import React, { Component } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"

export default class ItemPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pedido: this.props.pedido
    }
  }

  render() {
    return (
      <ListItem button disabled={this.props.disabled} >
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <ListItemAvatar>
              <Avatar src={this.state.pedido.itemCarta.imagenes[0]} />
            </ListItemAvatar>
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={this.state.pedido.itemCarta.titulo}
              secondary={"Cantidad: " + this.state.pedido.cantidad}
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              secondary={this.state.pedido.estado.replace('_', ' ')}
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <DeleteIcon
                  onClick={() => {
                    this.props.handlers.onChange(this.state.pedido)
                  }} />
              }
            />
          </Grid>
        </Grid>
      </ListItem>
    )
  }
}
