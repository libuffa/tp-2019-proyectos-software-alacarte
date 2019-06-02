import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/MenuSuperior";

export default class VisualizarCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categoria: 'Entrada',
      categorias: ["Entrada", "Plato Principal", "Bebida", "Postre", "Cafeteria"],
    }
  }
  
  componentDidMount() {
    this.cargarCarta(this.state.categoria)
  }
  
  cargarCarta(categoria) {
    categoria = categoria.replace(/\s/g, '');
    ServiceLocator.ItemsCartaService.getItemsCartaPorCategoria(categoria)
    .then( (carta) => {
      this.setState({
        carta,
      })
    })
  }

  seleccionEnMenuSuperior = (categoria) => {
    this.cargarCarta(categoria)
  }

  render() {
    const { carta, categorias } = this.state

    if (!carta) {
      return (<h3>Cargando..</h3>)
    }
    return (
      <div>
        <MenuSuperior handlers={{onChange: this.seleccionEnMenuSuperior}} data={categorias}></MenuSuperior>
        {carta.map( (itemCarta) => {
          return <h3 key={itemCarta.id}>{itemCarta.titulo}</h3>
        })}
      </div>
    )
  }
}