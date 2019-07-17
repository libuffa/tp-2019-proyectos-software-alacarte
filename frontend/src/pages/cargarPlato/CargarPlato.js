import React, { Component } from 'react'
import '../estilosPaginas.scss';
import { ServiceLocator } from "../../services/ServiceLocator.js";

export default class CargarPlato extends Component {
  constructor(props) {
    super(props)
    this.state = {
      archivo: null,
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  enviar = () => {
    console.log(this.state)
    ServiceLocator.ItemsCartaService.crearItem(this.state.archivo)
  }

  render() {
    return (
      <div>
        <input type="file" accept="image/*" onChange={this.handleChange} />
        <button onClick={this.enviar} >enviar</button>
      </div>
    )
  }
}