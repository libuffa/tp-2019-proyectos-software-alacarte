import React, { Component } from "react";
import '../estilosPaginas.scss';
import Combinacion from "./Combinacion";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import BotonVolver from "../../components/botonVolver/BotonVolver";
import DialogConfirmacion from "../../components/Dialog/DialogConfirmacion";
import { ServiceLocator } from "../../services/ServiceLocator";
import SnackBarPersonal from "../../components/snackBarPersonal/SnackBarPersonal";
import DialogVolver from "../../components/Dialog/DialogVolver";
import { withStyles } from '@material-ui/styles';

const styles = {
  boton: {
    marginTop: '6px',
    marginBottom: '6px',
    width: '70px',
  },
  container: {
    backgroundColor: '#3f51b5',
    color: '#fff',
  },
  uno: { color: '#f900ff', margin: '3px' },
  dos: { color: '#2500ff', margin: '3px' },
  tres: { color: '#00c6ff', margin: '3px' },
  cuatro: { color: '#35ff00', margin: '3px' },
  cinco: { color: '#ff8b00', margin: '3px' },
  seis: { color: '#ff0000', margin: '3px' },
};

class Minijuego extends Component {
  constructor(props) {
    super(props)
    this.state = {
      combinaciones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      combinacion: 0,
      clave: [2, 2, 4, 4],
      openConfirmation: false,
      juegaPorPremio: false,
      snackBarMensaje: "",
      open: false,
      openInfo: false,
    }
  }

  componentDidMount() {
    ServiceLocator.SesionService.getSesionActiva()
      .then((respuesta) => {
        if (respuesta) {
          if (!respuesta.pideCuenta) {
            this.setState({
              juegaPorPremio: respuesta.juegaPorPremio
            })
          }
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
    if ((this.state.combinacion + 1) === 10) {
      this.setState({
        combinacion: this.state.combinacion + 1,
        tituloDialog: "Juego terminado",
        mensajeDialog: <div>Perdiste, el código era:
          <div className="flex flexCenter">
            {this.state.clave.map((numero) => <Typography className=
              {
                (numero === 1 && this.props.classes.uno) ||
                (numero === 2 && this.props.classes.dos) ||
                (numero === 3 && this.props.classes.tres) ||
                (numero === 4 && this.props.classes.cuatro) ||
                (numero === 5 && this.props.classes.cinco) ||
                (numero === 6 && this.props.classes.seis)
              }>
              {"█"}
            </Typography>)}
          </div> mejor suerte para la próxima.</div>,
        open: true
      })
    } else {
      this.setState({
        combinacion: this.state.combinacion + 1,
      })
    }
  }

  closeDialog = () => {
    this.verPedido()
    this.setState({
      open: false,
    })
  }

  closeDialogInfo = () => {
    this.setState({
      openInfo: false,
    })
  }

  openDialogInfo = () => {
    this.setState({
      openInfo: true,
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
    const { combinaciones, combinacion, snackBarMensaje, open, mensajeDialog, tituloDialog, clave, openInfo } = this.state;

    return (
      <div>
        <div className="dividerLista" />
        <div>
          <Container className={this.props.classes.container}>
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Grid container spacing={0} className="full">
                  <Grid item xs={3}>
                    <div className="full flexCenter"><Typography variant="h6"> {"▼"} </Typography></div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="full flexCenter"><Typography variant="h6"> {"▼"} </Typography></div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="full flexCenter"><Typography variant="h6"> {"▼"} </Typography></div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="full flexCenter"><Typography variant="h6"> {"▼"} </Typography></div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <div className="full botonCentrado">
                  <Button variant="contained" color="secondary" className={this.props.classes.boton} onClick={this.openDialogInfo}><Typography variant="body2">reglas</Typography></Button>
                </div>
              </Grid>
            </Grid>
          </Container>
          {combinaciones.map(comb => {
            return (
              <div key={comb}>
                <Combinacion
                  key={comb}
                  disabled={combinacion !== comb}
                  siguiente={{ onChange: this.siguiente }}
                  ganar={{ onChange: this.ganar }}
                  selected={combinacion === comb}
                  numero={comb}
                  clave={clave}
                />
              </div>
            )
          })}
          <Container>
            <BotonVolver
              cancelar={{ onChange: this.volver }}
              text={"salir"}
            />
          </Container>
        </div>
        <SnackBarPersonal mensajeError={snackBarMensaje} abrir={this.snackbarOpen()} cerrar={{ onChange: this.snackbarClose }} variant={"error"} />
        <DialogVolver
          titulo={tituloDialog}
          descripcion={mensajeDialog}
          handlers={{ onChange: this.closeDialog }}
          open={open}
        />
        <DialogVolver
          titulo={"Reglas"}
          descripcion={<div><div> - Por cada suposición que sea correcta tanto en color como en posición, obtenes un "Bien" en negro.</div><br /><div>' - Por cada suposición de color correcto pero no de posición, obtenes un "Regular" en rojo.'</div></div>}
          handlers={{ onChange: this.closeDialogInfo }}
          open={openInfo}
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

export default withStyles(styles)(Minijuego);