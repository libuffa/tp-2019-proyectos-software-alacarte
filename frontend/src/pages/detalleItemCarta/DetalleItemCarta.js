import React, { Component } from 'react'
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import '../estilosPaginas.scss';
import ContenedorCuerpoItem from '../../components/contenedorCuerpoItem/ContenedorCuerpoItem.js';
import ContenedorCuerpoItemPremio from '../../components/contenedorCuerpoItem/ContenedorCuerpoItemPremio.js';
import { CircularProgress } from '@material-ui/core';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal.js';

export default class DetalleItemCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarta: null,
      idItemCarta: this.props.location.state ? this.props.location.state.idItem : null,
      history: this.props.location.state ? this.props.location.state.history : null,
      premio: this.props.location.state ? this.props.location.state.premio : false,
      mensaje: "",
      variant: "",
    }
  }

  componentDidMount() {
    this.cargarItemCarta(this.state.idItemCarta)
  }

  cargarItemCarta(idItemCarta) {
    ServiceLocator.ItemsCartaService.getItemCarta(idItemCarta)
      .then((itemCarta) => {
        this.setState({
          itemCarta,
        })
      })
  }

  verCarta = () => {
    this.props.history.push('/carta')
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  agregarAPedido = (cantidad, comentario) => {
    ServiceLocator.SesionService.generarPedido({
      "idSesion": ControllerDeSesion.getSesionActiva(),
      "cantidad": cantidad,
      "comentario": comentario,
      "idItem": this.state.itemCarta.id
    }).then(respuesta => {
      if (respuesta) {
        if (respuesta.error) {
          this.generarMensaje(respuesta.error, "error")
        } else {
          this.props.history.push(`/pedido`)
        }
      } else {
        this.generarMensaje("Error en el servidor", "error")
      }
    })
  }

  reclamarPremio = (cantidad, comentario) => {
    ServiceLocator.SesionService.premio({
      "idSesion": ControllerDeSesion.getSesionActiva(),
      "cantidad": cantidad,
      "comentario": comentario,
      "idItem": this.state.itemCarta.id
    }).then(respuesta => {
      if (respuesta) {
        if (respuesta.error) {
          this.generarMensaje(respuesta.error, "error")
        } else {
          this.props.history.push(`/pedido`)
        }
      } else {
        this.generarMensaje("Error en el servidor", "error")
      }
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
    const { itemCarta, premio, mensaje, variant } = this.state;

    if (!itemCarta) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }
    return <div>
      <PasadorDeImagenes
        imagenes={itemCarta.imagenes}
      />
      {!premio &&
        <ContenedorCuerpoItem
          texto1="volver"
          texto2="pedir"
          cantidad={1}
          comentario=""
          itemCarta={itemCarta}
          handlersVolver={{ onChange: this.verCarta }}
          handlersAgregarAPedido={{ onChange: this.agregarAPedido }}
        />}
      {premio &&
        <ContenedorCuerpoItemPremio
          texto1="volver"
          texto2="pedir"
          cantidad={1}
          comentario=""
          itemCarta={itemCarta}
          handlersVolver={{ onChange: this.verPedido }}
          handlersAgregarAPedido={{ onChange: this.reclamarPremio }}
        />}
      <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
    </div>
  }
}