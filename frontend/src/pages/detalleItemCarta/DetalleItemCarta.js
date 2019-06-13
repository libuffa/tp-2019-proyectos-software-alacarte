import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import PasadorDeImagenes from '../../components/pasadorDeImagenes/PasadorDeImagenes.js';
import CuerpoItem from '../../components/cuerpoItem/CuerpoItem.js';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import CartIcon from '@material-ui/icons/ListAlt';
import './DetalleItemCarta.scss';

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
      console.log("se va a guardar esto: " + texto)
    }
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  render() {
    const { itemCarta, cantidad, comentario } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verPedido,
        name: "Ver Pedido",
        icon: (<CartIcon />)
      },
    }

    if (!itemCarta) {
      return <div></div>
    }
    return <div>
      <div className="contenedor">
        <PasadorDeImagenes imagenes={itemCarta.imagenes} />
        <CuerpoItem
          itemCarta={itemCarta}
          cantidad={cantidad}
          comentario={comentario}
          handlersCantidad={{ onChange: this.modificarCantidad }}
          handlersComentario={{ onChange: this.modificarComentario }}
        />
      </div>
      <MenuInferior menuButtons={menuButtons}></MenuInferior>
    </div>
  }
}