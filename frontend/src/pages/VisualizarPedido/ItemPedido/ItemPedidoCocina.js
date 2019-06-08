import React, { Component } from 'react'
import { Button, ListItemAvatar, Avatar, ListItemText, ListItem } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { ServiceLocator } from '../../../services/ServiceLocator';
import { Pedido } from '../../../domain/Pedido';

export default class ItemPedidoCocina extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pedido: this.props.pedido
    }
  }

  async actualizarPedido() {
    try {
      const pedidoJson = await ServiceLocator.SesionService.getPedido(this.state.pedido.id)
      console.log(pedidoJson)
      this.setState({
        pedido: Pedido.fromJson(pedidoJson)
      })
    } catch (e) {
      this.errorHandler(e)
    }
  }

  errorHandler(errorMessage) {
    throw errorMessage
}

  render() {

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={this.state.pedido.itemCarta} src={this.state.pedido.itemCarta.imagenes[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={this.state.pedido.itemCarta.titulo}
          secondary={this.state.pedido.estado}
        />
        <ListItemText
          primary={
            <Button
              onClick={() => {
                this.props.handlers.onChange(this.state.pedido)
                this.actualizarPedido()
              }}
              name="avanzar"
              size="small"
              variant="outlined"
              aria-label="Delete"
              color="primary" >
              <ArrowRightIcon />
            </Button>
          } />
      </ListItem>
    )
  }
}
