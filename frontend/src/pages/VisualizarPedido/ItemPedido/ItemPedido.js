import React, { Component } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
//import DeleteIcon from "@material-ui/icons/Delete"

export default class ItemPedido extends Component {

  render() {
    return (
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={this.props.pedido.itemCarta.imagenes[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={this.props.pedido.itemCarta.titulo}
        />
        <ListItemText
          secondary={this.props.pedido.estado}
        />
        <ListItemText
          secondary={this.props.pedido.cantidad}
        />
        {/* ESTO VA PARA PEDIDOS CLIENTE, ESTE BRANCH TIENE PEDIDOS GENERICO
        <ListItemText
            primary={
                <DeleteIcon />
            }
        /> */}
      </ListItem>
    )
  }
}
