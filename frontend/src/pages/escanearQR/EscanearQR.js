import React, { Component } from "react";
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import QrReader from 'react-qr-reader';
import '../estilosPaginas.scss';
import InputSesion from "../../components/inputSesion/InputSesion.js";
import SnackBarPersonal from "../../components/snackBarPersonal/SnackBarPersonal.js";


export default class EscanearQR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sesion: "",
      delay: 100,
      result: 'No result',
      errorMessage: "",
      escanear: false,
    }
    this.handleScan = this.handleScan.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEnviar = () => {
    const { sesion } = this.state
    if (sesion !== "") {
      ServiceLocator.SesionService.iniciarSesion({ idSesion: sesion })
        .then(respuesta => {
          if (respuesta === "True") {
            this.props.iniciarSesion(sesion)
          } else {
            this.generarError(respuesta)
          }
        })
    }
  }

  escanear = () => {
    this.setState({
      escanear: true,
    })
  }

  generarError(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }

  snackbarOpen() {
    return this.state.errorMessage !== ""
  }

  snackbarClose = () => {
    this.setState({
      errorMessage: ""
    })
  }

  modificarSesion = (sesion) => {
    this.setState({
      sesion: sesion
    })
  }

  handleScan = data => {
    if (data) {
      this.setState({
        sesion: data
      })
      this.handleEnviar()
    }
  }

  handleError = err => {
    console.error(err)
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <br />
        <Typography align='center' variant="h5">
          {"¡Escaneá el código y empezá a pedir!"}
        </Typography>
        <br />
        <Container>
          {!this.state.escanear && <Button
            fullWidth
            color="primary"
            className="botonAlto"
            variant="contained"
            onClick={this.escanear}
          >
            Escanear
          </Button>}
          {this.state.escanear && <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />}
        </Container>
        <br />
        <Typography align='center' variant="h5">
          {"O ingresá el número de sesion"}
        </Typography>
        <br />
        <Grid container>
          <Grid item xs={7}>
            <InputSesion handlerSesion={{ onChange: this.modificarSesion }} />
          </Grid>
          <Grid item xs={1}>

          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={this.handleEnviar}
              variant="contained"
              color="primary"
              fullWidth
              className="botonSesion"
            >
              INGRESAR
            </Button>
          </Grid>
        </Grid>
        <br />
        <SnackBarPersonal mensajeError={errorMessage} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
      </Container>
    );
  }
}