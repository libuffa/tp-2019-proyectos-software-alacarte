import React, { Component } from 'react';
import { ServiceLocator } from '../../services/ServiceLocator';
import { Grid } from '@material-ui/core';
import './MenuEmpleado.scss';
import BotonMenu from '../../components/botonMenu/BotonMenu';

export default class MenuEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opciones: null,
    }
  }

  componentDidMount() {
    this.cargarOpciones();
  }

  cargarOpciones() {
    ServiceLocator.EmpleadoService.getMenuEmpleado()
      .then((respuesta) => {
        if (!respuesta.error) {
          this.setState({
            opciones: respuesta
          })
        } else {
          console.log(respuesta.error)
        }
      })
  }

  irA = (opcion) => {
    var ruta = null
    switch (opcion) {
      case 'carta':
        ruta = 'carta/empleado'
        break
      case 'mesas':
        ruta = 'mesas'
        break
      default:
        ruta = 'carta/empleado'
        break
    }
    this.props.history.push(`/${ruta}`)
  }

  render() {
    const { opciones } = this.state;

    if (!opciones) {
      return <div></div>
    }
    return (
      <div className="fullContainer">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          {opciones.map((opcion) => {
            return (
              <BotonMenu key={opcion} texto={opcion} handlers={{ onChange: this.irA }} />
            )
          })}
        </Grid>
      </div>
    )
  }
}