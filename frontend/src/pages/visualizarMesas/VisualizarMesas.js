import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import ListaMesasMozo from '../../components/listaMesasMozo/ListaMesasMozo';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress } from '@material-ui/core';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';

export default class VisualizarMesas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: window.setInterval(() => { this.cargarMesas(); }, 4000),
      mesas: null,
      mensaje: "",
      variant: "",
    };
  }

  componentDidMount() {
    this.cargarMesas()
    ServiceLocator.EmpleadoService.limpiarNotificaciones().then()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  cargarMesas() {
    ServiceLocator.mesaService.getMesas()
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              mesas: respuesta,
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  entregarPedido = (pedido) => {
    ServiceLocator.SesionService.cambiarEstadoPedido(pedido.id)
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
            this.cargarMesas()
          } else {
            this.cargarMesas()
            ServiceLocator.EmpleadoService.limpiarNotificaciones()
              .then(respuesta => {
                if (respuesta) {
                  if (respuesta.error) {
                    this.generarMensaje(respuesta.error, "error")
                    this.cargarMesas()
                  } else {
                    this.props.history.push({
                      pathname: '/detalle/item/pedido',
                      state: { pedido: pedido, estado: true }
                    })
                  }
                } else {
                  this.generarMensaje("Error en el servidor", "error")
                  this.cargarMesas()
                }
              })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
          this.cargarMesas()
        }
      })
  }

  limpiarLLamadoMozo = (idSesion) => {
    ServiceLocator.SesionService.limpiarLlamadoMozo(idSesion)
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
            this.cargarMesas()
          } else {
            this.cargarMesas()
            ServiceLocator.EmpleadoService.limpiarNotificaciones()
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
          this.cargarMesas()
        }
      })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  verDetalleMesa = (mesa) => {
    this.props.history.push({
      pathname: '/detalle/mesa',
      state: { mesa: mesa.id }
    })
  }

  verItemPedido = (pedido) => {
    this.entregarPedido(pedido)
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
    const { mesas, mensaje, variant } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!mesas) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
      return (
        <div className="contenedorLista">
          <ListaMesasMozo mesas={mesas} limpiarLLamadoMozo={{ onChange: this.limpiarLLamadoMozo }} verItemPedido={{ onChange: this.verItemPedido }} handlers={{ onChange: this.verDetalleMesa }} />
          <MenuInferior menuButtons={menuButtons} />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div>
      )
    }
  }
}



