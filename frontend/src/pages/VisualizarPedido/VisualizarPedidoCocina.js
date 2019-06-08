import React, { Component } from 'react'
import { Card, CardContent, Typography, List, Snackbar } from '@material-ui/core';
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
            this.actualizarPedidos()
        } catch (e) {
            const mensaje = await e.response.data
            this.generarError(mensaje)
        }
    }

    actualizar = (pedido) => {
        this.avanzarPedido(pedido)
    }

    async avanzarPedido(pedido) {
        try {
            const res = await ServiceLocator.SesionService.cambiarEstadoPedido(pedido)
            let error = ""
            error = await res.statusText

            if (res.status !== 200) {
                throw error
            }

            this.actualizarPedidos()
            
        } catch (e) {
            const mensaje = await e.response.data
            this.generarError(mensaje)
        }
    }
    
    async actualizarPedidos() {
        try {
            
            this.setState({
                errorMessage: ""
            })
            
            const pedidosJson = await ServiceLocator.SesionService.getPedidosCocina()
            this.setState({
                pedidos: pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson)),
            })
            console.log(this.state.pedidos)

        } catch (e) {
            const mensaje = await e.response.data
            this.generarError(mensaje)
        }
    }

    snackbarOpen() {
        return this.state.errorMessage
    }

    generarError(errorMessage) {
        this.setState({
            errorMessage: errorMessage
        })
    }

    render() {

        return (
            <div>
                <Card>
                    <CardContent><Typography variant="subtitle1">Pedidos Cocina</Typography></CardContent>
                </Card>
                <List>
                    {this.state.pedidos.map((pedido) => 
                    <ItemPedido key={pedido.id} pedido={pedido} handlers={{ onChange: this.actualizar }} />)}
                </List>
                <Snackbar
                    open={this.snackbarOpen()}
                    message={this.state.errorMessage}
                    autoHideDuration="4" />
            </div>
        )
    }
}
