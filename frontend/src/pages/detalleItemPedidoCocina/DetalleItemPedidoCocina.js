import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import CuerpoItemCocina from '../../components/cuerpoItemCocina/CuerpoItemCocina';
import Botones from '../../components/botones/Botones';
import '../estilosPaginas.scss';
import { CircularProgress } from '@material-ui/core';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal.js';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion.js';

export default class DetalleItemPedidoCocina extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: this.props.location.state ? this.props.location.state.pedido.cantidad : null,
      comentario: this.props.location.state ? this.props.location.state.pedido.comentarios : null,
      itemCarta: this.props.location.state ? this.props.location.state.pedido.itemCarta : null,
      history: this.props.location.state ? this.props.location.state.history : null,
      pedido: this.props.location.state ? this.props.location.state.pedido : null,
      mensaje: "",
      variant: "",
      openDelete: false,
    }
  }

  verPedidoCocina = () => {
    this.props.history.push('/pedido/cocina')
  }

  eliminarPedido = () => {
    if (!this.state.openDelete) {
      this.openDelete()
    } else {
      ServiceLocator.SesionService.bajaPedido(this.state.pedido)
        .then((respuesta) => {
          if (respuesta) {
            if (respuesta.error) {
              this.openDelete()
              this.generarMensaje(respuesta.error, "error")
            } else {
              this.openDelete()
              this.generarMensaje(respuesta, "success")
              this.verPedidoCocina()
            }
          } else {
            this.openDelete()
            this.generarMensaje("Error en el servidor", "error")
          }
        })
    }
  }

  openDelete = () => {
    this.setState({
      openDelete: !this.state.openDelete,
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
    const { itemCarta, cantidad, comentario, mensaje, variant, pedido } = this.state;

    if (!itemCarta) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
      return (
        <div>
          <PasadorDeImagenes
            imagenes={itemCarta.imagenes}
          />
          <CuerpoItemCocina
            itemCarta={itemCarta}
            cantidad={cantidad}
            comentario={comentario}
          />
          <Botones
            text1="volver"
            text2="eliminar"
            handlersVolver={{ onChange: this.verPedidoCocina }}
            handlersAgregarAPedido={{ onChange: this.eliminarPedido }}
            disabled={pedido.estado === "Finalizado"}
            eliminar={true}
          />
          <DialogConfirmacion
            titulo={"Aviso"}
            descripcion={"¿Esta seguro que desea eliminar el pedido?"}
            handlers={{ onChange: this.eliminarPedido, open: this.openDelete }}
            open={this.state.openDelete}
          />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div>
      )
    }
  }
}