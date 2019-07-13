import React, { Component } from "react";
import '../estilosPaginas.scss';
import { Typography, Container, Grid, Button } from "@material-ui/core";
import InputSesion from "../../components/inputSesion/InputSesion.js";
import SnackBarPersonal from "../../components/snackBarPersonal/SnackBarPersonal.js";


export default class InstruccionesJuego extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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

  render() {
    const { errorMessage } = this.state;

    return (
      <Container component="main" maxWidth="xl">
        <br />
        <Typography align='center' variant="h5">
          {"¡Jugá y ganá!"}
        </Typography>
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