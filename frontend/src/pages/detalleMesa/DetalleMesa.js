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
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';

export default class DetalleMesa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idMesa: this.props.location.state ? this.props.location.state.mesa : null,
      mesa: null,
      timer: setInterval(() => { this.cargarMesa() }, 5000),
      mozo: null,
      mensaje: "",
      variant: "",
      admin: false,
      openDelete: false,
    }
    this.verMesas = this.verMesas.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.cargarMesa()
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

  componentWillUnmount() {
    clearInterval(this.state.timer)
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
    ServiceLocator.mesaService.getMesa(this.state.idMesa)
      .then((resultado) => {
        if (resultado) {
          if (resultado.sesion) {
            ControllerDeSesion.setSesionActiva(resultado.sesion.id)
            if (resultado.sesion.idMozo) {
              this.setState({
                mesa: resultado,
              })
            }
          } else {
            this.setState({
              mesa: resultado,
              mozo: null,
            })
          }
          if (this.state.mesa.sesion) {
            this.cargarMozo()
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  verItemPedido = (pedido) => {
    this.entregarPedido(pedido.id)
    this.props.history.push({
      pathname: '/detalle/item/pedido',
      state: { pedido: pedido, estado: true, idMesa: this.state.idMesa }
    })
  }

  verMesas() {
    this.state.admin ?
      this.props.history.push('/mesas/admin') :
      this.props.history.push('/mesas')
  }

  verPedido = (idSesion) => {
    ControllerDeSesion.setSesionActiva(idSesion)
    if (ControllerDeSesion.getSesionActiva()) {
      this.props.history.push({
        pathname: '/pedido',
        state: { mesa: this.state.mesa }
      })
    }
  }

  mostrarQR = () => {
    ControllerDeSesion.cerrarSesionActiva()
    this.props.history.push({
      pathname: '/mostrar/qr',
      state: { mesa: this.state.idMesa }
    })
  }

  asignacion = () => {
    if (!this.state.mesa.sesion) {
      this.asignar()
    } else {
      this.desasignar()
    }
  }

  asignar = () => {
    ServiceLocator.mesaService.cambiarEstado({
      "idMozo": ControllerDeEmpleado.getSesionActiva(),
      "idMesa": this.state.mesa.id
    }).then((respuesta) => {
      if (respuesta) {
        if (respuesta.error) {
          this.generarMensaje(respuesta.error, "error")
        } else {
          this.generarMensaje(respuesta, "success")
        }
      } else {
        this.generarMensaje("Error en el servidor", "error")
      }
      this.cargarMesa()
    })
  }

  desasignar = () => {
    if (!this.state.openDelete) {
      this.openDelete()
    } else {
      ControllerDeSesion.cerrarSesionActiva()
      ServiceLocator.mesaService.cambiarEstado({
        "idMozo": ControllerDeEmpleado.getSesionActiva(),
        "idMesa": this.state.mesa.id
      }).then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
            this.openDelete()
          } else {
            this.generarMensaje(respuesta, "success")
            this.openDelete()
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
          this.openDelete()
        }
        this.cargarMesa()
      })
    }
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

  openDelete = () => {
    this.setState({
      openDelete: !this.state.openDelete,
    })
  }

  generarMensaje(mensaje, variant) {
    this.setState({
      mensaje,
      variant,
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
        <CuerpoMesa mesa={mesa} mozo={mozo} entregarPedido={{ onChange: this.entregarPedido }} mostrarQR={{ onChange: this.mostrarQR }} verItemPedido={{ onChange: this.verItemPedido }} verPedido={{ onChange: this.verPedido }} sesionMesa={{ onChange: this.asignacion }} />
        <MenuInferior menuButtons={menuButtons} />
        <DialogConfirmacion
          titulo={"Aviso"}
          descripcion={"¿Esta seguro que desea cerrar la sesión?"}
          handlers={{ onChange: this.desasignar, open: this.openDelete }}
          open={this.state.openDelete}
        />
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
      </div >
    )
  }
}