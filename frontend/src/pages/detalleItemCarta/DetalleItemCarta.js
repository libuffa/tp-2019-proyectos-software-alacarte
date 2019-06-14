import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import CuerpoItem from '../../components/cuerpoItem/CuerpoItem.js';
import Botones from '../../components/botones/Botones';
import './DetalleItemCarta.scss';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'

export default class DetalleItemCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: 1,
      comentario: "",
      itemCarta: null,
      idItemCarta: this.props.location.state.idItem,
      history: this.props.location.state.history,
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

  verCarta = () => {
    this.props.history.push('/carta')
  }

  agregarAPedido = () => {
    ServiceLocator.SesionService.generarPedido({
      "idSesion": ControllerDeSesion.getSesionActiva(),
      "cantidad": this.state.cantidad,
      "comentario": this.state.comentario,
      "idItem": this.state.itemCarta.id
    }).then(resultado => {
      if (resultado === "True") {
        this.props.history.push(`/pedido/${ControllerDeSesion.getSesionActiva()}`)
      } else {
        console.log(resultado)
      }
    })
  }

  render() {
    const { itemCarta, cantidad, comentario } = this.state;

    if (!itemCarta) {
      return <div></div>
    }
    return <div>
      <PasadorDeImagenes imagenes={itemCarta.imagenes} />
      <CuerpoItem
        itemCarta={itemCarta}
        cantidad={cantidad}
        comentario={comentario}
        handlersCantidad={{ onChange: this.modificarCantidad }}
        handlersComentario={{ onChange: this.modificarComentario }}
      />
      <Botones handlersVolver={{ onChange: this.verCarta }} handlersAgregarAPedido={{ onChange: this.agregarAPedido }} />
    </div>
  }
}