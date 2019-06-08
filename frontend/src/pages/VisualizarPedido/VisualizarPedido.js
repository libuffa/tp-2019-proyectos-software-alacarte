import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedido';
import { Typography, Card, CardContent, Paper } from '@material-ui/core';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';
import './VisualizarPedido.scss';

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

  render() {
    const { pedidos } = this.state;

    if (!pedidos) {
      return <div></div>
    }
    return (
      <div>
        <Card>
          <CardContent><Typography variant="subtitle1">Tu Pedido</Typography></CardContent>
        </Card>
        <List>
          {pedidos.map((pedido) => {
            return <ItemPedido key={pedido.id} pedido={pedido} />
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
        <MenuInferior handlers={{ onChange: this.verCarta }} boton="VER CARTA" />
      </div>
    )
  }
}