import React, { Component } from 'react'
import { ListSubheader, ListItemText, CircularProgress } from '@material-ui/core';
import MenuInferior from '../../components/menuInferior/MenuInferior';
import CartIcon from '@material-ui/icons/ListAlt';
import CuerpoMesa from '../../components/cuerpoMesa/CuerpoMesa';
import { ServiceLocator } from '../../services/ServiceLocator';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import '../estilosPaginas.scss'

export default class DetalleMesa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mesa: this.props.location.state ? this.props.location.state.mesa : null,
      mozo: null,
      mensaje: "",
      variant: "",
      admin: false,
    }
    this.verMesas = this.verMesas.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state && this.state.mesa.sesion) {
      this.cargarMozo()
    }
    ServiceLocator.EmpleadoService.getEmpleado()
      .then((resultado) => {
        if (resultado) {
          if (resultado.tipoEmpleado === "Administrador") {
            this.setState({
              admin: true,
            })
          }
        }
      })
  }

  cargarMozo() {
    ServiceLocator.EmpleadoService.getEmpleadoById(this.state.mesa.sesion.idMozo)
      .then((resultado) => {
        this.setState({
          mozo: resultado,
        })
      })
  }

  cargarMesa() {
    ServiceLocator.mesaService.getMesa(this.state.mesa.id)
      .then((resultado) => {
        this.setState({
          mesa: resultado,
          mozo: null,
        })
        if (this.state.mesa.sesion) {
          this.cargarMozo()
        }
      })
  }

  verMesas() {
    this.state.admin ?
      this.props.history.push('/mesas/admin') :
      this.props.history.push('/mesas')
  }

  verPedido = (idSesion) => {
    ControllerDeSesion.setSesionActiva(idSesion)
    this.props.history.push({
      pathname: '/pedido',
      state: { mesa: this.state.mesa }
    })
  }

  mostrarQR = () => {
    this.props.history.push({
      pathname: '/mostrar/qr',
      state: { mesa: this.state.mesa }
    })
  }

  sesionMesa = () => {
    ServiceLocator.mesaService.cambiarEstado({
      "idMozo": ControllerDeEmpleado.getSesionActiva(),
      "idMesa": this.state.mesa.id
    }).then((respuesta) => {
      if (respuesta) {
        if (respuesta.error) {
          this.setState({
            mensaje: respuesta.error,
            variant: "error",
          })
          setTimeout(() => { this.verMesas() }, 3000)
        } else {
          this.setState({
            mensaje: respuesta,
            variant: "success",
          })
        }
      } else {
        this.setState({
          mensaje: "Error en el servidor",
          variant: "error",
        })
      }
      this.cargarMesa()
    })
  }

  entregarPedido = (idPedido) => {
    try {
      ServiceLocator.SesionService.cambiarEstadoPedido(idPedido)
        .then((respuesta) => {
          if (respuesta.status === "True") {
            this.cargarMesa()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  snackbarOpen() {
    return this.state.mensaje !== ""
  }

  snackbarClose = () => {
    this.setState({
      mensaje: ""
    })
  }

  render() {
    const { mesa, mozo, mensaje, variant } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMesas,
        name: "Ver Mesas",
        icon: (<CartIcon />)
      },
    }
    if (!mesa) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }

    return (
      <div className="contenedorLista">
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit" >
          <ListItemText primary={"Mesa " + (mesa.numero ? mesa.numero : "-")} />
        </ListSubheader>
        <div className="dividerLista" />
        <CuerpoMesa mesa={mesa} mozo={mozo} entregarPedido={{ onChange: this.entregarPedido }} mostrarQR={{ onChange: this.mostrarQR }} verPedido={{ onChange: this.verPedido }} sesionMesa={{ onChange: this.sesionMesa }} />
        <MenuInferior menuButtons={menuButtons} />
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
      </div >
    )
  }
}