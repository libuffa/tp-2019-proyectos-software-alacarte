import React, { Component } from 'react'
import '../estilosPaginas.scss';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { CircularProgress, Grid, Typography, Paper, ListSubheader, ListItemText, IconButton, FormControl, InputLabel, TextField } from '@material-ui/core';
import InputFormulario from '../../components/InputFormulario/InputFormulario.js';
import BotonesEmpleado from '../../components/botonesEmpleado/BotonesEmpleado.js';
import DeleteIcon from "@material-ui/icons/Delete";
import SelectorPuesto from '../../components/selectorPuesto/SelectorPuesto';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import DialogVolver from '../../components/Dialog/DialogVolver';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';

export default class FomularioItemCarta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            openConfirmation: false,
            openConfirmationDelete: false,
            mensaje: "",
            mensajeDialog: "",
            tituloDialog: "",
            variant: "",
            itemCarta: null,
            idItemCarta: this.props.location.state ? this.props.location.state.idItemCarta : 0,
            titulo: "",
            descripcion: "",
            precioUnitario: "",
            categoria: "",
            subCategoria: "",
            modificado: false,
            disabled: false,
            checkUser: null,
            usuarioErroneo: false,
            mensajeUsuario: "",
        }
        this.verCarta = this.verCarta.bind(this)
    }

    componentDidMount() {
        if (this.state.idItemCarta) {
            this.cargarItemCarta(this.state.idItemCarta)
        }
    }

    componentWillUnmount() {
        this.volver()
    }

    cargarItemCarta(idItemCarta) {
        ServiceLocator.ItemsCartaService.getItemCarta(idItemCarta)
            .then((itemCarta) => {
                this.setState({
                    itemCarta: itemCarta,
                    titulo: itemCarta.titulo,
                    descripcion: itemCarta.descripcion,
                    precioUnitario: itemCarta.precioUnitario,
                    categoria: itemCarta.categoria,
                    subCategoria: itemCarta.subCategoria,
                })
            })
    }

    agregarItemCarta = () => {
        const { idItemCarta, titulo, descripcion, precioUnitario, categoria, subCategoria } = this.state;

        if (!precioUnitario || !categoria || !precioUnitario || !descripcion || !subCategoria) {
            this.generarMensaje("Debe completar todos los campos", "error")
        } else {
            ServiceLocator.ItemsCartaService.agregarItemCarta({
                "id": idItemCarta,
                "titulo": titulo,
                "descripcion": descripcion,
                "categoria": categoria,
                "subcategoria": subCategoria,
                "precioUnitario": precioUnitario,
            }).then(respuesta => {
                if (respuesta) {
                    respuesta.error ?
                        this.generarMensaje(respuesta.error, "error") :
                        this.handleOpen("!Muy Bien¡", respuesta)
                } else {
                    this.generarMensaje("Error en el servidor", "error")
                }
            })
        }
    }

    eliminarItemCarta = () => {
        if (!this.state.openConfirmationDelete) {
            this.openConfirmationDelete()
        } else {
            ServiceLocator.ItemsCartaService.eliminarItemCarta({
                "id": this.state.idItemCarta,
            }).then(respuesta => {
                if (respuesta) {
                    if (respuesta.error) {
                        this.openConfirmationDelete();
                        this.generarMensaje(respuesta.error, "error");
                    } else {
                        this.openConfirmationDelete();
                        this.setState({ disabled: true })
                        setTimeout(() => { this.verCarta() }, 3000);
                        this.generarMensaje(respuesta, "success");
                    }
                } else {
                    this.generarMensaje("Error en el servidor", "error") && this.openConfirmationDelete()
                }
            })
        }
    }

    volver = () => {
        if (!this.state.openConfirmation) {
            if (this.state.modificado) {
                this.openConfirmation()
            } else {
                this.verCarta()
            }
        } else {
            this.verCarta()
            this.openConfirmation()
        }
    }

    openConfirmation = () => {
        this.setState({
            openConfirmation: !this.state.openConfirmation
        })
    }

    openConfirmationDelete = () => {
        this.setState({
            openConfirmationDelete: !this.state.openConfirmationDelete
        })
    }

    verCarta = () => {
        this.props.history.push('/carta')
    }

    modificarAtributo = (atributo, valor) => {
        // if (atributo === "nombreUsuario") {
        //   clearTimeout(this.state.checkUser)
        //   this.setState({
        //     checkUser: setTimeout(() => { this.validarUsuario(valor) }, 1000)
        //   })
        // }
        this.setState({
            [atributo]: valor,
            modificado: true,
        })
    }

    modificarTextField = name => event => {
        this.setState({
            [name]: event.target.value,
            modificado: true,
        });
    };

    generarMensaje(mensaje, variant) {
        this.setState({
            mensaje,
            variant
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

    handleOpen(titulo, mensaje) {
        this.setState({
            tituloDialog: titulo,
            mensajeDialog: mensaje,
            open: true,
        })
    }

    handleClose = () => {
        this.verCarta()
        this.setState({
            open: false,
        })
    }

    render() {
        const { mensajeUsuario, usuarioErroneo, idItemCarta, titulo, disabled, modificado, itemCarta, open, mensaje, variant, mensajeDialog, tituloDialog, precioUnitario, descripcion, categoria, subCategoria } = this.state;

        if (!itemCarta && idItemCarta) {
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
                    <ListItemText primary={"ItemCarta"} />
                </ListSubheader>
                <div className="dividerLista" />
                <Paper elevation={0} square className="detalleEmpleado">
                    <Grid container spacing={0}>
                        <Grid item xs={10} >
                            <Typography variant="h4">
                                {itemCarta ? itemCarta.titulo : "Nuevo item carta"}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="botonEliminarContainer">
                            {itemCarta &&
                                <IconButton onClick={this.eliminarItemCarta} edge="end" >
                                    <DeleteIcon />
                                </IconButton>}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="divider" />
                        </Grid>
                        <Grid item xs={12} >
                            {itemCarta && <Typography variant="h6" color="textSecondary">
                                {"Precio unitario: "}{itemCarta.precioUnitario}
                            </Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            {itemCarta && <div className="divider" />}
                        </Grid>
                        <Grid item xs={12}>
                            <InputFormulario
                                previo={titulo}
                                atributo={"titulo"}
                                label={"Titulo"}
                                disabled={disabled}
                                handlers={{ onChange: this.modificarAtributo }}
                                maxLength={20}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="component-helper">{'Descripcion|'}</InputLabel>
                            <TextField
                                id="descripcion"
                                value={descripcion}
                                onChange={this.modificarTextField('descripcion')}
                                fullWidth={true}
                                multiline
                                rows="4"
                                placeholder="Descripcion"
                                margin="normal"
                                variant="outlined"
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputFormulario
                                previo={precioUnitario}
                                atributo={"precioUnitario"}
                                disabled={disabled}
                                handlers={{ onChange: this.modificarAtributo }}
                                label={"PrecioUnitario"}
                                maxLength={20}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectorPuesto
                                previo={categoria}
                                atributo={"categoria"}
                                disabled={disabled}
                                handlers={{ onChange: this.modificarAtributo }}
                                label={"Categoria"}
                                values={{ list: ["Entrada","Plato_Principal","Postre","Bebida","Cafeteria"]}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputFormulario
                                previo={subCategoria}
                                atributo={"subcategoria"}
                                label={"Subcategoria"}
                                disabled={disabled}
                                handlers={{ onChange: this.modificarAtributo }}
                                maxLength={20}
                            />
                        </Grid>
                    </Grid>
                    <BotonesEmpleado
                        text1={"Volver"}
                        text2={"Guardar"}
                        cancelar={{ onChange: this.volver }}
                        aceptar={{ onChange: this.agregarItemCarta }}
                        disabled1={disabled}
                        disabled2={(!titulo || disabled || !titulo || !descripcion || !precioUnitario || !categoria || !subCategoria)}
                    />
                </Paper>
                <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
                <DialogVolver
                    titulo={tituloDialog}
                    descripcion={mensajeDialog}
                    handlers={{ onChange: this.handleClose }}
                    open={open}
                />
                <DialogConfirmacion
                    titulo={"Atención"}
                    descripcion={"Se perderan los cambios realizados"}
                    handlers={{ onChange: this.volver, open: this.openConfirmation }}
                    open={this.state.openConfirmation}
                />
                <DialogConfirmacion
                    titulo={"Atención"}
                    descripcion={"¿Seguro que quiere eliminar el item de Carta?"}
                    handlers={{ onChange: this.eliminarItemCarta, open: this.openConfirmationDelete }}
                    open={this.state.openConfirmationDelete}
                />
            </div>
        )
    }
}