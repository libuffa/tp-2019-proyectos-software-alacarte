import React, { Component } from 'react';
import { ServiceLocator } from '../../services/ServiceLocator';
import { withRouter } from 'react-router';
import PersonIcon from '@material-ui/icons/PersonPin';
import '../estilosPaginas.scss';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import { Container, Typography, Grid, Link, Button } from '@material-ui/core';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: "",
      pass: "",
      mensaje: "",
      userError: false,
      mensajeUser: "",
      passError: false,
      mensajePass: "",
    }
  }

  handleEnviar = () => {
    const { usuario, pass } = this.state
    if (usuario && pass) {
      ServiceLocator.EmpleadoService.iniciarSesion({ nombreUsuario: usuario, contraseña: pass })
        .then((respuesta) => {
          if (respuesta) {
            if (respuesta.error) {
              if (respuesta.error.includes("Usuario")) {
                this.setState({
                  userError: true,
                  mensajeUser: respuesta.error,
                })
              } else {
                this.setState({
                  passError: true,
                  mensajePass: respuesta.error,
                })
              }
              this.generarMensaje(respuesta.error)
            } else {
              this.props.iniciarSesion(respuesta.id)
            }
          } else {
            this.generarMensaje("Error en el servidor")
          }
        })
    } else {
      this.generarMensaje("Debe completar los campos")
    }
  }

  modificarAtributo = (atributo, valor) => {
    if (atributo === "pass") {
      this.setState({
        pass: valor,
        passError: false,
      })
    } else {
      this.setState({
        usuario: valor,
        userError: false,
      })
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

  generarMensaje(mensaje) {
    this.setState({
      mensaje
    })
  }

  render() {
    const { mensaje, userError, passError, mensajeUser, mensajePass } = this.state
    const { history } = this.props

    return (
      <Container component="main" maxWidth="xs" >
        <div className="contenedorTitulo">
          <Typography variant="h3" color="textSecondary">
            <PersonIcon fontSize="large"></PersonIcon>
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {"Login À La Carte"}
          </Typography>
        </div>
        <InputEmpleado
          previo={""}
          atributo={"usuario"}
          disabled={false}
          handlers={{ onChange: this.modificarAtributo }}
          label={"Usuario"}
          maxLength={20}
          error={userError}
          help={userError ? mensajeUser : ""}
        />
        <InputEmpleado
          previo={""}
          atributo={"pass"}
          disabled={false}
          handlers={{ onChange: this.modificarAtributo }}
          label={"Contraseña"}
          type={"password"}
          maxLength={15}
          error={passError}
          help={passError ? mensajePass : ""}
        />
        <br />
        <Button fullWidth variant="contained" color="primary" onClick={this.handleEnviar}>
          <Typography variant="overline">
            ingresar
          </Typography>
        </Button>
        <br />
        <br />
        <Grid container>
          <Grid item xs>
            <Link href='#' onClick={() => history.push('/recuperar/contraseña')} variant="body2">
              {"Recuperar Contraseña"}
            </Link>
          </Grid>
        </Grid>
        <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
      </Container>
    );
  }
}

export default withRouter(Login);