import React, { Component } from 'react'
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import './DetalleItemCarta.scss';
import ContenedorCuerpoItem from '../../components/contenedorCuerpoItem/ContenedorCuerpoItem.js';

export default class DetalleItemCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  verCarta = () => {
    this.props.history.push('/carta')
  }

  agregarAPedido = (cantidad, comentario) => {
    ServiceLocator.SesionService.generarPedido({
      "idSesion": ControllerDeSesion.getSesionActiva(),
      "cantidad": cantidad,
      "comentario": comentario,
      "idItem": this.state.itemCarta.id
    }).then(resultado => {
      if (resultado === "True") {
        this.props.history.push(`/pedido`)
      } else {
        console.log(resultado)
      }
    })
  }

  render() {
    const { itemCarta } = this.state;

    if (!itemCarta) {
      return <div></div>
    }
    return <div>
      <PasadorDeImagenes
        imagenes={itemCarta.imagenes}
      />
      <ContenedorCuerpoItem
        texto1="volver"
        texto2="pedir"
        cantidad={1}
        comentario=""
        itemCarta={itemCarta}
        handlersVolver={{ onChange: this.verCarta }}
        handlersAgregarAPedido={{ onChange: this.agregarAPedido }}
      />
    </div>
  }
}