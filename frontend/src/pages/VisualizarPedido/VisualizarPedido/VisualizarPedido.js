import React, { Component } from 'react'
import List from '@material-ui/core/List';
import { Typography, Card, CardContent, Snackbar, Tooltip, IconButton } from '@material-ui/core';
import { ServiceLocator } from "../../../services/ServiceLocator.js";
import MenuInferior from '../../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import GamesIcon from '@material-ui/icons/Games';
import './VisualizarPedido.scss';
import { Pedido } from '../../../domain/Pedido';
import DialogConfirmacion from '../../../components/Dialog/DialogConfirmacion';
import ItemPedido from '../../../components/Item/ItemPedido/ItemPedido.js';
import { Sesion } from '../../../domain/Sesion.js';
import Error from '@material-ui/icons/Error';

export default class VisualizarPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idSesion: null,
      pedidos: null,
      fechaBaja: null,
      open: false,
      pideCuenta: true,
      sesion: {},
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

  verCarta = () => {
    this.props.history.push('/carta/' + this.props.match.params.id)
  }

  getPrecioTotal() {
    return this.state.pedidos.map((pedido) => pedido.cantidad * pedido.itemCarta.precioUnitario)
      .reduce((a, b) => a + b)
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
    ServiceLocator.SesionService.pedirCuenta(this.state.idSesion)
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
        onChange: this.verCarta,
        name: "Ver Carta",
        icon: (<CartIcon />)
      },
      secondButton: {
        onChange: null,
        name: "Jugar Juego",
        icon: (<GamesIcon />)
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
        <Card>
          <CardContent><Typography variant="subtitle1">Tu Pedido</Typography></CardContent>
        </Card>
        <List >
          {pedidos.map((pedido) => {
            return <ItemPedido
              key={pedido.id}
              pedido={pedido}
              handlers={{ onChange: this.actualizar }}
              disabled={this.validarSesion()} />
          })}
        </List>
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
        <DialogConfirmacion
          titulo={"Pedir Cuenta"}
          descripcion={"¿Estas seguro que deseas pedir la cuenta?"}
          handlers={{ onChange: this.pedirCuenta, open: this.open }}
          open={this.state.open}
        />
        <Snackbar
          open={this.snackbarOpen()}
          message={errorMessage}
          autoHideDuration={4} />
      </div>
    )
  }
}