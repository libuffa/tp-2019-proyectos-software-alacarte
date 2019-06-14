import React, { Component } from 'react'
import { Card, CardContent, Typography, List, Snackbar } from '@material-ui/core';
import { ServiceLocator } from '../../../services/ServiceLocator';
import ItemPedidoCocina from '../../../components/Item/ItemPedidoCocina/ItemPedidoCocina';

export default class VisualizarPedidoCocina extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pedidos: null,
      timer: setInterval(() => { this.cargarPedidos(); }, 10000),
    }
  }

  componentDidMount() {
    this.cargarPedidos()
  }

  cargarPedidos() {
    ServiceLocator.SesionService.getPedidosCocina()
      .then((pedidos) => {
        this.setState({
          pedidos,
        })
      })
  }

  cambiarEstadoPedido(idPedido) {
    try {
      ServiceLocator.SesionService.cambiarEstadoPedido(idPedido)
        .then((respuesta) => {
          if (respuesta.status === "True") {
            this.cargarPedidos()
          }
        })
    } catch (error) {
      this.generarError(error.response.data)
    }
  }

  actualizarEstadoPedido = (idPedido) => {
    this.cambiarEstadoPedido(idPedido)
  }

  snackbarOpen() {
    return this.state.errorMessage
  }

  generarError(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }


  render() {
    const { pedidos, errorMessage } = this.state

    if (!pedidos) {
      return <div></div>
    }
    return (
      <div>
        <Card>
          <CardContent><Typography variant="subtitle1">Pedidos Cocina</Typography></CardContent>
        </Card>
        <List>
          {pedidos.map((pedido) => {
            return <ItemPedidoCocina
              key={pedido.id}
              pedido={pedido}
              handlers={{ onChange: this.actualizarEstadoPedido }} />
          })}
        </List>
        <Snackbar open={this.snackbarOpen()} message={errorMessage} autoHideDuration={4} />
      </div>
    )
  }
}
