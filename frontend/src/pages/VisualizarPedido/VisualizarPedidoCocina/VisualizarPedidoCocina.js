import React, { Component } from 'react'
import { Snackbar } from '@material-ui/core';
import { ServiceLocator } from '../../../services/ServiceLocator';
import ListaItemsCocina from '../../../components/listaItemsCocina/ListaItemsCocina';
import MenuInferior from '../../../components/menuInferior/MenuInferior';
import Menu from '@material-ui/icons/Menu';

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

  verDetalleItemPedido = (pedido) => {
    clearInterval(this.state.timer)
    this.props.history.push({
      pathname: '/detalle/item/pedido/cocina',
      state: { pedido: pedido }
    })
  }

  verMenu = () => {
    clearInterval(this.state.timer)
    this.props.history.push('/menu/empleado')
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

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!pedidos) {
      return <div></div>
    }
    return (
      <div>
        <ListaItemsCocina pedidos={pedidos} handlers={{ onChange: this.actualizarEstadoPedido }} handlersDetalleItem={{ onChange: this.verDetalleItemPedido }} />
        <MenuInferior menuButtons={menuButtons} />
        <Snackbar open={this.snackbarOpen()} message={errorMessage} autoHideDuration={4} />
      </div>
    )
  }
}
