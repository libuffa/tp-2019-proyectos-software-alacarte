import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItemsEmpleado from "../../components/listaItemsEmpleado/ListaItemsEmpleado";
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress } from '@material-ui/core';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal.js';

export default class VisualizarCartaEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categorias: null,
      categoria: 'Entrada',
      empleado: null,
      mensaje: "",
      variant: "",
    }
  }

  componentDidMount() {
    this.cargarCarta(this.state.categoria)
    this.cargarCategorias()
    this.cargarEmpleado()
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

  cargarEmpleado() {
    ServiceLocator.EmpleadoService.getEmpleado()
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              empleado: respuesta
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
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
    if (this.state.empleado.tipoEmpleado === "Administrador") {
      this.props.history.push({
        pathname: '/detalle/item/carta/admin',
        state: { idItemCarta: itemCarta.id }
      })
    } else {
      this.props.history.push({
        pathname: '/detalle/item/carta/empleado',
        state: { itemCarta: itemCarta }
      })
    }
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

  generarMensaje(mensaje, variant) {
    this.setState({
      mensaje,
      variant
    })
  }

  snackbarOpen() {
    return this.state.mensaje !== ""
  }

  snackbarClose = () => {
    this.setState({
      mensaje: ""
    })
  }

  render() {
    const { carta, mensaje, variant } = this.state
    var { categorias } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!carta || !categorias) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
          <MenuInferior menuButtons={menuButtons} />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div>
      )
    } else {
      categorias = categorias.map((categoria) => categoria.replace('_', ' '))

      return (
        <div>
          <div className="contenedorLista">
            <MenuSuperior data={categorias} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
            <ListaItemsEmpleado data={carta} subData={this.subCategoriasCarta()} handlers={{ onChange: this.seleccionItemCarta }} disableFunction={{ onChange: this.cambiarEstadoItemCarta }}></ListaItemsEmpleado>
          </div>
          <MenuInferior menuButtons={menuButtons} />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div>
      )
    }
  }
}