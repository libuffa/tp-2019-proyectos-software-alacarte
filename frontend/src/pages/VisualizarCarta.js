import React, { Component } from 'react'
import { ServiceLocator } from "../services/ServiceLocator.js";

export default class VisualizarCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
    }
  }

  componentDidMount() {
    this.cargarCarta('PlatoPrincipal')
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
    return (
      <div>
        <h1>ACA VA LA PAGINA DE VER CARTA</h1>
      </div>
    )
  }
}