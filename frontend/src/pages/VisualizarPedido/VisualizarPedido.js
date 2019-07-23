import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import GamesIcon from '@material-ui/icons/Games';
import '../estilosPaginas.scss';
import ListaItemsPedido from '../../components/listaItemsPedido/ListaItemsPedido.js';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';
import { Sesion } from '../../domain/Sesion.js';
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
      idSesion: null,
      pedidos: null,
      fechaBaja: null,
      open: false,
      openDelete: false,
      pideCuenta: true,
      sesion: {},
      openDialog: false,
      mensajeDialog: "",
      tituloDialog: "",
      pedido: null,
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
    ServiceLocator.SesionService.getSesionActiva()
      .then((sesionJSON) => {
        const sesion = Sesion.fromJson(sesionJSON)
        return sesion
      }).then((_sesion) => {
        this.setState({
          pedidos: _sesion.pedidos.filter((pedido) => !pedido.cancelado),
          sesion: _sesion,
          idSesion: _sesion.id,
          fechaBaja: _sesion.fechaBaja,
          pideCuenta: _sesion.pideCuenta,
        })
      })
  }

  verCarta = () => {
    this.props.history.push('/carta')
  }

  verPremio = () => {
    this.props.history.push({
      pathname: '/detalle/item/carta',
      state: { idItem: 13, premio: true }
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
    if (this.state.pedidos.length > 0) {
      return this.state.pedidos.map((pedido) => (!pedido.premio && (pedido.cantidad * pedido.itemCarta.precioUnitario)))
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

  pidiendoCuenta() {
    ServiceLocator.SesionService.pedirCuenta(ControllerDeSesion.getSesionActiva())
      .then((respuesta) => {
        if (respuesta.status === 200) {
          this.cargarPedidos()
          this.setState({
            pideCuenta: !this.state.pideCuenta,
            mensaje: ""
          })
        }
      }).catch(error => {
        this.generarMensaje(error.response.data.error, "error")
      })
  }

  pedirCuenta = () => {
    this.pidiendoCuenta()
    this.open()
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

  validarSesion() {
    return this.state.pideCuenta || this.state.fechaBaja !== null
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

  render() {
    const { pedidos, mensaje, variant } = this.state

    if (!pedidos) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }

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
        onChange: this.open,
        name: "Pedir Cuenta",
        icon: (<MoneyIcon />),
        disabled: (this.state.pideCuenta || pedidos.length === 0)
      }
    }


    return (
      <div className="contenedorLista">
        <ListaItemsPedido
          pedidos={pedidos ? pedidos : []}
          handlers={{ onChange: this.eliminar }}
          handlersDetalleItemPedido={{ onChange: this.verDetalleItemPedido }}
          disabled={this.validarSesion()}
        />
        {pedidos.length > 0 &&
          <Card elevation={0}>
            <CardContent>
              <Typography className="botonCentrado" variant="subtitle1">
                {
                  (this.state.pideCuenta) &&
                  <Button color="secondary" size="small" onClick={() => this.pidiendoCuenta()}>
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