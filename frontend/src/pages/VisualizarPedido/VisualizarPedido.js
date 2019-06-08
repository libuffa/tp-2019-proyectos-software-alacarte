import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedido';
import { Typography, Card, CardContent, Paper, Snackbar } from '@material-ui/core';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import CheckIcon from '@material-ui/icons/Check';
import GamesIcon from '@material-ui/icons/Games';
import './VisualizarPedido.scss';
import { Pedido } from '../../domain/Pedido';

export default class VisualizarPedido extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pedidos: null,
    }
  }

  componentWillMount() {
    this.cargarPedidos()
  }

  cargarPedidos() {
    ServiceLocator.SesionService.getPedidos()
      .then((pedidos) => {
        this.setState({
          pedidos,
        })
      })
  }

  verCarta = () => {
    this.props.history.push('/carta')
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
      const mensaje = await e.response.data
      this.generarError(mensaje)
    }
  }

  render() {
    const { pedidos } = this.state;

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
        onChange: this.verCarta,
        name: "Jugar Juego",
        icon: (<GamesIcon />)
      },
      thirdButton: {
        onChange: this.verCarta,
        name: "Pedir Cuenta",
        icon: (<CheckIcon />)
      }
    }

    return (
      <div>
        <Card>
          <CardContent><Typography variant="subtitle1">Tu Pedido</Typography></CardContent>
        </Card>
        <List>
          {pedidos.map((pedido) => {
            return <ItemPedido key={pedido.id} pedido={pedido} handlers={{ onChange: this.actualizar }} />
          })}
        </List>
        <Paper>
          <Typography className="precioFinal" variant="subtitle1">
            Precio final: {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(this.getPrecioTotal())}
          </Typography>
        </Paper>
        <MenuInferior menuButtons={menuButtons} />
        <Snackbar
          open={this.snackbarOpen()}
          message={this.state.errorMessage}
          autoHideDuration="4" />
      </div>
    )
  }
}