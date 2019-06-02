import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemPedido from './ItemPedido/ItemPedido';
import { Typography, Card, CardContent } from '@material-ui/core';
import { SesionService } from '../../services/SesionService';
import { Pedido } from '../../domain/Pedido';

export default class VisualizarCarta extends Component {

    constructor(props) {
        super(props)
        this.service = new SesionService()
        this.state = { pedidos: [] }
    }

    async componentWillMount() {
        try {
            const pedidosJson = await this.service.getPedidos()
            // const _pedidos = pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson))
            // console.log(_pedidos)
            this.setState({
                pedidos: pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson))
            })
        } catch (e) {
            this.errorHandler(e)
        }
    }

    errorHandler(errorMessage) {
        throw errorMessage
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent><Typography variant="subtitle1">Tu Pedido</Typography></CardContent>
                </Card>
                <List>
                    {this.state.pedidos.map((pedido) => <ItemPedido key={pedido.id} pedido={pedido} />)}
                </List>
            </div>
        )
      }
}