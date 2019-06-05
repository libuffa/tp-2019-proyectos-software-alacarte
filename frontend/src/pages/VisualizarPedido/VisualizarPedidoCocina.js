import React, { Component } from 'react'
import { FormControl, InputLabel, Select, Input, Card, CardContent, Typography, MenuItem, Button, List, ListItem } from '@material-ui/core';
import VisualizarPedido from './VisualizarPedido';
import { SesionService } from '../../services/SesionService';
import { Pedido } from '../../domain/Pedido';
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ItemPedido from './ItemPedido/ItemPedido';

export default class VisualizarPedidoCocina extends Component {

    constructor(props) {
        super(props)
        this.service = new SesionService()
        this.state = {
            pedidos: []
        }
    }

    async componentWillMount() {
        try {
            const pedidosJson = await this.service.getPedidosCocina()
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
            const pedidosJson = await this.service.getPedidosCocina()
            this.setState({
                pedidos: pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson)),
            })
        } catch (e) {
            this.errorHandler(e)
        }
    }

    actualizarPedidos = () => {
        this.actualizarPedidos()
    }

    render() {

        return (
            <div>
                <Card>
                    <CardContent><Typography variant="subtitle1">Pedidos Cocina</Typography></CardContent>
                </Card>
                <List>
                    <ListItem button alignItems="flex-end">
                        {this.state.pedidos.map((pedido) => <ItemPedido key={pedido.id} pedido={pedido} handler={ this.actualizarPedidos} />)}
                    </ListItem>
                </List>
            </div>
        )
    }
}
