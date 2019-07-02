import React, { Component } from 'react'
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion.js'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import '../estilosPaginas.scss';
import ContenedorCuerpoItem from '../../components/contenedorCuerpoItem/ContenedorCuerpoItem.js';
import { CircularProgress } from '@material-ui/core';

export default class DetalleItemCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarta: null,
      idItemCarta: this.props.location.state ? this.props.location.state.idItem : null,
      history: this.props.location.state ? this.props.location.state.history : null,
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