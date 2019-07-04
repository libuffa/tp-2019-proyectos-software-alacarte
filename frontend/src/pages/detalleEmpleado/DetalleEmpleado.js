import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import '../estilosPaginas.scss';
import { CircularProgress, Grid, Typography, Paper, ListSubheader, ListItemText } from '@material-ui/core';

export default class DetalleEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empleado: null,
      idEmpleado: this.props.location.state ? this.props.location.state.idEmpleado : null,
    }
    this.verEmpleados = this.verEmpleados.bind(this)
  }

  componentDidMount() {
    this.cargarEmpleado(this.state.idEmpleado)
  }

  cargarEmpleado(idEmpleado) {
    ServiceLocator.EmpleadoService.getEmpleadoPorId(idEmpleado)
      .then((empleado) => {
        this.setState({
          empleado,
        })
      })
  }

  verEmpleados = () => {
    this.props.history.push('/empleados')
  }

  render() {
    const { empleado } = this.state;

    if (!empleado) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }
    return (
      <div>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Empleado"} />
        </ListSubheader>
        <div className="dividerLista" />
        <Paper elevation={0} square className="detalleEmpleado">
          <Grid container spacing={0}>
            <Grid item xs={12} >
              <Typography variant="h4">
                {empleado.nombre + " " + empleado.apellido}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h5" color="textSecondary">
                {empleado.nombreUsuario}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h5" color="textSecondary">
                {"Estado: "}{empleado.logueado ? "Conectado" : "Desconectado"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}