import React, { Component } from 'react'
import { ListSubheader, ListItemText } from '@material-ui/core';
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import CuerpoMesa from '../../components/cuerpoMesa/CuerpoMesa';
import { ServiceLocator } from '../../services/ServiceLocator';

export default class DetalleMesa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mesa: this.props.location.state.mesa,
      mozo: null,
    }
    this.verMesas = this.verMesas.bind(this)
  }

  componentDidMount() {
    if (this.state.mesa.sesion) {
      this.cargarMozo()
    }
  }

  verMesas() {
    this.props.history.push('/mesas')
  }

  cargarMozo() {
    ServiceLocator.EmpleadoService.getEmpleadoById(this.state.mesa.sesion.idMozo)
      .then((resultado) => {
        this.setState({
          mozo: resultado,
        })
      })
  }

  render() {
    const { mesa, mozo } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMesas,
        name: "Ver Mesas",
        icon: (<CartIcon />)
      },
    }

    return <div>
      <div className="dividerLista" />
      <ListSubheader disableSticky color="inherit" >
        <ListItemText primary={"Mesa " + mesa.id} />
      </ListSubheader>
      <div className="dividerLista" />
      <CuerpoMesa mesa={mesa} mozo={mozo} />
      <MenuInferior menuButtons={menuButtons} />
    </div>
  }
}