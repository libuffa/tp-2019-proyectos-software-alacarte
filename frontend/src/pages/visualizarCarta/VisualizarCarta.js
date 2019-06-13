import React, { Component } from 'react';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItems from "../../components/listaItems/ListaItems";
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import CartIcon from '@material-ui/icons/ListAlt';
import './VisualizarCarta.scss';

export default class VisualizarCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categorias: null,
      idSesion: this.props.match.params.id,
    }
  }

  componentDidMount() {
    this.cargarCarta('Entrada')
    this.cargarCategorias()
    if (this.props.match.params.id === 1) {
      this.cargarSesion()
    }
  }

  cargarSesion() {
    ServiceLocator.SesionService.getSesiones()
      .then((sesiones) => {
        const sesion = sesiones[0]
        const idSesion = sesion.id
        console.log(idSesion)
        this.setState({
          idSesion,
        })
      })
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

  seleccionItemCarta = (idItemCarta) => {
    this.props.history.push({
      pathname: '/detalleItemCarta',
      state: { idItem: idItemCarta }
    })
  }

  verPedido = () => {
    this.props.history.push('/pedido/' + this.state.idSesion)
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
      firstButton: {
        onChange: this.verPedido,
        name: "Ver Pedido",
        icon: (<CartIcon />)
      },
    }

    return (
      <div>
        <div className="contenedorLista">
          <MenuSuperior data={categorias} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
          <ListaItems data={carta} subData={this.subCategoriasCarta()} handlers={{ onChange: this.seleccionItemCarta }}></ListaItems>
        </div>
        <MenuInferior menuButtons={menuButtons}></MenuInferior>
      </div>
    )
  }
}