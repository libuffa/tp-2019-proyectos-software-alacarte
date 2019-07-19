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

export default class VisualizarPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: setInterval(() => { this.cargarPedidos(); }, 10000),
      idSesion: null,
      pedidos: null,
      fechaBaja: null,
      open: false,
      pideCuenta: true,
      sesion: {},
      openJuego: false,
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
      this.setState({
        openJuego: true
      })
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

      this.cargarPedidos()

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

  closeDialog = () => {
    this.setState({
      openJuego: false,
    })
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

  render() {
    const { pedidos } = this.state

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
          handlers={{ onChange: this.actualizar }}
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
          descripcion={"¿Estas seguro que deseas pedir la cuenta?"}
          handlers={{ onChange: this.pedirCuenta, open: this.open }}
          open={this.state.open}
        />
        <DialogVolver
          titulo={"Aviso"}
          descripcion={"Debe realizar al menos un pedido para jugar"}
          handlers={{ onChange: this.closeDialog }}
          open={this.state.openJuego}
        />
        <MenuInferior menuButtons={menuButtons} />
        {this.state.sesion.ganoPremio && <BotonPremio handler={{ onChange: this.verPremio }} />}
      </div>
    )
  }
}