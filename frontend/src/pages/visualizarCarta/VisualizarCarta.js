import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/MenuSuperior";

export default class VisualizarCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categoria: "Entrada",
    }
  }
  
  componentDidMount() {
    this.cargarCarta(this.state.categoria)
  }
  
  cargarCarta(categoria) {
    ServiceLocator.ItemsCartaService.getItemsCartaPorCategoria(categoria)
    .then( (carta) => {
      this.setState({
        carta,
      })
    })
  }

  render() {
    const { carta } = this.state

    if (!carta) {
      return (<h3>Cargando..</h3>)
    }
    return (
      <div>
        <MenuSuperior></MenuSuperior>
      </div>
    )
  }
}