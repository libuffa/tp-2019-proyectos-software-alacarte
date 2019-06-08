import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItems from "../../components/listaItems/ListaItems";
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import CartIcon from '@material-ui/icons/ListAlt';

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
      .then((carta) => {
        this.setState({
          carta,
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

    const menuButtons = {
      firstButton:{
        onChange: this.verPedido,
        name: "Ver Pedido",
        icon: (<CartIcon />)
      },
    }

    return (
      <div>
        <CssBaseline />
        <MenuSuperior data={categorias} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
        <ListaItems data={carta} subData={this.subCategoriasCarta()} handlers={{ onChange: this.seleccionItemCarta }}></ListaItems>
        <MenuInferior menuButtons={menuButtons}></MenuInferior>
      </div>
    )
  }
}