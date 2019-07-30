import React, { Component } from 'react'
import '../estilosPaginas.scss';
import { ServiceLocator } from "../../services/ServiceLocator.js";
import { CircularProgress, Grid, Typography, Paper, ListSubheader, ListItemText, IconButton, InputLabel, TextField, Switch, Button, Chip, Avatar } from '@material-ui/core';
import BotonesEmpleado from '../../components/botonesEmpleado/BotonesEmpleado.js';
import DeleteIcon from "@material-ui/icons/Delete";
import SelectorPuesto from '../../components/selectorPuesto/SelectorPuesto';
import SnackBarPersonal from '../../components/snackBarPersonal/SnackBarPersonal';
import DialogVolver from '../../components/Dialog/DialogVolver';
import DialogConfirmacion from '../../components/Dialog/DialogConfirmacion';
import InputEmpleado from '../../components/inputEmpleado/InputEmpleado';
import ImageDialog from '../../components/imageDialog/ImageDialog';

export default class DetalleItemCartaAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openConfirmation: false,
      openConfirmationDelete: false,
      openConfirmationDeshabilitar: false,
      mensaje: "",
      mensajeDialog: "",
      tituloDialog: "",
      variant: "",
      idItemCarta: this.props.location.state ? this.props.location.state.idItemCarta : 0,
      itemCarta: null,
      titulo: "",
      descripcion: "",
      categoria: "",
      subCategoria: "",
      precioUnitario: "",
      imagenes: [],
      subCategorias: [],
      categorias: [],
      modificado: false,
      disabled: false,
      nuevaSubCategoria: false,
      rutaImagen: "",
      image: "",
      openImage: false,
    }
    this.verCarta = this.verCarta.bind(this)
  }

  componentDidMount() {
    if (this.state.idItemCarta) {
      this.cargarItemCarta(this.state.idItemCarta)
    }
    this.cargarCategorias()
    this.cargarSubCategorias()
  }

  cargarItemCarta() {
    ServiceLocator.ItemsCartaService.getItemCarta(this.state.idItemCarta)
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              itemCarta: respuesta,
              titulo: respuesta.titulo,
              descripcion: respuesta.descripcion,
              categoria: respuesta.categoria,
              subCategoria: respuesta.subCategoria,
              precioUnitario: respuesta.precioUnitario,
              imagenes: respuesta.imagenes,
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  cargarCategorias() {
    ServiceLocator.ItemsCartaService.getCategorias()
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              categorias: respuesta
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  cargarSubCategorias() {
    ServiceLocator.ItemsCartaService.getSubCategorias()
      .then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.setState({
              subCategorias: respuesta
            })
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  agregarItemCarta = () => {
    const { idItemCarta, titulo, descripcion, precioUnitario, categoria, subCategoria, imagenes } = this.state;

    if (!precioUnitario || !categoria || !precioUnitario || !descripcion || !subCategoria) {
      this.generarMensaje("Debe completar todos los campos", "error")
    } else {
      var subCategoriaS = subCategoria.toLocaleLowerCase()
      subCategoriaS = subCategoriaS.charAt(0).toUpperCase() + subCategoriaS.slice(1)
      ServiceLocator.ItemsCartaService.amItemCarta({
        "id": idItemCarta,
        "titulo": titulo,
        "descripcion": descripcion,
        "categoria": categoria,
        "subCategoria": subCategoriaS,
        "precioUnitario": precioUnitario,
        "imagen1": imagenes[0] ? imagenes[0] : "",
        "imagen2": imagenes[1] ? imagenes[1] : "",
        "imagen3": imagenes[2] ? imagenes[2] : "",
        "imagen4": imagenes[3] ? imagenes[3] : "",
        "imagen5": imagenes[4] ? imagenes[4] : "",
      }).then(respuesta => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
            if (this.state.idItemCarta) {
              this.cargarItemCarta(this.state.idItemCarta)
            }
          } else {
            this.handleOpen("¡Muy Bien!", respuesta)
          }
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
      ServiceLocator.ItemsCartaService.bajaItemCarta(this.state.idItemCarta)
        .then(respuesta => {
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

  nuevaSub = () => {
    this.setState({
      subCategoria: (this.state.itemCarta ? this.state.itemCarta.subCategoria : ""),
      nuevaSubCategoria: !this.state.nuevaSubCategoria,
    })
  }

  cambiarEstadoItemCarta = () => {
    ServiceLocator.ItemsCartaService.updateEstadoItem(this.state.idItemCarta)
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error, "error")
          } else {
            this.generarMensaje(respuesta, "success")
            this.cargarItemCarta()
          }
        } else {
          this.generarMensaje("Error en el servidor", "error")
        }
      })
  }

  deshabilitar = () => {
    if (!this.state.openConfirmationDeshabilitar && this.state.itemCarta.habilitado) {
      this.openConfirmationDeshabilitar()
    } else {
      this.cambiarEstadoItemCarta()
      if (this.state.openConfirmationDeshabilitar) {
        this.openConfirmationDeshabilitar()
      }
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

  cargarRuta = event => {
    var path = event.target.value.slice(12)
    path = "/imagenes/" + path
    this.setState({
      rutaImagen: path,
    })
  }

  agregarImagen = () => {
    this.setState({
      imagenes: this.state.imagenes.concat([this.state.rutaImagen]),
      modificado: true,
    })
  }

  removeImage = imagen => {
    var imagenesFiltradas = this.state.imagenes.filter(img => img !== imagen)
    this.setState({
      imagenes: imagenesFiltradas,
      modificado: true,
    })
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

  openConfirmationDeshabilitar = () => {
    this.setState({
      openConfirmationDeshabilitar: !this.state.openConfirmationDeshabilitar
    })
  }

  verCarta = () => {
    this.props.history.push('/carta')
  }

  modificarAtributo = (atributo, valor) => {
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

  handleChange(imagenes) {
    this.setState({
      imagenes: imagenes,
      modificado: true,
    });
  }

  openImage = (imagen) => {
    this.setState({
      image: imagen,
      openImage: true,
    })
  }

  closeImage = () => {
    this.setState({
      image: "",
      openImage: false,
    })
  }

  render() {
    const { openImage, image, rutaImagen, imagenes, nuevaSubCategoria, categorias, subCategorias, idItemCarta, titulo, disabled, modificado, itemCarta, open, mensaje, variant, mensajeDialog, tituloDialog, precioUnitario, descripcion, categoria, subCategoria } = this.state;

    if (!itemCarta && idItemCarta) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    } else {
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
                  {itemCarta ? itemCarta.titulo : "Nuevo Item"}
                </Typography>
              </Grid>
              <Grid item xs={2} className="botonEliminarContainer">
                {itemCarta &&
                  <IconButton onClick={this.eliminarItemCarta} edge="end" disabled={disabled} >
                    <DeleteIcon />
                  </IconButton>}
              </Grid>
              <Grid item xs={12} >
                <Typography variant="h5" color="textSecondary">
                  {itemCarta ? itemCarta.subCategoria : "Alta de item"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {itemCarta && <div className="divider" />}
              </Grid>
              <Grid item xs={10} >
                {itemCarta && <Typography variant="h6" color="textSecondary">
                  {"Habilitado"}
                </Typography>}
              </Grid>
              <Grid item xs={2} className="botonEliminarContainer">
                {itemCarta &&
                  <Switch size="small" checked={itemCarta.habilitado} onChange={() => { this.deshabilitar() }} disabled={disabled} />}
              </Grid>
              <Grid item xs={12}>
                <div className="divider" />
              </Grid>
              <Grid item xs={12} >
                {itemCarta && <Typography variant="h6" color="textSecondary">
                  {"Precio unitario: $"}{itemCarta.precioUnitario}
                </Typography>}
              </Grid>
              <Grid item xs={12}>
                {itemCarta && <div className="divider" />}
              </Grid>
              <Grid item xs={12}>
                <InputEmpleado
                  previo={titulo}
                  atributo={"titulo"}
                  label={"Titulo"}
                  disabled={disabled}
                  handlers={{ onChange: this.modificarAtributo }}
                  maxLength={30}
                />
              </Grid>
              <Grid item xs={1}>
                <div className="full flexCenter">
                  <Typography variant="h5" color="textSecondary">$</Typography>
                </div>
              </Grid>
              <Grid item xs={11}>
                <InputEmpleado
                  previo={precioUnitario}
                  atributo={"precioUnitario"}
                  label={"Precio"}
                  disabled={disabled}
                  handlers={{ onChange: this.modificarAtributo }}
                  maxLength={10}
                  type={"number"}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="component-helper">{'Descripcion'}</InputLabel>
                <TextField
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
                <SelectorPuesto
                  previo={categoria}
                  atributo={"categoria"}
                  disabled={disabled}
                  handlers={{ onChange: this.modificarAtributo }}
                  label={"Categoría"}
                  lista={categorias}
                />
              </Grid>
              {!nuevaSubCategoria ?
                <Grid item xs={8}>
                  <SelectorPuesto
                    previo={subCategoria}
                    atributo={"subCategoria"}
                    disabled={disabled}
                    handlers={{ onChange: this.modificarAtributo }}
                    label={"Sub Categoria"}
                    lista={subCategorias}
                  />
                </Grid> : ""}
              {!nuevaSubCategoria ?
                <Grid item xs={1} /> : ""}
              {!nuevaSubCategoria ?
                <Grid item xs={3}>
                  <div className="full flexCenter">
                    <Button color="primary" variant="contained" fullWidth onClick={this.nuevaSub} disabled={disabled}>
                      <Typography variant="overline" >
                        Nueva
                      </Typography>
                    </Button>
                  </div>
                </Grid> : ""}
              {nuevaSubCategoria ?
                <Grid item xs={8}>
                  <InputEmpleado
                    previo={subCategoria}
                    atributo={"subCategoria"}
                    label={"Sub Categoria"}
                    disabled={disabled}
                    handlers={{ onChange: this.modificarAtributo }}
                    maxLength={30}
                  />
                </Grid> : ""}
              {nuevaSubCategoria ?
                <Grid item xs={1} /> : ""}
              {nuevaSubCategoria ?
                <Grid item xs={3}>
                  <div className="full flexCenter">
                    <Button color="primary" variant="contained" fullWidth onClick={this.nuevaSub} disabled={disabled}>
                      <Typography variant="overline">
                        Otra
                      </Typography>
                    </Button>
                  </div>
                </Grid> : ""}
              <Grid item xs={8}>
                <div className="full flexCenter contenedorInput">
                  <input type="file" onChange={this.cargarRuta} className="fullWidth" />
                </div>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <div className="full flexCenter">
                  <Button color="primary" variant="contained" fullWidth onClick={this.agregarImagen} disabled={disabled || !rutaImagen || imagenes.length >= 5}>
                    <Typography variant="overline">
                      agregar
                    </Typography>
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="contenedorChips full botonCentrado">
                  {imagenes ? imagenes.map((imagen) => {
                    return (
                      <Chip
                        key={Math.random()}
                        avatar={<Avatar><img src={imagen} alt={""} /></Avatar>}
                        label="Foto"
                        onClick={() => this.openImage(imagen)}
                        onDelete={() => this.removeImage(imagen)}
                        className="marginChips"
                        disabled={disabled}
                      />
                    )
                  }) : ""}
                </div>
              </Grid>
            </Grid>
            <br />
            <BotonesEmpleado
              text1={"Volver"}
              text2={"Guardar"}
              cancelar={{ onChange: this.volver }}
              aceptar={{ onChange: this.agregarItemCarta }}
              disabled1={disabled}
              disabled2={(!titulo || disabled || !titulo || !descripcion || !precioUnitario || !categoria || !subCategoria || !modificado)}
            />
          </Paper>
          <DialogVolver
            titulo={tituloDialog}
            descripcion={mensajeDialog}
            handlers={{ onChange: this.handleClose }}
            open={open}
          />
          <DialogConfirmacion
            titulo={"Aviso"}
            descripcion={"Se perderan los cambios realizados"}
            handlers={{ onChange: this.volver, open: this.openConfirmation }}
            open={this.state.openConfirmation}
          />
          <DialogConfirmacion
            titulo={"Atención"}
            descripcion={"¿Seguro que quiere eliminar el plato?"}
            handlers={{ onChange: this.eliminarItemCarta, open: this.openConfirmationDelete }}
            open={this.state.openConfirmationDelete}
          />
          <DialogConfirmacion
            titulo={"Atención"}
            descripcion={"¿Seguro que quiere deshabilitar el plato?"}
            handlers={{ onChange: this.deshabilitar, open: this.openConfirmationDeshabilitar }}
            open={this.state.openConfirmationDeshabilitar}
          />
          {(image !== "") && <ImageDialog abrir={openImage} imagen={image} cerrar={{ onChange: this.closeImage }} />}
          <SnackBarPersonal mensajeError={mensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={variant} />
        </div>
      )
    }
  }
}