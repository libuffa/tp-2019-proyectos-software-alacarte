import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/MenuSuperior";
import ListaItems from "../../components/ListaItems";
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuInferior from '../../components/MenuInferior.js';

export default class VisualizarCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categorias: ["Entrada", "Plato Principal", "Bebida", "Postre", "Cafeteria"],
    }
  }
  
  componentDidMount() {
    this.cargarCarta('Entrada')
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

  subCategoriasCarta() {
    var subCategoriasMapeadoas = this.state.carta.map( (itemCarta) => { return itemCarta.subCategoria })
    var subCategorias = new Set(subCategoriasMapeadoas)
    var arraySubCategorias = []
    subCategorias.forEach((subCategoria) => arraySubCategorias.push(subCategoria))
    return arraySubCategorias
  }

  seleccionEnMenuSuperior = (categoria) => {
    this.cargarCarta(categoria)
  }

  seleccionItemCarta = (itemCarta) => {
    this.subCategoriasCarta()
  }

  render() {
    const { carta, categorias } = this.state

    if (!carta) {
      return (<h3>Cargando..</h3>)
    }
    return (
      <div>
        <CssBaseline/>
        <MenuSuperior data={categorias} handlers={{onChange: this.seleccionEnMenuSuperior}}></MenuSuperior>
        <ListaItems data={carta} subData={this.subCategoriasCarta()} handlers={{onChange: this.seleccionItemCarta}}></ListaItems>
        <MenuInferior handlers={{onChange: this.seleccionItemCarta}}></MenuInferior>
      </div>
    )
  }
}