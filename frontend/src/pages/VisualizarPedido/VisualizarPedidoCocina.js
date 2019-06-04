import React, { Component } from 'react'
import { FormControl, InputLabel, Select, Input, Card, CardContent, Typography, MenuItem, Button, List, ListItem } from '@material-ui/core';
import VisualizarPedido from './VisualizarPedido';
import { SesionService } from '../../services/SesionService';
import { Pedido } from '../../domain/Pedido';
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

export default class VisualizarPedidoCocina extends Component {

    constructor(props) {
        super(props)
        this.service = new SesionService()
        this.state = {
            pedidos: [],
            estados: [],
            estadoSeleccionado: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async componentWillMount() {
        try {
            const pedidosJson = await this.service.getPedidosCocina()
            const estadosJson = await this.service.getEstados()
            this.setState({
                pedidos: pedidosJson.map((pedidoJson) => Pedido.fromJson(pedidoJson)),
                estados: estadosJson
            })
        } catch (e) {
            this.errorHandler(e)
        }
    }

    errorHandler(errorMessage) {
        throw errorMessage
    }

    async handleChange(event, pedido) {
        const nuevoEstado = event.target.value
        this.setState({
            estadoSeleccionado: nuevoEstado
        })
        this.cambioEstado(pedido)
    }

    async cambioEstado(pedidoSeleccionado) {
        try {
            const res = await this.service.cambiarEstadoPedido(pedidoSeleccionado)
            let error = ""
            await res.text().then(data => error = data)

            if (res.status !== 200) {
                throw error
            }

            this.actualizarPedidos()

        } catch (e) {
            this.errorHandler(e)
        }
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

    cambiarEstadoPedido = (pedido) => {
        this.cambioEstado(pedido)
    }

    render() {

        // const listItem = (
        //     <FormControl >
        //         <InputLabel shrink>
        //             Estado
        //         </InputLabel>
        //         <Select
        //             value={this.state.estadoSeleccionado}
        //             onChange={this.handleChange}
        //             input={<Input name="estado" />}
        //             displayEmpty
        //             name="estado"
        //         >
        //             {this.state.estados.map((estado) => <MenuItem value={estado} >{estado}</MenuItem>)}
        //         </Select>
        //     </FormControl>
        // )

        const listItem = (pedido) => (
            <Button
                onClick={() => this.cambiarEstadoPedido(pedido)}
                name="avanzar"
                size="small"
                variant="outlined"
                aria-label="Delete"
                color="primary" >
                <ArrowRightIcon />
            </Button>
        )

        return (
            <div>
                <Card>
                    <CardContent><Typography variant="subtitle1">Pedidos Cocina</Typography></CardContent>
                </Card>
                <List>
                    <ListItem button alignItems="flex-end">
                        <VisualizarPedido pedidos={this.state.pedidos} item={listItem} handlers={{ onChange: this.cambiarEstadoPedido }} />
                        {this.state.pedidos.map((pedido) => <Button
                            onClick={() => this.cambiarEstadoPedido(pedido)}
                            name="avanzar"
                            size="small"
                            variant="outlined"
                            aria-label="Delete"
                            color="primary" >
                            <ArrowRightIcon />
                        </Button>)}
                    </ListItem>
                </List>
            </div>
        )
    }
}
