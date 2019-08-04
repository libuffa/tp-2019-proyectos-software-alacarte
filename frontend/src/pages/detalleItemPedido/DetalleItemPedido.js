import React, { Component } from 'react'
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import '../estilosPaginas.scss';
import ContenedorCuerpoItem from '../../components/contenedorCuerpoItem/ContenedorCuerpoItem.js';
import { CircularProgress } from '@material-ui/core';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal.js';

export default class DetalleItemPedido extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: this.props.location.state ? this.props.location.state.pedido.cantidad : null,
      comentario: this.props.location.state ? this.props.location.state.pedido.comentarios : null,
      itemCarta: this.props.location.state ? this.props.location.state.pedido.itemCarta : null,
      history: this.props.location.state ? this.props.location.state.history : null,
      pedido: this.props.location.state ? this.props.location.state.pedido : null,
      estado: this.props.location.state ? this.props.location.state.estado : null,
      idMesa: this.props.location.state ? this.props.location.state.idMesa : null,
      mensaje: "",
      variant: "",
    }
  }

  componentDidMount() {
    if (this.state.estado) {
      this.generarMensaje("Pedido entregado", "success")
    }
  }

  verPedido = () => {
    if (this.state.idMesa) {
      this.props.history.push({
        pathname: '/detalle/mesa',
        state: { mesa: this.state.idMesa }
      })
    } else if (this.state.estado) {
      this.props.history.push('/mesas')
    } else {
      this.props.history.push('/pedido')
    }
  }

  actualizarPedido = (cantidad, comentario, modificado) => {
    if (modificado) {
      ServiceLocator.SesionService.actualizarPedido({
        "idSesion": ControllerDeSesion.getSesionActiva(),
        "idPedido": this.state.pedido.id,
        "idItem": this.state.itemCarta.id,
        "cantidad": cantidad,
        "comentario": comentario,
      }).then(resultado => {
        if (resultado) {
          if (resultado.error) {
            this.generarMensaje(resultado.error, "error")
          } else {
            this.props.history.push(`/pedido`)
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
    } else {
      this.props.history.push(`/pedido`)
    }
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
    const { itemCarta, pedido } = this.state;
    const { cantidad, comentario, mensaje, variant } = this.state;

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
          <ContenedorCuerpoItem
            texto1="volver"
            texto2="modificar"
            cantidad={cantidad}
            comentario={comentario}
            itemCarta={itemCarta}
            handlersVolver={{ onChange: this.verPedido }}
            handlersAgregarAPedido={{ onChange: this.actualizarPedido }}
            disabled={pedido.estado !== "Creado" || this.state.estado}
            premio={pedido.premio}
          />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div>
      )
    }
  }
}