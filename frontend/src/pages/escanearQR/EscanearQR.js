import React, { Component } from "react";
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import QrReader from 'react-qr-reader';
import '../estilosPaginas.scss';
import SnackBarPersonal from "../../components/snackBarPersonal/SnackBarPersonal.js";
import PersonIcon from '@material-ui/icons/PersonPin';
import InputEmpleado from "../../components/inputEmpleado/InputEmpleado.js";


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
          if (respuesta) {
            if (respuesta.error) {
              this.generarError(respuesta.error)
            } else {
              this.props.iniciarSesion(sesion)
            }
          } else {
            this.generarError("Error en el servidor")
          }
        })
    }
  }

  modificarAtributo = (atributo, valor) => {
    this.setState({
      [atributo]: valor,
    })
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
    const { errorMessage, sesion } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className="contenedorTitulo">
          <Typography variant="h3" color="textSecondary">
            <PersonIcon fontSize="large"></PersonIcon>
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {"Inicio À La Carte"}
          </Typography>
        </div>
        <div className="contenedorTitulo">
          <Typography variant="h6" color="textSecondary">
            {"Escaneá el código y empezá a pedir"}
          </Typography>
        </div>
        <br />
        {!this.state.escanear && <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={this.escanear}
        >
          <Typography variant="overline">
            Escanear
          </Typography>
        </Button>}
        <Container>
          {this.state.escanear && <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />}
        </Container>
        <div className="contenedorTitulo">
          <Typography variant="h6" color="textSecondary">
            {"O ingresá el número de sesión"}
          </Typography>
        </div>
        <br />
        <Grid container>
          <Grid item xs={12}>
            <InputEmpleado
              previo={""}
              atributo={"sesion"}
              disabled={false}
              handlers={{ onChange: this.modificarAtributo }}
              label={"Sesión"}
              type={"number"}
              maxLength={15}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={this.handleEnviar}
              disabled={sesion === ""}
            >
              <Typography variant="overline">
                Ingresar
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <br />
        <SnackBarPersonal mensajeError={errorMessage} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
      </Container>
    );
  }
}