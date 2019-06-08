import React, { Component } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"

export default class ItemPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pedido: this.props.pedido
    }
  }

  validarBaja() {
    return this.state.pedido.habilitado
  }

  render() {
    return (
      <ListItem button >
        <ListItemAvatar>
          <Avatar src={this.state.pedido.itemCarta.imagenes[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={this.state.pedido.itemCarta.titulo}
        />
        <ListItemText
          secondary={this.state.pedido.estado}
        />
        <ListItemText
          secondary={this.state.pedido.cantidad}
        />
        <ListItemText
          // disabled={!this.validarBaja()}
          primary={
            <DeleteIcon
              onClick={() => {
                // this.bajaPedido()
                this.props.handlers.onChange(this.state.pedido)
              }} />
          }
        />
      </ListItem>
    )
  }
}
