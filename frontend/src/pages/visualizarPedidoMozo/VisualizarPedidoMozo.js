import React, { Component } from 'react'
import { Typography, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ListaItemsPedido from '../../components/listaItemsPedido/ListaItemsPedido.js';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';
import { Sesion } from '../../domain/Sesion.js';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js';
import '../estilosPaginas.scss';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal.js';

export default class VisualizarPedidoMozo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: setInterval(() => { this.cargarPedidos(); }, 10000),
      open: false,
      sesion: null,
      sesionJson: null,
      openDelete: false,
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

  verDetalleMesa = () => {
    ControllerDeSesion.cerrarSesionActiva()
    ServiceLocator.mesaService.getMesa(this.state.sesion.idMesa).then((mesa) => {
      this.props.history.push({
        pathname: '/detalle/mesa',
        state: { mesa: mesa }
      })
    })
  }

  verDetalleItemPedido = (pedido) => {
    this.props.history.push({
      pathname: '/detalle/item/pedido',
      state: { pedido: pedido }
    })
  }

  verCartaCliente = () => {
    this.props.history.push("/carta/cliente")
  }

  getPrecioTotal() {
    if (this.state.pedidos.length > 0) {
      return this.state.pedidos.map((pedido) => (!pedido.premio && (pedido.cantidad * pedido.itemCarta.precioUnitario)))
        .reduce((a, b) => a + b)
    } else {
      return 0
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
            errorMessage: ""
          })
        }
      }).catch(error => {
        this.generarError(error.response.data.error)
      })
  }

  pedirCuenta = () => {
    this.pidiendoCuenta()
    this.open()
  }

  validarSesion() {
    return this.state.pideCuenta || this.state.fechaBaja !== null
  }

  open = () => {
    if (this.state.pideCuenta) {
      this.generarError("Ya se ha pedido la cuenta")
    } else {
      this.setState({
        open: !this.state.open
      })
      return this.state.open
    }
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
        onChange: this.verDetalleMesa,
        name: "Ver Detalle Mesa",
        icon: (<ArrowBack />)
      },
      secondButton: {
        onChange: this.verCartaCliente,
        name: "Agregar Pedido",
        icon: (<CartIcon />)
      },
      thirdButton: {
        onChange: this.open,
        name: "Pedir Cuenta",
        icon: (<MoneyIcon />),
        disabled: this.state.pideCuenta
      }
    }

    return (
      <div>
        <ListaItemsPedido
          pedidos={pedidos ? pedidos : []}
          handlers={{ onChange: this.eliminarPedido }}
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
            <CardContent>
            </CardContent>
          </Card>
        }
        {pedidos.length === 0 &&
          <div className="full botonCentrado separadorTop">
            <Typography variant="h4" color="textSecondary">{"No se realizaron pedidos"}</Typography>
          </div>
        }
        <DialogConfirmacion
          titulo={"Pedir Cuenta"}
          descripcion={"¿Estas seguro que deseas pedir la cuenta?"}
          handlers={{ onChange: this.pedirCuenta, open: this.open }}
          open={this.state.open}
        />
        <DialogConfirmacion
          titulo={"Aviso"}
          descripcion={"¿Esta seguro que desea eliminar el pedido?"}
          handlers={{ onChange: this.eliminarPedido, open: this.openDelete }}
          open={this.state.openDelete}
        />
        <MenuInferior menuButtons={menuButtons} />
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
      </div>
    )
  }
}