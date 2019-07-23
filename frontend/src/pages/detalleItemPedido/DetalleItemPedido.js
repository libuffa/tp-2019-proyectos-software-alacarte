import React, { Component } from 'react'
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import '../estilosPaginas.scss';
import ContenedorCuerpoItem from '../../components/contenedorCuerpoItem/ContenedorCuerpoItem.js';
import { CircularProgress } from '@material-ui/core';

export default class DetalleItemPedido extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: this.props.location.state ? this.props.location.state.pedido.cantidad : null,
      comentario: this.props.location.state ? this.props.location.state.pedido.comentarios : null,
      itemCarta: this.props.location.state ? this.props.location.state.pedido.itemCarta : null,
      history: this.props.location.state ? this.props.location.state.history : null,
      pedido: this.props.location.state ? this.props.location.state.pedido : null
    }
  }

  modificarCantidad = (modificador) => {
    if (this.state.cantidad + modificador <= 1) {
      this.setState({ cantidad: 1 })
    } else {
      this.setState({ cantidad: (this.state.cantidad + modificador) })
    }
  }

  modificarComentario = (texto) => {
    if (texto !== null && texto !== "") {
      this.setState({ comentario: texto })
    }
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  actualizarPedido = (cantidad, comentario) => {
    ServiceLocator.SesionService.actualizarPedido({
      "idSesion": ControllerDeSesion.getSesionActiva(),
      "idPedido": this.state.pedido.id,
      "idItem": this.state.itemCarta.id,
      "cantidad": cantidad,
      "comentario": comentario,
    }).then(resultado => {
      if (resultado === "True") {
        this.props.history.push(`/pedido`)
      } else {
        console.log(resultado)
      }
    })
  }

  render() {
    const { itemCarta, pedido } = this.state;
    const { cantidad, comentario } = this.state;

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
      <ContenedorCuerpoItem
        texto1="volver"
        texto2="modificar"
        cantidad={cantidad}
        comentario={comentario}
        itemCarta={itemCarta}
        handlersVolver={{ onChange: this.verPedido }}
        handlersAgregarAPedido={{ onChange: this.actualizarPedido }}
        disabled={pedido.estado !== "Creado"}
        premio={pedido.premio}
      />
    </div>
  }
}