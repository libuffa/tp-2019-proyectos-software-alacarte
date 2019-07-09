import React, { Component } from 'react'
import '../estilosPaginas.scss';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { CircularProgress, Grid, Typography, Paper, ListSubheader, ListItemText, IconButton } from '@material-ui/core';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado.js';
import BotonesEmpleado from '../../components/botonesEmpleado/BotonesEmpleado.js';
import DeleteIcon from "@material-ui/icons/Delete";
import SelectorPuesto from '../../components/selectorPuesto/SelectorPuesto';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import DialogVolver from '../../components/Dialog/DialogVolver';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';

export default class DetalleEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openConfirmation: false,
      openConfirmationDelete: false,
      mensaje: "",
      mensajeDialog: "",
      tituloDialog: "",
      variant: "",
      empleado: null,
      idEmpleado: this.props.location.state ? this.props.location.state.idEmpleado : null,
      nombre: null,
      apellido: null,
      nombreUsuario: null,
      email: null,
      tipoEmpleado: null,
      contraseña: null,
      confirmarContraseña: null,
      logueado: false,
      modificado: false,
      disabled: false,
    }
    this.verEmpleados = this.verEmpleados.bind(this)
  }

  componentDidMount() {
    this.cargarEmpleado(this.state.idEmpleado)
  }

  cargarEmpleado(idEmpleado) {
    ServiceLocator.EmpleadoService.getEmpleadoPorId(idEmpleado)
      .then((empleado) => {
        this.setState({
          empleado,
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          nombreUsuario: empleado.nombreUsuario,
          email: empleado.email,
          tipoEmpleado: empleado.tipoEmpleado,
          contraseña: empleado.contraseña,
          confirmarContraseña: empleado.contraseña,
          logueado: empleado.logueado,
        })
      })
  }

  agregarEmpleado = () => {
    const { idEmpleado, nombreUsuario, contraseña, email, nombre, apellido, tipoEmpleado, confirmarContraseña } = this.state

    if (!nombreUsuario || !contraseña || !email || !nombre || !apellido || !tipoEmpleado || !confirmarContraseña) {
      this.generarMensaje("Debe completar todos los campos", "error")
    } else {
      if (contraseña !== confirmarContraseña) {
        this.generarMensaje("La contraseña no se confirmo correctamente", "error")
      } else {
        ServiceLocator.EmpleadoService.agregarEmpleado({
          "id": idEmpleado,
          "nombreUsuario": nombreUsuario,
          "contraseña": contraseña,
          "email": email,
          "nombre": nombre,
          "apellido": apellido,
          "tipoEmpleado": tipoEmpleado
        }).then(respuesta => {
          if (respuesta) {
            respuesta.error ?
              this.generarMensaje(respuesta.error, "error") :
              this.handleOpen("!Muy Bien¡", respuesta)
          } else {
            this.generarMensaje("Error en el servidor", "error")
          }
        })
      }
    }
  }

  eliminarEmpleado = () => {
    if (!this.state.openConfirmationDelete) {
      this.openConfirmationDelete()
    } else {
      ServiceLocator.EmpleadoService.eliminarEmpleado({
        "id": this.state.idEmpleado,
      }).then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.openConfirmationDelete();
            this.generarMensaje(respuesta.error, "error");
          } else {
            this.openConfirmationDelete();
            this.setState({ disabled: true })
            setTimeout(() => { this.verEmpleados() }, 3000);
            this.generarMensaje(respuesta, "success");
          }
        } else {
          this.generarMensaje("Error en el servidor", "error") && this.openConfirmationDelete()
        }
      })
    }
  }

  volver = () => {
    if (!this.state.openConfirmation) {
      if (this.state.modificado) {
        this.openConfirmation()
      } else {
        this.verEmpleados()
      }
    } else {
      this.verEmpleados()
      this.openConfirmation()
    }
  }

  openConfirmation = () => {
    this.setState({
      openConfirmation: !this.state.openConfirmation
    })
  }

  openConfirmationDelete = () => {
    this.setState({
      openConfirmationDelete: !this.state.openConfirmationDelete
    })
  }

  verEmpleados = () => {
    this.props.history.push('/empleados')
  }

  modificarAtributo = (atributo, valor) => {
    this.setState({
      [atributo]: valor,
      modificado: true,
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

  handleOpen(titulo, mensaje) {
    this.setState({
      tituloDialog: titulo,
      mensajeDialog: mensaje,
      open: true,
    })
  }

  handleClose = () => {
    this.verEmpleados()
    this.setState({
      open: false,
    })
  }

  render() {
    const { disabled, modificado, empleado, open, mensaje, variant, mensajeDialog, tituloDialog, nombreUsuario, contraseña, email, nombre, apellido, tipoEmpleado, confirmarContraseña, logueado } = this.state;

    if (!empleado) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }

    return (
      <div>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Empleado"} />
        </ListSubheader>
        <div className="dividerLista" />
        <Paper elevation={0} square className="detalleEmpleado">
          <Grid container spacing={0}>
            <Grid item xs={10} >
              <Typography variant="h4">
                {empleado.nombre + " " + empleado.apellido}
              </Typography>
            </Grid>
            <Grid item xs={2} className="botonEliminarContainer">
              <IconButton disabled={logueado || disabled} onClick={this.eliminarEmpleado} edge="end" >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h5" color="textSecondary">
                {empleado.nombreUsuario}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" color="textSecondary">
                {"Estado: "}{empleado.logueado ? "Conectado" : "Desconectado"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={nombre}
                atributo={"nombre"}
                label={"Nombre"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={apellido}
                atributo={"apellido"}
                label={"Apellido"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={nombreUsuario}
                atributo={"nombreUsuario"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Usuario"}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectorPuesto
                previo={tipoEmpleado}
                atributo={"puesto"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Puesto"}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={email}
                atributo={"email"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"E-mail"}
                maxLength={30}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={contraseña}
                type={"password" || disabled}
                atributo={"contraseña"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Contraseña"}
                maxLength={15}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={confirmarContraseña}
                type={"password"}
                atributo={"confirmarContraseña"}
                disabled={logueado || disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Confirmar contraseña"}
                maxLength={15}
              />
            </Grid>
          </Grid>
          <BotonesEmpleado
            text1={"Volver"}
            text2={"Guardar"}
            cancelar={{ onChange: this.volver }}
            aceptar={{ onChange: this.agregarEmpleado }}
            disabled1={disabled}
            disabled2={!nombreUsuario || disabled || !contraseña || !email || !nombre || !apellido || !tipoEmpleado || !confirmarContraseña || logueado || !modificado}
          />
        </Paper>
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        <DialogVolver
          titulo={tituloDialog}
          descripcion={mensajeDialog}
          handlers={{ onChange: this.handleClose }}
          open={open}
        />
        <DialogConfirmacion
          titulo={"Atención"}
          descripcion={"Se perderan los cambios realizados"}
          handlers={{ onChange: this.volver, open: this.openConfirmation }}
          open={this.state.openConfirmation}
        />
        <DialogConfirmacion
          titulo={"Atención"}
          descripcion={"¿Seguro que quiere eliminar el usuario?"}
          handlers={{ onChange: this.eliminarEmpleado, open: this.openConfirmationDelete }}
          open={this.state.openConfirmationDelete}
        />
      </div>
    )
  }
}