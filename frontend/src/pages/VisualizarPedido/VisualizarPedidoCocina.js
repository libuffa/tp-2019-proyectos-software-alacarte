import React, { Component } from 'react'
import { Card, CardContent, Typography, List } from '@material-ui/core';
import { Pedido } from '../../domain/Pedido';
import ItemPedido from './ItemPedido/ItemPedidoCocina';
import { ServiceLocator } from '../../services/ServiceLocator';

export default class VisualizarPedidoCocina extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pedidos: []
        }
    }

    async componentWillMount() {
        try {
            const pedidosJson = await ServiceLocator.SesionService.getPedidosCocina()
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

    async actualizarPedidos() {
        try {
            const pedidosJson = await ServiceLocator.SesionService.getPedidosCocina()
            this.setState({
                pedidos: pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson)),
            })
        } catch (e) {
            this.errorHandler(e)
        }
    }

    actualizar = () => {
        this.actualizarPedidos()
    }

    render() {

        return (
            <div>
                <Card>
                    <CardContent><Typography variant="subtitle1">Pedidos Cocina</Typography></CardContent>
                </Card>
                <List>
                    {this.state.pedidos.map((pedido) => <ItemPedido key={pedido.id} pedido={pedido} handlers={{ onChange: this.actualizar }}/>)}
                </List>
            </div>
        )
    }
}
