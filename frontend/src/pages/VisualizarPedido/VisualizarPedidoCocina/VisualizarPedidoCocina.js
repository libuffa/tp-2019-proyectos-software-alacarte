import React, { Component } from 'react'
import { Snackbar } from '@material-ui/core';
import { ServiceLocator } from '../../../services/ServiceLocator';
import ListaItemsCocina from '../../../components/listaItemsCocina/ListaItemsCocina';

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
        <ListaItemsCocina pedidos={pedidos} handlers={{ onChange: this.actualizarEstadoPedido }} />
        <Snackbar open={this.snackbarOpen()} message={errorMessage} autoHideDuration={4} />
      </div>
    )
  }
}
