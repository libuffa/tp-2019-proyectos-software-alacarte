import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress } from '@material-ui/core';
import ListaMesasAdministrador from '../../components/ListaMesasAdministrador/ListaMesasAdministrador';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';

export default class VisualizarMesasAdministrador extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timer: window.setInterval(() => { this.cargarMesas(); }, 4000),
      mesas: null,
      mensaje: "",
      variant: "",
      openConfirmationDelete: false,
      mesaAEliminar: null,
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
      state: { mesa: mesa }
    })
  }

  sesionMesa = (id) => {
    ServiceLocator.mesaService.cambiarEstado({
      "idMozo": ControllerDeEmpleado.getSesionActiva(),
      "idMesa": id
    }).then((respuesta) => {
      if (respuesta) {
        this.setState({
          mensaje: respuesta,
          variant: "success",
        })
        this.cargarMesas()
      }
    })
  }

  crearMesa = () => {
    ServiceLocator.mesaService.crearMesa({
      "idEmpleado": ControllerDeEmpleado.getSesionActiva()
    }).then((respuesta) => {
      if (respuesta.ok) {
        this.generarMensaje(respuesta.ok, "success")
        this.cargarMesas()
      } else {
        this.generarMensaje(respuesta.error, "error")
        this.cargarMesas()
      }
    })
  }

  eliminarMesa = (id) => {
    if (!this.state.openConfirmationDelete) {
      this.openConfirmationDelete(id)
    } else {
      ServiceLocator.mesaService.eliminarMesa({
        "idEmpleado": ControllerDeEmpleado.getSesionActiva(),
        "idMesa": this.state.mesaAEliminar
      }).then((respuesta) => {
        if (respuesta.ok) {
          this.openConfirmationDelete(id)
          this.generarMensaje(respuesta.ok, "success")
          this.cargarMesas()
        } else {
          this.openConfirmationDelete(id)
          this.generarMensaje(respuesta.error, "error")
          this.cargarMesas()
        }
      })
    }
  }

  openConfirmationDelete = (id) => {
    this.setState({
      openConfirmationDelete: !this.state.openConfirmationDelete,
      mesaAEliminar: this.state.openConfirmationDelete ? null : id,
    })
  }

  generarMensaje(mensaje, variant) {
    this.setState({
      mensaje,
      variant
    })
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
    const { mesas, mensaje, variant } = this.state;

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
        <ListaMesasAdministrador
          mesas={mesas}
          cambiarEstado={{ onChange: this.sesionMesa }}
          eliminarMesa={{ onChange: this.eliminarMesa }}
          handlers={{ onChange: this.crearMesa }}
        />
        <DialogConfirmacion
          titulo={"Atención"}
          descripcion={"¿Seguro que quiere eliminar la mesa?"}
          handlers={{ onChange: this.eliminarMesa, open: this.openConfirmationDelete }}
          open={this.state.openConfirmationDelete}
        />
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}
