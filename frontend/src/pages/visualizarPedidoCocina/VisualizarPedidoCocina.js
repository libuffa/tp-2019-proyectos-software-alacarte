import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import ListaItemsCocina from '../../components/listaItemsCocina/ListaItemsCocina';
import MenuInferior from '../../components/menuInferior/MenuInferior';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress } from '@material-ui/core';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';

export default class VisualizarPedidoCocina extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pedidos: null,
      timer: setInterval(() => { this.cargarPedidos(); }, 4000),
      mensaje: "",
      variant: "",
    }
  }

  componentDidMount() {
    this.cargarPedidos()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  cargarPedidos() {
    ServiceLocator.SesionService.getPedidosCocina()
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              pedidos: respuesta,
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  cambiarEstadoPedido(idPedido) {
    ServiceLocator.SesionService.cambiarEstadoPedido(idPedido)
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
            this.cargarPedidos()
          } else {
            this.cargarPedidos()
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
          this.cargarPedidos()
        }
      })
  }

  actualizarEstadoPedido = (idPedido) => {
    this.cambiarEstadoPedido(idPedido)
  }

  verDetalleItemPedido = (pedido) => {
    this.props.history.push({
      pathname: '/detalle/item/pedido/cocina',
      state: { pedido: pedido }
    })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  generarMensaje(mensaje, variant) {
    this.setState({
      mensaje,
      variant,
    })
  }

  snackbarOpen() {
    return this.state.mensaje !== ""
  }

  snackbarClose = () => {
    this.setState({
      mensaje: ""
    })
  }

  render() {
    const { pedidos, mensaje, variant } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!pedidos) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }
    return (
      <div className="contenedorLista">
        <ListaItemsCocina pedidos={pedidos} handlers={{ onChange: this.actualizarEstadoPedido }} handlersDetalleItem={{ onChange: this.verDetalleItemPedido }} />
        <MenuInferior menuButtons={menuButtons} />
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
      </div>
    )
  }
}
