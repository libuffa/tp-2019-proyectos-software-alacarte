import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItemsEmpleado from "../../components/listaItemsEmpleado/ListaItemsEmpleado";
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class VisualizarCartaEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categorias: null,
      categoria: 'Entrada',
    }
  }

  componentDidMount() {
    this.cargarCarta(this.state.categoria)
    this.cargarCategorias()
  }

  cargarCarta(categoria) {
    categoria = categoria.replace(' ', '_');
    ServiceLocator.ItemsCartaService.getItemsCartaPorCategoria(categoria)
      .then((carta) => {
        this.setState({
          carta,
          categoria,
        })
      })
  }

  cargarCategorias() {
    ServiceLocator.ItemsCartaService.getCategorias()
      .then((categorias) => {
        this.setState({
          categorias,
        })
      })
  }

  subCategoriasCarta() {
    var subCategoriasMapeadoas = this.state.carta.map((itemCarta) => { return itemCarta.subCategoria })
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

  cambiarEstadoItemCarta = (itemCartaId) => {
    ServiceLocator.ItemsCartaService.updateEstadoItem(itemCartaId)
      .then((resultado) => {
        if (resultado == "True") {
          this.cargarCarta(this.state.categoria)
        }
      })
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  render() {
    const { carta } = this.state
    var { categorias } = this.state

    if (!carta || !categorias) {
      return <div></div>
    } else {
      categorias = categorias.map((categoria) => categoria.replace('_', ' '))
    }

    return (
      <div>
        <CssBaseline />
        <MenuSuperior data={categorias} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
        <ListaItemsEmpleado data={carta} subData={this.subCategoriasCarta()} handlers={{ onChange: this.seleccionItemCarta }} disableFunction={{ onChange: this.cambiarEstadoItemCarta }}></ListaItemsEmpleado>
      </div>
    )
  }
}