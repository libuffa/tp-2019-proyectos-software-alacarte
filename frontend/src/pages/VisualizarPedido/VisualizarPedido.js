import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedido';
import { Typography, Card, CardContent } from '@material-ui/core';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuInferior from '../../components/menuInferior/MenuInferior';

export default class VisualizarPedido extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pedidos: null,
    }
  }

  componentDidMount() {
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
        <MenuInferior handlers={{ onChange: this.verCarta }} boton="VER CARTA" />
      </div>
    )
  }
}