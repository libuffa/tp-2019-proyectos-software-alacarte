import React, { Component } from 'react'
import CuerpoItem from '../../components/cuerpoItem/CuerpoItem.js';
import Botones from '../../components/botones/Botones';

export default class ContenedorCuerpoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cantidad: this.props.cantidad,
      comentario: this.props.comentario,
      itemCarta: this.props.itemCarta,
      modificado: false,
    }
  }

  modificarCantidad = (modificador) => {
    if (this.state.cantidad + modificador <= 1) {
      this.setState({ cantidad: 1 })
    } else {
      this.setState({
        cantidad: (this.state.cantidad + modificador),
        modificado: true,
      })
    }
  }

  modificarComentario = (texto) => {
    if (texto !== null && texto !== "") {
      this.setState({
        comentario: texto,
        modificado: true,
      })
    }
  }

  agregarAPedido = () => {
    this.props.handlersAgregarAPedido.onChange(this.state.cantidad, this.state.comentario, this.state.modificado)
  }

  render() {
    const { itemCarta } = this.state;
    const { cantidad, comentario } = this.state;
    const { texto1, texto2, handlersVolver, disabled, premio } = this.props;

    return (
      <div>
        <CuerpoItem
          itemCarta={itemCarta}
          cantidad={cantidad}
          comentario={comentario}
          handlersCantidad={{ onChange: this.modificarCantidad }}
          handlersComentario={{ onChange: this.modificarComentario }}
          disabled={disabled}
          premio={premio}
        />
        <Botones
          text1={texto1}
          text2={texto2}
          handlersVolver={handlersVolver}
          handlersAgregarAPedido={{ onChange: this.agregarAPedido }}
          disabled={disabled}
        />
      </div>
    )
  }
}