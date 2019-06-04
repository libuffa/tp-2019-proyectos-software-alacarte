import React, { Component } from 'react'
import { FormControl, InputLabel, Select, Input, Card, CardContent, Typography } from '@material-ui/core';
import VisualizarPedido from './VisualizarPedido';
import { SesionService } from '../../services/SesionService';
import { Pedido } from '../../domain/Pedido';

export default class VisualizarPedidoCocina extends Component {

    constructor(props) {
        super(props)
        this.service = new SesionService()
        this.state = { pedidos: [] }
      }
    
      async componentWillMount() {
        try {
          const pedidosJson = await this.service.getPedidosCocina();
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

        const listItem = (
            <FormControl >
                <InputLabel shrink htmlFor="age-label-placeholder">
                    Estado
                </InputLabel>
                <Select
                    // value={values.age}
                    // onChange={handleChange}
                    input={<Input name="age" id="age-label-placeholder" />}
                    displayEmpty
                    name="age"
                >
                    {/* <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
        )

        return (
            <div>
                <Card>
                    <CardContent><Typography variant="subtitle1">Pedidos Cocina</Typography></CardContent>
                </Card>
                <VisualizarPedido pedidos={this.state.pedidos} item={listItem} />
            </div>
        )
    }
}
