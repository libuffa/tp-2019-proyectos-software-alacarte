import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import CuerpoItem from '../../components/cuerpoItem/CuerpoItem.js';
import Botones from '../../components/botones/Botones';
import './DetalleItemPedido.scss';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'

export default class DetalleItemPedido extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: this.props.location.state.pedido.cantidad,
      comentario: this.props.location.state.pedido.comentarios,
      itemCarta: this.props.location.state.pedido.itemCarta,
      history: this.props.location.state.history,
      pedido: this.props.location.state.pedido
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

  actualizarPedido = () => {
    ServiceLocator.SesionService.actualizarPedido({
      "idSesion": ControllerDeSesion.getSesionActiva(),
      "idPedido": this.state.pedido.id,
      "idItem": this.state.itemCarta.id,
      "cantidad": this.state.cantidad,
      "comentario": this.state.comentario,
    }).then(resultado => {
      if (resultado === "True") {
        this.props.history.push(`/pedido`)
      } else {
        console.log(resultado)
      }
    })
  }

  render() {
    const { itemCarta, cantidad, comentario, pedido } = this.state;

    if (!itemCarta) {
      return <div></div>
    }
    return <div>
      <PasadorDeImagenes
        imagenes={itemCarta.imagenes}
      />
      <CuerpoItem
        itemCarta={itemCarta}
        cantidad={cantidad}
        handlersCantidad={{ onChange: this.modificarCantidad }}
        handlersComentario={{ onChange: this.modificarComentario }}
        comentario={comentario}
        disabled={pedido.estado !== "Creado"}
      />
      <Botones
        disabled={pedido.estado !== "Creado"}
        text1="volver"
        text2="modificar"
        handlersVolver={{ onChange: this.verPedido }}
        handlersAgregarAPedido={{ onChange: this.actualizarPedido }}
      />
    </div>
  }
}