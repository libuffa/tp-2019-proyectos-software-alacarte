import React, { Component } from 'react'
import { ListSubheader, ListItemText, CircularProgress } from '@material-ui/core';
import MenuInferior from '../../components/menuInferior/MenuInferior';
import Menu from '@material-ui/icons/Menu';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import '../estilosPaginas.scss'
import ListaMozosReporte from '../../components/listaMozosReporte/ListaMozosReporte';
import { ServiceLocator } from '../../services/ServiceLocator';
import MenuSuperior from '../../components/menuSuperior/MenuSuperior';
import ListaPlatosReporte from '../../components/listaPlatosReporte/ListaPlatosReporte';

export default class Reportes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reporte: "Mozos",
      mozos: null,
      platos: null,
      mensaje: "",
      variant: "",
    }
  }

  componentDidMount() {
    this.cargar()
  }

  cargar() {
    ServiceLocator.EmpleadoService.getReporteMozos()
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              mozos: respuesta.sort(function (a, b) { return b.mesasAtendidas - a.mesasAtendidas }),
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
    ServiceLocator.EmpleadoService.getReportePlatos()
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              platos: respuesta.sort(function (a, b) { return b.vecesComprado - a.vecesComprado }),
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  seleccionEnMenuSuperior = (reporte) => {
    this.setState({
      reporte
    })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  generarMensaje(mensaje, variant) {
    this.setState({
      mensaje,
      variant,
    })
  }

  snackbarOpen() {
    return this.state.mensaje !== ""
  }

  snackbarClose = () => {
    this.setState({
      mensaje: ""
    })
  }

  render() {
    const { mensaje, variant, mozos, reporte, platos } = this.state

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!mozos || !platos) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
      return (
        <div className="contenedorLista">
          <div className="dividerLista" />
          <ListSubheader disableSticky color="inherit" >
            <ListItemText primary={"Reportes"} />
          </ListSubheader>
          <div className="dividerLista" />
          <MenuSuperior data={["Mozos", "Items"]} handlers={{ onChange: this.seleccionEnMenuSuperior }}></MenuSuperior>
          {reporte === "Mozos" && <ListaMozosReporte empleados={mozos} />}
          {reporte === "Items" && <ListaPlatosReporte platos={platos} />}
          <MenuInferior menuButtons={menuButtons} />
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div >
      )
    }
  }
}