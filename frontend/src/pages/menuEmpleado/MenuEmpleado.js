import React, { Component } from 'react';
import { ServiceLocator } from '../../services/ServiceLocator';
import { Grid, CircularProgress } from '@material-ui/core';
import '../estilosPaginas.scss';
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
        ruta = 'carta'
        break
      case 'mesas':
        ruta = 'mesas'
        break
      case 'pedidos':
        ruta = 'pedido/cocina'
        break
      case 'administrar_mesas':
        ruta = 'mesas/admin'
        break
      case 'empleados':
        ruta = 'empleados'
        break
      case 'reportes':
        ruta = 'reportes'
        break
      default:
        ruta = 'carta'
        break
    }
    this.props.history.push(`/${ruta}`)
  }

  render() {
    const { opciones } = this.state;

    if (!opciones) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
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
          <br />
        </div>
      )
    }
  }
}
