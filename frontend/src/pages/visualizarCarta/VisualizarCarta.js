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
      categorias: null,
    }
  }
  
  componentDidMount() {
    this.cargarCarta('Entrada')
    this.cargarCategorias()
  }
  
  cargarCarta(categoria) {
    categoria = categoria.replace(' ', '_');
    ServiceLocator.ItemsCartaService.getItemsCartaPorCategoria(categoria)
    .then( (carta) => {
      this.setState({
        carta,
      })
    })
  }

  cargarCategorias() {
    ServiceLocator.ItemsCartaService.getCategorias()
    .then( (categorias) => {
      this.setState({
        categorias,
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
    const { carta } = this.state
    var { categorias } = this.state

    if (!carta || !categorias) {
      return (<h3>Cargando..</h3>)
    } else {
      categorias = categorias.map( (categoria) => categoria.replace('_', ' ') )
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