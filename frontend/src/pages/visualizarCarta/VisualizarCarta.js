import React, { Component } from 'react';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItems from "../../components/listaItems/ListaItems";
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import PedidoIcon from '@material-ui/icons/RestaurantMenu';
import '../estilosPaginas.scss';
import { CircularProgress, Typography } from '@material-ui/core';

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
    var cartaLocal = this.state.carta.filter((item) => item.habilitado)
    var subCategoriasMapeadoas = cartaLocal.map((itemCarta) => { return itemCarta.subCategoria })
    var subCategorias = new Set(subCategoriasMapeadoas)
    var arraySubCategorias = []
    subCategorias.forEach((subCategoria) => arraySubCategorias.push(subCategoria))
    return arraySubCategorias
  }

  seleccionEnMenuSuperior = (categoria) => {
    this.cargarCarta(categoria)
  }

  seleccionItemCarta = (idItemCarta) => {
    this.props.history.push({
      pathname: '/detalle/item/carta',
      state: { idItem: idItemCarta }
    })
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  render() {
    const { carta } = this.state
    var { categorias } = this.state

    if (!carta || !categorias) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
      categorias = categorias.map((categoria) => categoria.replace('_', ' '))
    }

    const menuButtons = {
      firstButton: {
        onChange: this.verPedido,
        name: "Ver Pedido",
        icon: (<PedidoIcon />)
      },
    }

    return (
      <div>
        <div className="contenedorLista">
          <MenuSuperior data={categorias} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
          {this.subCategoriasCarta().length === 0 &&
            <div className="full botonCentrado separadorTop">
              <Typography variant="h4" color="textSecondary">{"No se encontraron items"}</Typography>
            </div>}
          <ListaItems data={carta} subData={this.subCategoriasCarta()} handlers={{ onChange: this.seleccionItemCarta }}></ListaItems>
        </div>
        <MenuInferior menuButtons={menuButtons} ></MenuInferior>
      </div>
    )
  }
}