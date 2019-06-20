import React, { Component } from "react";
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { Typography, Container, CardContent, CardHeader, Card } from "@material-ui/core";
import QrReader from 'react-qr-reader';


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
    if (this.props.iniciarSesion) {
      ServiceLocator.SesionService.iniciarSesion({ idSesion: sesion })
        .then(respuesta => {
          if (respuesta === "True") {
            this.props.iniciarSesion(sesion)
          } else {
            console.log(respuesta)
          }
        })
    }
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
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return (
      <Card>
      <CardHeader title="Escanea el código QR para poder empezar a pedir!"/>
      <CardContent>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
      </CardContent>
    </Card>
    );
  }
}