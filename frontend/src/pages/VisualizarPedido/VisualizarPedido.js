import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedido';

export default class VisualizarPedido extends Component {

  render() {
    return (
      <List>
        {this.props.pedidos.map((pedido) => <ItemPedido key={pedido.id} pedido={pedido} item={this.props.item} />)}
      </List>
    )
  }
}