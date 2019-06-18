import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItemsEmpleado from "../../components/listaItemsEmpleado/ListaItemsEmpleado";
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';

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
    this.props.history.push({
      pathname: '/detalle/item/carta/empleado',
      state: { itemCarta: itemCarta }
    })
  }

  cambiarEstadoItemCarta = (itemCartaId) => {
    ServiceLocator.ItemsCartaService.updateEstadoItem(itemCartaId)
      .then((resultado) => {
        if (resultado === "True") {
          this.cargarCarta(this.state.categoria)
        }
      })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  render() {
    const { carta } = this.state
    var { categorias } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu/>)
      },
    }

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
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}