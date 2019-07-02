import React, { Component } from "react";
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import QrReader from 'react-qr-reader';
import '../estilosPaginas.scss';
import InputSesion from "../../components/inputSesion/InputSesion.js";


export default class EscanearQR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sesion: "",
      delay: 100,
      result: 'No result',
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
    ServiceLocator.SesionService.iniciarSesion({ idSesion: sesion })
      .then(respuesta => {
        if (respuesta === "True") {
          this.props.iniciarSesion(sesion)
        } else {
          console.log(respuesta)
        }
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
    return (
      <Container component="main" maxWidth="xs">
        <br />
        <Typography align='center' variant="h5">
          {"¡Escaneá el código y empezá a pedir!"}
        </Typography>
        <br />
        <Container>
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />
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
      </Container>

    );
  }
}