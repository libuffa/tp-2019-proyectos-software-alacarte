import React, { Component } from 'react'
import PersonIcon from '@material-ui/icons/PersonPin';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import '../estilosPaginas.scss';
import DialogVolver from '../../components/Dialog/DialogVolver';
import { ServiceLocator } from '../../services/ServiceLocator';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado';
import { withStyles } from '@material-ui/styles';

const styles = {
  boton: {
    marginTop: '18px',
    marginBottom: '18px',
  },
};

class RecuperarContraseña extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      email: "",
      checkMail: null,
      mailErroneo: false,
      mensajeMail: "",
      mensaje: "",
      variant: "",
      disabled: false,
    }
  }

  verLogin = () => {
    this.props.history.push("/login")
  }

  handleEnviar = () => {
    const { email } = this.state
    if (email.includes("@") && email.includes(".com")) {
      this.setState({
        disabled: true,
      })
      ServiceLocator.EmpleadoService.recuperarContraseña({ "email": email })
        .then((respuesta) => {
          if (respuesta) {
            if (respuesta.error) {
              this.generarMensaje(respuesta.error, "error")
              this.setState({
                mailErroneo: true,
                mensajeMail: respuesta.error,
                disabled: false,
              })
            } else {
              ServiceLocator.EmpleadoService.enviarMailRecuperar({ "email": email })
              this.openDialog()
            }
          } else {
            this.generarMensaje("E-mail inválido", "error")
            this.setState({
              disabled: false,
            })
          }
        })
    } else {
      this.generarMensaje("E-mail inválido", "error")
      this.setState({
        disabled: false,
      })
    }
  }

  modificarAtributo = (atributo, valor) => {
    if (atributo === "email") {
      clearTimeout(this.state.checkMail)
      this.setState({
        checkMail: setTimeout(() => { this.validarMail(valor) }, 1000)
      })
    }
    this.setState({
      [atributo]: valor,
    })
  }

  validarMail(email) {
    if (email !== "") {
      if (email.length > 10) {

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
              if (respuesta.error.includes("Error")) {
                this.setState({
                  mailErroneo: true,
                  mensajeMail: respuesta.error
                })
              } else {
                this.setState({
                  mailErroneo: false,
                  mensajeMail: ""
                })
              }
            }
          })
      } else {
        this.setState({
          mailErroneo: true,
          mensajeMail: "E-mail inválido"
        })
      }
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

  openDialog = () => {
    this.setState({
      open: true
    })
  }

  closeDialog = () => {
    this.setState({
      open: false
    })
    this.verLogin()
  }

  render() {
    const { open, mailErroneo, mensajeMail, mensaje, variant, email, disabled } = this.state

    return (
      <div>
        <Container component="main" maxWidth="xs" >
          <div className="contenedorTitulo">
            <Typography variant="h3" color="textSecondary">
              <PersonIcon fontSize="large"></PersonIcon>
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {"Recuperar contraseña"}
            </Typography>
          </div>
          <InputEmpleado
            previo={""}
            atributo={"email"}
            disabled={false}
            handlers={{ onChange: this.modificarAtributo }}
            label={"E-mail"}
            maxLength={40}
            error={mailErroneo}
            help={mailErroneo ? mensajeMail : "Correo electrónico del usuario"}
          />
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <Button fullWidth variant="contained" color="primary" onClick={this.verLogin} className={this.props.classes.boton}>
                <Typography variant="overline">
                  volver
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={2} > </Grid>
            <Grid item xs={5}>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleEnviar} className={this.props.classes.boton} disabled={!email.includes("@") || !email.includes(".com") || (email.length < 10) || disabled}>
                <Typography variant="overline">
                  confirmar
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Container>
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        <DialogVolver
          titulo={"Recuperaste tu contraseña"}
          descripcion={"En instantes recibirás un e-mail con tu contraseña."}
          handlers={{ onChange: this.closeDialog }}
          open={open}
        />
      </div>
    )
  }
}

export default withStyles(styles)(RecuperarContraseña);