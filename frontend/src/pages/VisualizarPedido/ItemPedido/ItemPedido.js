import React, { Component } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"
import { ServiceLocator } from '../../../services/ServiceLocator';

export default class ItemPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pedido: this.props.pedido
    }
  }

  async bajaPedido() {
    try {
      const res = await ServiceLocator.SesionService.bajaPedido(this.state.pedido)
      let error = ""
      error = await res.statusText

      if (res.status !== 200) {
        throw error
      }

    } catch (e) {
      const mensaje = await e.response.data
      this.generarError(mensaje)
    }
  }

  generarError(errorMessage) {
    this.setState({
      errorMessage: errorMessage.toString()
    })
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
                this.bajaPedido()
                this.props.handlers.onChange(this.state.errorMessage)
              }} />
          }
        />
      </ListItem>
    )
  }
}
