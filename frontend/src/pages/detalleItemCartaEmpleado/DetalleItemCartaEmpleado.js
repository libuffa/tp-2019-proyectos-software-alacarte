import React, { Component } from 'react'
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import '../estilosPaginas.scss';
import ContenedorCuerpoItemMozo from '../../components/contenedorCuerpoItemMozo/contenedorCuerpoItemMozo.js';

export default class DetalleItemCartaEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarta: this.props.location.state.itemCarta,
    }
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
      <ContenedorCuerpoItemMozo
        itemCarta={itemCarta}
        history={this.props.history}
      />
    </div>
  }
}