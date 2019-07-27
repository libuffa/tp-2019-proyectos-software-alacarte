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
      idEmpleado: this.props.location.state ? this.props.location.state.idEmpleado : 0,
      nombre: "",
      apellido: "",
      nombreUsuario: "",
      email: "",
      tipoEmpleado: "",
      contraseña: "",
      confirmarContraseña: "",
      logueado: false,
      modificado: false,
      disabled: false,
      checkUser: null,
      usuarioErroneo: false,
      mensajeUsuario: "",
      checkMail: null,
      mailErroneo: false,
      mensajeMail: "",
    }
    this.verEmpleados = this.verEmpleados.bind(this)
  }

  componentDidMount() {
    if (this.state.idEmpleado) {
      this.cargarEmpleado(this.state.idEmpleado)
    }
  }

  componentWillUnmount() {
    this.volver()
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
        this.generarMensaje("Las contraseñas no coinciden", "error")
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
            if (respuesta.error) {
              this.generarMensaje(respuesta.error, "error")
            } else {
              ServiceLocator.EmpleadoService.enviarMailCrear({ "nombreUsuario": this.state.nombreUsuario })
              this.handleOpen("¡Muy Bien!", respuesta)
            }
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
    if (atributo === "nombreUsuario") {
      clearTimeout(this.state.checkUser)
      this.setState({
        checkUser: setTimeout(() => { this.validarUsuario(valor) }, 1000)
      })
    }
    if (atributo === "email") {
      clearTimeout(this.state.checkMail)
      this.setState({
        checkMail: setTimeout(() => { this.validarMail(valor) }, 1000)
      })
    }
    this.setState({
      [atributo]: valor,
      modificado: true,
    })
  }

  validarUsuario(usuario) {
    if (usuario !== "" && (this.state.idEmpleado ? usuario !== this.state.empleado.nombreUsuario : true)) {
      ServiceLocator.EmpleadoService.validarUserName(usuario)
        .then(respuesta => {
          if (respuesta === true) {
            this.setState({
              usuarioErroneo: false,
              mensajeUsuario: "",
            })
          } else if (respuesta.error) {
            this.setState({
              usuarioErroneo: true,
              mensajeUsuario: respuesta.error
            })
          }
        })
    } else {
      this.setState({
        usuarioErroneo: false,
        mensajeUsuario: "",
      })
    }
  }

  validarMail(email) {
    if (email !== "") {
      ServiceLocator.EmpleadoService.validarMail({
        "email": email,
      })
        .then(respuesta => {
          if (respuesta === true) {
            if (email.includes("@") && email.includes(".com")) {
              this.setState({
                mailErroneo: false,
                mensajeMail: "",
              })
            } else {
              this.setState({
                mailErroneo: true,
                mensajeMail: "E-mail inválido"
              })
            }
          } else if (respuesta.error) {
            this.setState({
              mailErroneo: true,
              mensajeMail: respuesta.error
            })
          }
        })
    } else {
      this.setState({
        mailErroneo: false,
        mensajeMail: "",
      })
    }
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
    const { mensajeMail, mailErroneo, mensajeUsuario, usuarioErroneo, idEmpleado, disabled, modificado, empleado, open, mensaje, variant, mensajeDialog, tituloDialog, nombreUsuario, contraseña, email, nombre, apellido, tipoEmpleado, confirmarContraseña, logueado } = this.state;

    if (!empleado && idEmpleado) {
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
                {empleado ? (empleado.nombre + " " + empleado.apellido) : "Nuevo Empleado"}
              </Typography>
            </Grid>
            <Grid item xs={2} className="botonEliminarContainer">
              {empleado &&
                <IconButton disabled={logueado || disabled} onClick={this.eliminarEmpleado} edge="end" >
                  <DeleteIcon />
                </IconButton>}
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h5" color="textSecondary">
                {empleado ? empleado.nombreUsuario : "Registro"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} >
              {empleado && <Typography variant="h6" color="textSecondary">
                {"Estado: "}{empleado.logueado ? "Conectado" : "Desconectado"}
              </Typography>}
            </Grid>
            <Grid item xs={12}>
              {empleado && <div className="divider" />}
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={nombre}
                atributo={"nombre"}
                label={"Nombre"}
                disabled={disabled}
                handlers={{ onChange: this.modificarAtributo }}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={apellido}
                atributo={"apellido"}
                label={"Apellido"}
                disabled={disabled}
                handlers={{ onChange: this.modificarAtributo }}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={nombreUsuario}
                atributo={"nombreUsuario"}
                disabled={disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Usuario"}
                maxLength={20}
                error={usuarioErroneo}
                help={usuarioErroneo ? mensajeUsuario : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectorPuesto
                previo={tipoEmpleado}
                atributo={"tipoEmpleado"}
                disabled={disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"Puesto"}
              />
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={email}
                atributo={"email"}
                disabled={disabled}
                handlers={{ onChange: this.modificarAtributo }}
                label={"E-mail"}
                maxLength={40}
                error={mailErroneo}
                help={mailErroneo ? mensajeMail : ""}
              />
            </Grid>
            {!empleado ?
              <Grid item xs={12}>
                <InputEmpleado
                  previo={contraseña}
                  type={"password"}
                  atributo={"contraseña"}
                  disabled={disabled}
                  handlers={{ onChange: this.modificarAtributo }}
                  label={"Contraseña"}
                  maxLength={15}
                  help={"(Máximo 15 caracteres)"}
                />
              </Grid> : ""
            }
            {!empleado ?
              <Grid item xs={12}>
                <InputEmpleado
                  previo={confirmarContraseña}
                  type={"password"}
                  atributo={"confirmarContraseña"}
                  disabled={disabled}
                  handlers={{ onChange: this.modificarAtributo }}
                  label={"Confirmar contraseña"}
                  maxLength={15}
                  error={contraseña !== confirmarContraseña}
                  help={"(Máximo 15 caracteres)"}
                />
              </Grid> : ""
            }
          </Grid>
          <BotonesEmpleado
            text1={"Volver"}
            text2={"Guardar"}
            cancelar={{ onChange: this.volver }}
            aceptar={{ onChange: this.agregarEmpleado }}
            disabled1={disabled}
            disabled2={(contraseña !== confirmarContraseña) || usuarioErroneo || !nombreUsuario || disabled || !contraseña || !email || !nombre || !apellido || !tipoEmpleado || !confirmarContraseña || !modificado}
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
          descripcion={"Se perderán los cambios realizados"}
          handlers={{ onChange: this.volver, open: this.openConfirmation }}
          open={this.state.openConfirmation}
        />
        <DialogConfirmacion
          titulo={"Atención"}
          descripcion={"¿Estás seguro de eliminar el usuario?"}
          handlers={{ onChange: this.eliminarEmpleado, open: this.openConfirmationDelete }}
          open={this.state.openConfirmationDelete}
        />
      </div>
    )
  }
}