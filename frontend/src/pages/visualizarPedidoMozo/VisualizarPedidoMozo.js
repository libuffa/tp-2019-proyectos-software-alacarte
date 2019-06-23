import React, { Component } from 'react'
import { Typography, Card, CardContent, Snackbar, Tooltip, IconButton } from '@material-ui/core';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Pedido } from '../../domain/Pedido';
import ListaItemsPedido from '../../components/listaItemsPedido/ListaItemsPedido.js';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';
import { Sesion } from '../../domain/Sesion.js';
import Error from '@material-ui/icons/Error';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js';

export default class VisualizarPedidoMozo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: setInterval(() => { this.cargarPedidos(); }, 10000),
      open: false,
      sesion: null,
      sesionJson: null,
    }
  }

  componentDidMount() {
    this.cargarPedidos()
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
    clearInterval(this.state.timer)
    ControllerDeSesion.cerrarSesionActiva()
    this.props.history.push('/mesas')
  }

  verDetalleItemPedido = (pedido) => {
    clearInterval(this.state.timer)
    this.props.history.push({
      pathname: '/detalle/item/pedido',
      state: { pedido: pedido }
    })
  }

  verCartaCliente = () => {
    clearInterval(this.state.timer)
    this.props.history.push("/carta/cliente")
  }

  getPrecioTotal() {
    if (this.state.pedidos.length > 0) {
      return this.state.pedidos.map((pedido) => pedido.cantidad * pedido.itemCarta.precioUnitario)
        .reduce((a, b) => a + b)
    } else {
      return 0
    }
  }

  snackbarOpen() {
    return this.state.errorMessage
  }

  generarError(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }

  actualizar = (pedido) => {
    this.bajarPedido(pedido)
  }

  async bajarPedido(pedido) {
    try {
      const res = await ServiceLocator.SesionService.bajaPedido(pedido)
      let error = ""
      error = await res.statusText

      if (res.status !== 200) {
        throw error
      }

      this.setState({
        errorMessage: ""
      })

      const pedidosJson = await ServiceLocator.SesionService.getPedidos()
      this.setState({
        pedidos: pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson)),
      })

    } catch (e) {
      const mensaje = await e.response.data.error
      this.generarError(mensaje)
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
    return this.state.fechaBaja !== null
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

  render() {
    const { pedidos, errorMessage } = this.state

    if (!pedidos) {
      return <div></div>
    }

    const menuButtons = {
      firstButton: {
        onChange: this.verDetalleMesa,
        name: "Mesas",
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
          handlers={{ onChange: this.actualizar }}
          handlersDetalleItemPedido={{ onChange: this.verDetalleItemPedido }}
          disabled={this.validarSesion()}
        />
        {pedidos ?
          <Card>
            <CardContent>
              <Typography className="precioFinal" variant="subtitle1">
                {
                  (this.state.pideCuenta) &&
                  <Tooltip
                    title="Ya se ha pedido la cuenta.. ¿Desea cancelar y seguir pidiendo?"
                    aria-label="Ya se ha pedido la cuenta.. ¿Desea cancelar y seguir pidiendo?">
                    <IconButton onClick={() => this.pidiendoCuenta()}>
                      <Error color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
                Precio final: {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(this.getPrecioTotal())}
              </Typography>
            </CardContent>
            <CardContent></CardContent>
            <CardContent>
              <MenuInferior menuButtons={menuButtons} />
            </CardContent>
          </Card>
          : <div></div>}
        <DialogConfirmacion
          titulo={"Pedir Cuenta"}
          descripcion={"¿Estas seguro que deseas pedir la cuenta?"}
          handlers={{ onChange: this.pedirCuenta, open: this.open }}
          open={this.state.open}
        />
        <Snackbar
          open={this.snackbarOpen()}
          message={errorMessage}
          autoHideDuration={4000} />
      </div>
    )
  }
}