import React, { Component } from 'react'
import PersonIcon from '@material-ui/icons/PersonPin';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import { Container, Typography, Grid } from '@material-ui/core';
import '../estilosPaginas.scss';
import DialogVolver from '../../components/Dialog/DialogVolver';
import { ServiceLocator } from '../../services/ServiceLocator';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';

export default class CambiarContraseña extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contraseñaActual: "",
            contraseñaNueva: "",
            confirmarContraseñaNueva: "",
            open: false,
            errorMessage: ""
        }
    }

    handleEnviar = () => {
        const { contraseñaActual, contraseñaNueva, confirmarContraseñaNueva } = this.state
        if(contraseñaNueva === confirmarContraseñaNueva) {
            const json = {
                idEmpleado: ControllerDeEmpleado.getSesionActiva(),
                contraseñaActual: contraseñaActual,
                contraseñaNueva: contraseñaNueva,
            }
            ServiceLocator.EmpleadoService.cambiarContraseña(json)
                .then((respuesta) => {
                    const error = respuesta.error.response.data.error
                    if (!error) {
                        this.handleClickOpen()
                    } else {
                        this.generarError(error)
                    }
                })
        } else {
            this.generarError("Contraseña nueva no se confirmo correctamente")
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

handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
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

validarConfirmar() {
    return !(this.state.contraseñaActual && this.state.contraseñaNueva && this.state.confirmarContraseñaNueva)
}

render() {
    const { errorMessage, open } = this.state

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
                <div>
                    <input type="password" className="inputLogin" placeholder=" Contraseña actual" name="contraseñaActual" onChange={this.handleChange}></input>
                </div>
                <div>
                    <input type="password" className="inputLogin" placeholder=" Contraseña nueva" name="contraseñaNueva" onChange={this.handleChange}></input>
                </div>
                <div>
                    <input type="password" className="inputLogin" placeholder=" Confirmar contraseña nueva" name="confirmarContraseñaNueva" onChange={this.handleChange}></input>
                </div>
                <Grid container spacing={16}>
                    <Grid item xs={5} className="margenBoton">
                        <button
                            className="botonLogin"
                            onClick={() => this.handleClose()}>
                            Volver
                            </button>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={5}>
                        <button
                            className="botonLogin"
                            onClick={this.handleEnviar}
                            disabled={this.validarConfirmar()}>Confirmar</button>
                    </Grid>
                </Grid>
                <SnackBarPersonal mensajeError={errorMessage} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
            </Container>
            <DialogVolver
                titulo={"Contraseña modificada"}
                descripcion={"Le confirmamos que su contraseña se modificó exitosamente"}
                handlers={{ onChange: this.handleClose }}
                open={open}
            />
        </div>
    )
}
}
