import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import ListaMesasMozo from '../../components/listaMesasMozo/ListaMesasMozo';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress } from '@material-ui/core';

export default class VisualizarMesas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: window.setInterval(() => { this.cargarMesas(); }, 4000),
      mesas: null,
    };
  }

  componentDidMount() {
    this.cargarMesas()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  cargarMesas() {
    ServiceLocator.mesaService.getMesas()
      .then((respuesta) => {
        this.setState({
          mesas: respuesta,
        })
      })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  verDetalleMesa = (mesa) => {
    this.props.history.push({
      pathname: '/detalle/mesa',
      state: { mesa: mesa.id }
    })
  }

  entregarPedido = (idPedido) => {
    try {
      ServiceLocator.SesionService.cambiarEstadoPedido(idPedido)
        .then((respuesta) => {
          if (respuesta.status === "True") {
            this.cargarMesas()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { mesas } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!mesas) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }
    return (
      <div className="contenedorLista">
        <ListaMesasMozo mesas={mesas} handlers={{ onChange: this.verDetalleMesa }} entregarPedido={{ onChange: this.entregarPedido }} />
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}



