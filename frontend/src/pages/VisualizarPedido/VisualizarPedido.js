import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedidoCocina';

export default class VisualizarPedido extends Component {

  render() {
    return (
      <div>
        {this.props.pedidos.map((pedido) => <ItemPedido key={pedido.id} pedido={pedido} item={this.props.item} />)}
      </div>
    )
  }
}