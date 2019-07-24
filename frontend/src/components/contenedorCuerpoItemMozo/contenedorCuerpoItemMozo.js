import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import CartIcon from '@material-ui/icons/ListAlt';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import CuerpoItemMozo from '../../components/cuerpoItemMozo/CuerpoItemMozo.js';
import DialogConfirmacion from '../Dialog/DialogConfirmacion.js';
import SnackBarPersonal from '../snackBarPersonal/SnackBarPersonal.js';

export default class ContenedorCuerpoItemMozo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarta: this.props.itemCarta,
      estado: this.props.itemCarta.habilitado,
      open: false,
      mensaje: "",
      variant: "",
    }
  }

  cambiarEstadoItemCarta = () => {
    ServiceLocator.ItemsCartaService.updateEstadoItem(this.props.itemCarta.id)
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              estado: !this.state.estado
            })
            this.generarMensaje(respuesta, "success")
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  verCarta = () => {
    this.props.history.push('/carta');
  }

  deshabilitar = () => {
    if (!this.state.open && this.state.estado) {
      this.open()
    } else {
      this.cambiarEstadoItemCarta()
      if (this.state.open) {
        this.open()
      }
    }
  }

  open = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  generarMensaje(mensaje, variant) {
    this.setState({
      mensaje,
      variant,
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
    const { estado, itemCarta, mensaje, variant } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verCarta,
        name: "Ver carta",
        icon: (<CartIcon />)
      },
    }

    if (!itemCarta) {
      return <div></div>
    }
    return (
      <div>
        <CuerpoItemMozo
          itemCarta={itemCarta}
          estado={estado}
          disableFunction={{ onChange: this.deshabilitar }}
        />
        <MenuInferior
          menuButtons={menuButtons}
        />
        <DialogConfirmacion
          titulo={"Aviso"}
          descripcion={"¿Esta seguro que desea deshabilitar el plato?"}
          handlers={{ onChange: this.deshabilitar, open: this.open }}
          open={this.state.open}
        />
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
      </div>
    )
  }
}