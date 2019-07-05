import React, { Component } from 'react';
import { ServiceLocator } from '../../services/ServiceLocator';
import PersonIcon from '@material-ui/icons/PersonPin';
import '../estilosPaginas.scss';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import { Container, Typography, Grid, Link } from '@material-ui/core';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: "",
      pass: "",
      errorMessage: "",
    }
  }

  handleEnviar = () => {
    const { usuario, pass } = this.state
    if (usuario && pass) {
      ServiceLocator.EmpleadoService.iniciarSesion({ nombreUsuario: usuario, contraseña: pass })
        .then((respuesta) => {
          if (respuesta) {
            if (respuesta.id) {
              this.props.iniciarSesion(respuesta.id)
            } else {
              this.generarError(respuesta)
            }
          } else {
            this.generarError("Error en el servidor")
          }
        })
    }
  }

  snackbarOpen() {
    return this.state.errorMessage !== ""
  }

  snackbarClose = () => {
    this.setState({
      errorMessage: ""
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  generarError(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }

  render() {
    const { errorMessage } = this.state

    return (
      <Container component="main" maxWidth="xs" >
        <div className="contenedorTitulo">
          <Typography variant="h3" color="textSecondary">
            <PersonIcon fontSize="large"></PersonIcon>
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {"Login A La Carte"}
          </Typography>
        </div>
        <div>
          <input maxLength="20" className="inputLogin" placeholder=" Usuario" name="usuario" onChange={this.handleChange}></input>
        </div>
        <div>
          <input maxLength="15" className="inputLogin" placeholder=" Contraseña" name="pass" onChange={this.handleChange} type="password"></input>
        </div>
        <button className="botonLogin" onClick={this.handleEnviar}>INGRESAR</button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {"Recuperar Contraseña"}
            </Link>
          </Grid>
        </Grid>
        <SnackBarPersonal mensajeError={errorMessage} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
      </Container>
    );
  }
}