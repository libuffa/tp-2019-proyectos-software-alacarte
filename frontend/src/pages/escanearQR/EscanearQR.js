import React, { Component } from "react";
import { ServiceLocator } from "../../services/ServiceLocator.js";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sesion: "",
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEnviar = event => {
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

  render() {
    return (
      <div>
        <span>Escanear QR (aca en teoria se va a mandar el codigo que se lea del qr qu  va a tener que coincidir con una sesion de la base)</span>
        <input
          id="sesion"
          name="sesion"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="sesion" />
        <button onClick={this.handleEnviar}>ENTRAR</button>
      </div>
    );
  }
}