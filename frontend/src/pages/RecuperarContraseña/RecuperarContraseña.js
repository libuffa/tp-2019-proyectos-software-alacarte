import React, { Component } from 'react'
import PersonIcon from '@material-ui/icons/PersonPin';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import { Container, Typography, Grid } from '@material-ui/core';
import '../estilosPaginas.scss';
import DialogVolver from '../../components/Dialog/DialogVolver';
import { ServiceLocator } from '../../services/ServiceLocator';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado';

export default class RecuperarContraseña extends Component {

  constructor(props) {
    super(props)
    this.state = {
      correoUsuario: "",
      open: false,
      errorMessage: ""
    }
  }

  handleEnviar = () => {
    const { correoUsuario } = this.state
    if (!correoUsuario.includes('@')) {
      this.generarError('Revisa el formato del mail')
    } else {
      const json = { correoUsuario: correoUsuario, }
      ServiceLocator.EmpleadoService.recuperarContraseña(json)
        .then((respuesta) => {
          if (!respuesta.error) {
            this.handleClickOpen()
          } else {
            console.log(respuesta)
            this.generarError(respuesta.error.response.data.error)
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

  handleClickOpen() {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.props.history.push('/login')
    this.setState({
      open: false,
    })
  };

  validarConfirmar() {
    const { correoUsuario } = this.state
    return !correoUsuario
  }

  render() {
    const { errorMessage, open } = this.state

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
          <InputEmpleado />
          <div>
            <input className="inputLogin" placeholder=" Correo electronico del usuario" name="correoUsuario" onChange={this.handleChange}></input>
          </div>
          <Grid container spacing={0}>
            <Grid item xs={5} className="margenBoton">
              <button
                className="botonLogin"
                onClick={() => this.handleClose()}>
                Volver
                            </button>
            </Grid>
            <Grid item xs={2} > </Grid>
            <Grid item xs={5}>
              <button
                className="botonLogin"
                onClick={this.handleEnviar}
                disabled={this.validarConfirmar()}>Confirmar</button>
            </Grid>
          </Grid>
          <SnackBarPersonal mensajeError={errorMessage} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
        </Container>
        <DialogVolver
          titulo={"Recuperar contraseña"}
          descripcion={"En instantes recibirás un e-mail con tu contraseña."}
          handlers={{ onChange: this.handleClose }}
          open={open}
        />
      </div>
    )
  }
}
