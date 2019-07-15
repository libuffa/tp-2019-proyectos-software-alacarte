import React, { Component } from "react";
import '../estilosPaginas.scss';
import Combinacion from "./Combinacion";
import { ListSubheader, ListItemText, Container } from "@material-ui/core";
import BotonVolver from "../../components/botonVolver/BotonVolver";
import DialogConfirmacion from "../../components/Dialog/DialogConfirmacion";
import { ServiceLocator } from "../../services/ServiceLocator";
import SnackBarPersonal from "../../components/snackBarPersonal/SnackBarPersonal";
import DialogVolver from "../../components/Dialog/DialogVolver";

export default class Minijuego extends Component {
  constructor(props) {
    super(props)
    this.state = {
      combinaciones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      combinacion: 0,
      openConfirmation: false,
      juegaPorPremio: false,
      snackBarMensaje: "",
      open: false,
    }
  }

  componentDidMount() {
    ServiceLocator.SesionService.getSesionActiva()
      .then((respuesta) => {
        if (respuesta) {
          this.setState({
            juegaPorPremio: respuesta.juegaPorPremio
          })
        }
      })
    ServiceLocator.SesionService.jugar()
      .then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error)
          }
        }
      })
  }

  generarMensaje(mensaje) {
    this.setState({
      snackBarMensaje: mensaje,
    })
  }

  snackbarOpen() {
    return this.state.snackBarMensaje !== ""
  }

  snackbarClose = () => {
    this.setState({
      snackBarMensaje: ""
    })
  }

  volver = () => {
    if (!this.state.openConfirmation) {
      if (this.state.juegaPorPremio) {
        this.openConfirmation()
      } else {
        this.verPedido()
      }
    } else {
      this.verPedido()
      this.openConfirmation()
    }
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  siguiente = () => {

    this.setState({
      combinacion: this.state.combinacion + 1
    })
  }

  closeDialog = () => {
    this.verPedido()
    this.setState({
      open: false,
    })
  }

  openConfirmation = () => {
    this.setState({
      openConfirmation: !this.state.openConfirmation
    })
  }

  ganar = () => {
    if (this.state.juegaPorPremio) {
      ServiceLocator.SesionService.ganarPremio().then((respuesta) => {
        if (respuesta) {
          if (respuesta.error) {
            this.generarMensaje(respuesta.error)
          } else {
            this.setState({
              combinacion: 11,
              tituloDialog: "!Felicidades¡",
              mensajeDialog: "¡Ganaste el premio!. Va a estar disponible para reclamar en tu pantalla de pedido.",
              open: true
            })
          }
        } else {
          this.generarMensaje("Error en el servidor")
        }
      })
    } else {
      this.setState({
        combinacion: 11,
        tituloDialog: "!Felicidades¡",
        mensajeDialog: "Sos toda una mente brillante",
        open: true
      })
    }
  }

  render() {
    const { combinaciones, combinacion, snackBarMensaje, open, mensajeDialog, tituloDialog } = this.state;

    return (
      <div>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Mente Maestra"} />
        </ListSubheader>
        <div className="dividerLista" />
        <Container>
          {combinaciones.map(comb => {
            return (
              <div>
                <Combinacion
                  key={comb}
                  disabled={combinacion !== comb}
                  siguiente={{ onChange: this.siguiente }}
                  ganar={{ onChange: this.ganar }}
                  selected={combinacion === comb}
                />
              </div>
            )
          })}
          <BotonVolver
            cancelar={{ onChange: this.volver }}
            text={"volver"}
          />
        </Container>
        <SnackBarPersonal mensajeError={snackBarMensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
        <DialogVolver
          titulo={tituloDialog}
          descripcion={mensajeDialog}
          handlers={{ onChange: this.closeDialog }}
          open={open}
        />
        <DialogConfirmacion
          titulo={"Cuidado"}
          descripcion={"Si salis ahora vas a perder la oportunidad de ganar el premio, ¿Estas seguro de salir?"}
          handlers={{ onChange: this.volver, open: this.openConfirmation }}
          open={this.state.openConfirmation}
        />
      </div>
    );
  }
}