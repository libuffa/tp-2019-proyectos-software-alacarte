import React, { Component } from 'react'
import '../estilosPaginas.scss';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { CircularProgress, Grid, Typography, Paper, ListSubheader, ListItemText, IconButton } from '@material-ui/core';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado.js';
import BotonesEmpleado from '../../components/botonesEmpleado/BotonesEmpleado.js';
import DeleteIcon from "@material-ui/icons/Delete";

export default class DetalleEmpleado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empleado: null,
      idEmpleado: this.props.location.state ? this.props.location.state.idEmpleado : null,
      nombre: null,
      apellido: null,
      nombreUsuario: null,
      email: null,
      puesto: null,
      contraseña: null,
      confirmarContraseña: null,
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
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          nombreUsuario: empleado.nombreUsuario,
          email: empleado.email,
          tipoEmpleado: empleado.tipoEmpleado,
          contraseña: empleado.contraseña,
          confirmarContraseña: empleado.contraseña,
        })
      })
  }

  agregarEmpleado = () => {
    this.verEmpleados()
  }

  verEmpleados = () => {
    this.props.history.push('/empleados')
  }

  modificarAtributo = (atributo, valor) => {
    this.setState({
      [atributo]: valor
    })
    console.log(valor)
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
            <Grid item xs={10} >
              <Typography variant="h4">
                {empleado.nombre + " " + empleado.apellido}
              </Typography>
            </Grid>
            <Grid item xs={2} className="botonEliminarContainer">
              <IconButton edge="end" >
                <DeleteIcon></DeleteIcon>
              </IconButton>
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
            <Grid item xs={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">
                {"Nombre"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.nombre}
                atributo={"nombre"}
                handlers={{ onChange: this.modificarAtributo }}
                placeholder={"Ej: Monica"}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">
                {"Apellido"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.apellido}
                atributo={"apellido"}
                handlers={{ onChange: this.modificarAtributo }}
                placeholder={"Ej: Dominguez"}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">
                {"Usuario"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.nombreUsuario}
                atributo={"nombreUsuario"}
                handlers={{ onChange: this.modificarAtributo }}
                placeholder={"Ej: moniDominguez"}
                maxLength={20}
              />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">
                {"Puesto"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.tipoEmpleado}
              />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">
                {"Mail"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputEmpleado
                previo={this.state.email}
                atributo={"nombreUsuario"}
                handlers={{ onChange: this.modificarAtributo }}
                placeholder={"Ej: mdoming@mail.com"}
                maxLength={30}
              />
            </Grid>
            {!empleado &&
              <Grid item xs={12} >
                <Typography variant="h6" color="textPrimary">
                  {"Contraseña"}
                </Typography>
              </Grid> &&
              <Grid item xs={12}>
                <InputEmpleado
                  previo={this.state.contraseña}
                  type={"password"}
                  atributo={"contraseña"}
                  handlers={{ onChange: this.modificarAtributo }}
                  placeholder={"******"}
                  maxLength={15}
                />
              </Grid> &&
              <Grid item xs={12} >
                <Typography variant="h6" color="textPrimary">
                  {"Confirmar Contraseña"}
                </Typography>
              </Grid> &&
              <Grid item xs={12}>
                <InputEmpleado
                  previo={this.state.confirmarContraseña}
                  type={"password"}
                  atributo={"confirmarContraseña"}
                  handlers={{ onChange: this.modificarAtributo }}
                  placeholder={"******"}
                  maxLength={15}
                />
              </Grid>
            }
          </Grid>
          <BotonesEmpleado
            text1={"Cancelar"}
            text2={"Guardar"}
            cancelar={{ onChange: this.verEmpleados }}
            aceptar={{ onChange: this.agregarEmpleado }}
            disabled1={false}
            disabled2={false}
          />
        </Paper>
      </div>
    )
  }
}