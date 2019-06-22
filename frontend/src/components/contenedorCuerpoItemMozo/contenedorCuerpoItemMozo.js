import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import CartIcon from '@material-ui/icons/ListAlt';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import CuerpoItemMozo from '../../components/cuerpoItemMozo/CuerpoItemMozo.js';

export default class ContenedorCuerpoItemMozo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarta: this.props.itemCarta,
      estado: this.props.itemCarta.habilitado,
    }
  }

  cambiarEstadoItemCarta = () => {
    ServiceLocator.ItemsCartaService.updateEstadoItem(this.props.itemCarta.id)
      .then((resultado) => {
        if (resultado === "True") {
          this.setState({
            estado: !this.state.estado
          })
        } else {
          console.log("Error en el servidor");
        }
      })
  }

  verCarta = () => {
    this.props.history.push('/carta');
  }

  render() {
    const { estado, itemCarta } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verCarta,
        name: "Ver carta",
        icon: (<CartIcon />)
      },
    }

    if (!itemCarta) {
      return <div></div>
    }
    return (
      <div>
        <CuerpoItemMozo
          itemCarta={itemCarta}
          estado={estado}
          disableFunction={{ onChange: this.cambiarEstadoItemCarta }}
        />
        <MenuInferior
          menuButtons={menuButtons}
        />
      </div>
    )
  }
}