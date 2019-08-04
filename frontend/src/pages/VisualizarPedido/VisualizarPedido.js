import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import GamesIcon from '@material-ui/icons/Games';
import '../estilosPaginas.scss';
import ListaItemsPedido from '../../components/listaItemsPedido/ListaItemsPedido.js';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js';
import { Card, CardContent, Typography, Button, CircularProgress } from '@material-ui/core';
import BotonPremio from '../../components/botonPremio/BotonPremio.js';
import DialogVolver from '../../components/Dialog/DialogVolver.js';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal.js';

export default class VisualizarPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: setInterval(() => { this.cargarPedidos(); }, 10000),
      idPremio: null,
      sesion: null,
      pedidos: [],
      open: false,
      openDelete: false,
      openDialog: false,
      tituloDialog: "",
      mensajeDialog: "",
      pedido: null,
      mensaje: "",
      variant: "",
    }
  }

  componentDidMount() {
    this.cargarPedidos()
    this.cargarPremio()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  cargarPedidos() {
    ServiceLocator.SesionService.getSesionActiva()
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              pedidos: respuesta.pedidos,
              sesion: respuesta,
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  cargarPremio() {
    ServiceLocator.ItemsCartaService.getPremio()
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              idPremio: respuesta.id,
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  verCarta = () => {
    this.props.history.push('/carta')
  }

  verPremio = () => {
    this.props.history.push({
      pathname: '/detalle/item/carta',
      state: { idItem: this.state.idPremio, premio: true }
    })
  }

  verDetalleItemPedido = (pedido) => {
    this.props.history.push({
      pathname: '/detalle/item/pedido',
      state: { pedido: pedido }
    })
  }

  verInstrucciones = () => {
    if (this.state.pedidos.length === 0) {
      this.openDialog("Aviso", "Debe realizar al menos un pedido para jugar")
    } else {
      this.props.history.push('/minijuego/Instrucciones')
    }
  }

  getPrecioTotal() {
    const { pedidos } = this.state
    if (pedidos.length > 0 && pedidos.some(pedido => pedido.estado !== "Cancelado")) {
      return pedidos.filter(pedido => pedido.estado !== "Cancelado").map((pedido) => (!pedido.premio && (pedido.cantidad * pedido.itemCarta.precioUnitario)))
        .reduce((a, b) => a + b)
    } else {
      return 0
    }
  }

  eliminar = (pedido) => {
    const premio = this.state.pedidos.filter((ped) => ped.id === pedido.id)
    if ((this.state.pedidos.some((ped) => ped.premio) && this.state.pedidos.length <= 2 && !premio[0].premio)) {
      this.openDialog("Aviso", "Debe eliminar el premio para poder eliminar este pedido")
    } else {
      this.eliminarPedido(pedido)
    }
  }

  eliminarPedido = (pedido) => {
    if (!this.state.openDelete) {
      this.openDelete(pedido)
    } else {
      ServiceLocator.SesionService.bajaPedido(this.state.pedido)
        .then((respuesta) => {
          if (respuesta) {
            if (respuesta.error) {
              this.openDelete(pedido)
              this.generarMensaje(respuesta.error, "error")
              this.cargarPedidos()
            } else {
              this.openDelete(pedido)
              this.generarMensaje(respuesta, "success")
              this.cargarPedidos()
            }
          } else {
            this.openDelete(pedido)
            this.generarMensaje("Error en el servidor", "error")
            this.cargarPedidos()
          }
        })
    }
  }

  cuenta() {
    ServiceLocator.SesionService.pedirCuenta(ControllerDeSesion.getSesionActiva())
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
            this.cargarPedidos()
          } else {
            this.generarMensaje(respuesta, "success")
            this.cargarPedidos()
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
          this.cargarPedidos()
        }
      })
  }

  pedirCuenta = () => {
    if (this.state.pedidos.length === 0) {
      this.openDialog("Aviso", "Debe tener al menos un pedido para solicitar la cuenta")
    } else {
      if (!this.state.open) {
        this.open()
      } else {
        this.cuenta()
        this.open()
      }
    }
  }

  llamarMozo = () => {
    ServiceLocator.SesionService.llamarMozo()
      .then(respuesta => {
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

  open = () => {
    this.setState({
      open: !this.state.open
    })
  }

  openDelete = (pedido) => {
    this.setState({
      openDelete: !this.state.openDelete,
      pedido: this.state.openDelete ? null : pedido,
    })
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

  openDialog(titulo, mensaje) {
    this.setState({
      tituloDialog: titulo,
      mensajeDialog: mensaje,
      openDialog: true,
    })
  }

  closeDialog = () => {
    this.setState({
      openDialog: false,
    })
  }

  render() {
    const { sesion, pedidos, mensaje, variant } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verCarta,
        name: "Ver Carta",
        icon: (<CartIcon />)
      },
      secondButton: {
        onChange: this.verInstrucciones,
        name: "Jugar Juego",
        icon: (<GamesIcon />),
      },
      thirdButton: {
        onChange: this.pedirCuenta,
        name: "Pedir Cuenta",
        icon: (<MoneyIcon />),
        disabled: (sesion ? sesion.pideCuenta : true)
      }
    }

    if (!pedidos || !sesion) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
          <MenuInferior menuButtons={menuButtons} />
        </div>
      )
    } else {
      return (
        <div className="contenedorLista">
          <ListaItemsPedido
            pedidos={pedidos ? pedidos : []}
            handlers={{ onChange: this.eliminar }}
            handlersDetalleItemPedido={{ onChange: this.verDetalleItemPedido }}
            disabled={sesion.pideCuenta || sesion.fechaBaja}
            llamarMozo={{ onChange: this.llamarMozo }}
            mozoLLamado={sesion.llamarMozo}
          />
          {pedidos.length > 0 &&
            <Card elevation={0}>
              <CardContent>
                <Typography className="botonCentrado" variant="subtitle1">
                  {
                    (sesion.pideCuenta) &&
                    <Button color="secondary" size="small" onClick={() => this.cuenta()}>
                      {"Cancelar Pedido cuenta"}
                    </Button>
                  }
                </Typography>
                <Typography className="precioFinal" variant="subtitle1">
                  Precio final: {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(this.getPrecioTotal())}
                </Typography>
                <br />
                <br />
              </CardContent>
            </Card>
          }
          {pedidos.length === 0 &&
            <div className="full botonCentrado separadorTop">
              <Typography variant="h4" color="textSecondary">{"No se realizaron pedidos"}</Typography>
            </div>
          }
          <DialogConfirmacion
            titulo={"Aviso"}
            descripcion={"¿Esta seguro que desea pedir la cuenta?"}
            handlers={{ onChange: this.pedirCuenta, open: this.open }}
            open={this.state.open}
          />
          <DialogConfirmacion
            titulo={"Aviso"}
            descripcion={"¿Esta seguro que desea eliminar el pedido?"}
            handlers={{ onChange: this.eliminarPedido, open: this.openDelete }}
            open={this.state.openDelete}
          />
          <DialogVolver
            titulo={this.state.tituloDialog}
            descripcion={this.state.mensajeDialog}
            handlers={{ onChange: this.closeDialog }}
            open={this.state.openDialog}
          />
          <MenuInferior menuButtons={menuButtons} />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
          {this.state.sesion.ganoPremio && <BotonPremio handler={{ onChange: this.verPremio }} />}
        </div>
      )
    }
  }
}