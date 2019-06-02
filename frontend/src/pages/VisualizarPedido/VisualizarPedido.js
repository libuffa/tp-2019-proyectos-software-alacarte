import React from 'react';
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedido';

export default function VisualizarPedido({ pedidos }) {
    return (
        <List>
            {pedidos && pedidos.map(pedido => <ItemPedido key={pedido.id} pedido={pedido} />)}
        </List>
    )
}