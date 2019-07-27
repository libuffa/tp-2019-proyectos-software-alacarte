import React, { Component } from 'react'
import PersonIcon from '@material-ui/icons/PersonPin';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import '../estilosPaginas.scss';
import DialogVolver from '../../components/Dialog/DialogVolver';
import { ServiceLocator } from '../../services/ServiceLocator';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado';
import { withStyles } from '@material-ui/styles';

const styles = {
  boton: {
    marginTop: '18px',
    marginBottom: '18px',
  },
};

class CambiarContraseña extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contraseñaActual: "",
      contraseñaNueva: "",
      confirmarContraseñaNueva: "",
      open: false,
      errorMessage: "",
      actualPassError: false,
    }
  }

  handleEnviar = () => {
    const { contraseñaActual, contraseñaNueva, confirmarContraseñaNueva } = this.state
    if (contraseñaActual === contraseñaNueva) {
      this.generarError("Contraseña nueva igual a la actual")
    } else {
      if (contraseñaNueva === confirmarContraseñaNueva) {
        const json = {
          idEmpleado: ControllerDeEmpleado.getSesionActiva(),
          contraseñaActual: contraseñaActual,
          contraseñaNueva: contraseñaNueva,
        }
        ServiceLocator.EmpleadoService.cambiarContraseña(json)
          .then((respuesta) => {
            if (respuesta) {
              if (respuesta.error) {
                if (respuesta.error.includes("actual")) {
                  this.setState({
                    actualPassError: true,
                  })
                  this.generarError(respuesta.error)
                } else {
                  this.generarError(respuesta.error)
                }
              } else {
                this.handleClickOpen()
              }
            } else {
              this.generarError("Error en el servidor")
            }
          })
      } else {
        this.generarError("")
      }
    }
  }

  snackbarOpen() {
    return this.state.errorMessage !== ""
  }

  snackbarClose = () => {
    this.setState({
      errorMessage: ""
    })
  }

  modificarAtributo = (atributo, valor) => {
    if (atributo === "contraseñaActual") {
      this.setState({
        actualPassError: false,
      })
    }
    this.setState({
      [atributo]: valor,
    })
  }

  generarError(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }

  handleClickOpen() {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.props.history.push('/')
    this.setState({
      open: false,
    })
  };

  verMenu = () => {
    this.props.history.push('/')
  }

  render() {
    const { errorMessage, open, contraseñaActual, contraseñaNueva, confirmarContraseñaNueva, actualPassError } = this.state

    return (
      <div>
        <Container component="main" maxWidth="xs" >
          <div className="contenedorTitulo">
            <Typography variant="h3" color="textSecondary">
              <PersonIcon fontSize="large"></PersonIcon>
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {"Cambiar contraseña"}
            </Typography>
          </div>
          <InputEmpleado
            previo={""}
            atributo={"contraseñaActual"}
            disabled={false}
            type={"password"}
            handlers={{ onChange: this.modificarAtributo }}
            label={"Contraseña actual"}
            maxLength={15}
            help={"Ingresar contraseña vigente"}
            error={actualPassError}
          />
          <InputEmpleado
            previo={""}
            atributo={"contraseñaNueva"}
            disabled={false}
            type={"password"}
            handlers={{ onChange: this.modificarAtributo }}
            label={"Nueva contraseña"}
            maxLength={15}
            help={"(Máximo 15 caracteres)"}
          />
          <InputEmpleado
            previo={""}
            atributo={"confirmarContraseñaNueva"}
            disabled={false}
            type={"password"}
            handlers={{ onChange: this.modificarAtributo }}
            label={"Confirmar nueva contraseña"}
            maxLength={15}
            error={contraseñaNueva !== confirmarContraseñaNueva}
            help={"Repetir la nueva contraseña"}
          />
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <Button fullWidth variant="contained" color="primary" onClick={this.verMenu} className={this.props.classes.boton}>
                <Typography variant="overline">
                  volver
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={2} > </Grid>
            <Grid item xs={5}>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleEnviar} className={this.props.classes.boton} disabled={!contraseñaActual || !contraseñaNueva || !confirmarContraseñaNueva || actualPassError}>
                <Typography variant="overline">
                  confirmar
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Container>
        <SnackBarPersonal mensajeError={errorMessage} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
        <DialogVolver
          titulo={"Contraseña modificada"}
          descripcion={"Su contraseña se modificó correctamente"}
          handlers={{ onChange: this.handleClose }}
          open={open}
        />
      </div>
    )
  }
}

export default withStyles(styles)(CambiarContraseña);