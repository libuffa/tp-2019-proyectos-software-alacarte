import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/menuSuperior/MenuSuperior";
import ListaItemsEmpleado from "../../components/listaItemsEmpleado/ListaItemsEmpleado";
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText } from '@material-ui/core';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado.js';

export default class VisualizarCartaEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categorias: null,
      categoria: 'Entrada',
      admin: null,
    }
  }

  componentDidMount() {
    this.cargarCarta(this.state.categoria)
    this.cargarCategorias()
    this.esAdministrador()
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
    if (this.state.admin) {
      this.props.history.push({
        pathname: '/formulario/item/carta',
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

  esAdministrador() {
    ServiceLocator.EmpleadoService.validarPermiso({ "id": ControllerDeEmpleado.getSesionActiva() })
      .then((respuesta) => {
        if (respuesta) {
          this.setState({
            admin: true,
          })
        } else {
          this.setState({
            admin: false,
          })
        }
      })
  }

  crearItemCarta() {
    this.props.history.push('/formulario/item/carta')
  }

  render() {
    const { carta, admin } = this.state
    var { categorias } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!carta || !categorias ) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
      categorias = categorias.map((categoria) => categoria.replace('_', ' '))
    }

    return (
      <div>
        <div className="contenedorLista">
          <MenuSuperior data={categorias} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
          <ListaItemsEmpleado 
            data={carta} 
            subData={this.subCategoriasCarta()} 
            handlers={{ onChange: this.seleccionItemCarta }} 
            disableFunction={{ onChange: this.cambiarEstadoItemCarta }}></ListaItemsEmpleado>
          {(admin) &&
            (<List>
              <ListItem button onClick={() => this.crearItemCarta()}>
                <ListItemAvatar >
                  <Avatar>
                    <Typography variant="h4" >
                      +
              </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Nuevo item"} />
              </ListItem>
            </List>)
          }
        </div>
        <MenuInferior menuButtons={menuButtons} />
      </div >
    )
  }
}