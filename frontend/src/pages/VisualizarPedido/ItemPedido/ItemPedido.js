import React, { Component } from 'react'
import { Button, ListItemAvatar, Avatar, ListItemText, List } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
//import DeleteIcon from "@material-ui/icons/Delete"

export default class ItemPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pedido: this.props.pedido
    }
  }

  async cambioEstado() {
    try {
      const res = await this.service.cambiarEstadoPedido(this.state.pedido)
      let error = ""
      await res.text().then(data => error = data)

      if (res.status !== 200) {
        throw error
      }

      this.actualizarPedidos()

    } catch (e) {
      this.errorHandler(e)
    }
  }

  cambiarEstadoPedido() {
    this.cambioEstado()
  }

  render() {

    return (
      <div>
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
              onClick={() => this.cambiarEstadoPedido()}
              name="avanzar"
              size="small"
              variant="outlined"
              aria-label="Delete"
              color="primary" >
              <ArrowRightIcon />
            </Button>
          } />

        {/* {this.props.item} */}
        {/* ESTO VA PARA PEDIDOS CLIENTE, ESTE BRANCH TIENE PEDIDOS GENERICO
                    <ListItemText
                        primary={
                            <DeleteIcon />
                        }
                    /> */}
      </div>
    )
  }
}
