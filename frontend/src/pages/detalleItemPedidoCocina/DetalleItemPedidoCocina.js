import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import CuerpoItemCocina from '../../components/cuerpoItemCocina/CuerpoItemCocina';
import Botones from '../../components/botones/Botones';
import '../estilosPaginas.scss';
import { CircularProgress } from '@material-ui/core';

export default class DetalleItemPedidoCocina extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: this.props.location.state ? this.props.location.state.pedido.cantidad : null,
      comentario: this.props.location.state ? this.props.location.state.pedido.comentarios : null,
      itemCarta: this.props.location.state ? this.props.location.state.pedido.itemCarta : null,
      history: this.props.location.state ? this.props.location.state.history : null,
      pedido: this.props.location.state ? this.props.location.state.pedido : null,
    }
  }

  verPedidoCocina = () => {
    this.props.history.push('/pedido/cocina')
  }

  eliminarPedido = () => {
    ServiceLocator.SesionService.bajaPedido(this.state.pedido)
      .then((respuesta) => {
        if (respuesta.status !== 200) {
          console.log(respuesta.error)
        } else {
          this.props.history.push('/pedido/cocina')
        }
      })
  }

  render() {
    const { itemCarta, cantidad, comentario } = this.state;

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
        disabled={false}
        eliminar={true}
      />
    </div>
  }
}