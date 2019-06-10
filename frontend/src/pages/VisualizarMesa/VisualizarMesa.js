import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ItemMesa from './ItemMesa/ItemMesa';
import { ServiceLocator } from '../../services/ServiceLocator';

export default class VisualizarMesa extends Component {

  constructor(props) {
    super(props)
    this.state = { mesas: [] };
  }

  componentDidMount = async () => {
    let mesas = await ServiceLocator.mesaService.getMesas();
    this.setState({ mesas });
  }

  render() {
    const { mesas } = this.state;
    
    return (
      <List>
        {mesas.map(mesa => <ItemMesa key={mesa.id} mesa={mesa} />)}
      </List>
    )
  }
}



