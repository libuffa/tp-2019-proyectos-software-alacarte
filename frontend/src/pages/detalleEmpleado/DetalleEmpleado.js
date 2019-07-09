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

export default class DetalleEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
        })
      })
  }

  agregarEmpleado = () => {
    ServiceLocator.EmpleadoService.agregarEmpleado({
      "id": this.state.idEmpleado,
      "nombreUsuario": this.state.nombreUsuario,
      "contraseña": this.state.contraseña,
      "email": this.state.email,
      "nombre": this.state.nombre,
      "apellido": this.state.apellido,
      "tipoEmpleado": this.state.tipoEmpleado
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

  verEmpleados = () => {
    this.props.history.push('/empleados')
  }

  modificarAtributo = (atributo, valor) => {
    this.setState({
      [atributo]: valor,
    })
    console.log(valor)
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
    const { empleado, open, mensaje, variant, mensajeDialog, tituloDialog } = this.state;

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
              <IconButton edge="end" >
                <DeleteIcon></DeleteIcon>
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
                previo={this.state.nombre}
                atributo={"nombre"}
                label={"Nombre"}
                handlers={{ onChange: this.modificarAtributo }}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.apellido}
                atributo={"apellido"}
                label={"Apellido"}
                handlers={{ onChange: this.modificarAtributo }}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.nombreUsuario}
                atributo={"nombreUsuario"}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Usuario"}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectorPuesto
                previo={this.state.tipoEmpleado}
                atributo={"puesto"}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Puesto"}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.email}
                atributo={"email"}
                handlers={{ onChange: this.modificarAtributo }}
                label={"E-mail"}
                maxLength={30}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.contraseña}
                type={"password"}
                atributo={"contraseña"}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Contraseña"}
                maxLength={15}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.confirmarContraseña}
                type={"password"}
                atributo={"confirmarContraseña"}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Confirmar contraseña"}
                maxLength={15}
              />
            </Grid>
          </Grid>
          <BotonesEmpleado
            text1={"Cancelar"}
            text2={"Guardar"}
            cancelar={{ onChange: this.verEmpleados }}
            aceptar={{ onChange: this.agregarEmpleado }}
            disabled1={false}
            disabled2={false}
          />
        </Paper>
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        <DialogVolver
          titulo={tituloDialog}
          descripcion={mensajeDialog}
          handlers={{ onChange: this.handleClose }}
          open={open}
        />
      </div>
    )
  }
}