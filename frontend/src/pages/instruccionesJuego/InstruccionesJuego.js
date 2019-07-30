import React, { Component } from "react";
import '../estilosPaginas.scss';
import { Typography, Container, Button, ListSubheader, ListItemText } from "@material-ui/core";

export default class InstruccionesJuego extends Component {

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  minijuego = () => {
    this.props.history.push('/minijuego')
  }

  render() {
    return (
      <div className="fullWidth">
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Instrucciones"} />
        </ListSubheader>
        <div className="dividerLista" />
        <Container component="main" maxWidth="xl">
          <br />
          <Typography align='center' variant="h5">
            {"¡Jugá y ganá!"}
          </Typography>
          <br />
          <Typography align='center' variant="subtitle1">
            {"Al comienzo de cada juego, se genera un código secreto de cuatro colores. Los colores siempre se eligen de los mismos seis disponibles. Se permiten duplicados, por lo que incluso podría elegir el mismo color cuatro veces."}
          </Typography>
          <Typography align='center' variant="subtitle1">
            {"Tu objetivo es adivinar el código secreto. Tenes que adivinar los colores y el orden en el que aparecen en el código secreto."}
          </Typography>
          <Typography align='center' variant="subtitle1">
            {"Elegi cuatro colores en la fila activa y hace clic en el botón de verificación ( ✓ ). Se va a puntuar tu conjetura de la siguiente manera:"}
          </Typography>
          <br />
          <Typography align='center' variant="subtitle1">
            {' - Por cada suposición que sea correcta tanto en color como en posición, obtenes un "Bien" en negro.'}
          </Typography>
          <Typography align='center' variant="subtitle1">
            {' - Por cada suposición de color correcto pero no de posición, obtenes un "Regular" en rojo.'}
          </Typography>
          <br />
          <Typography align='center' variant="subtitle1">
            {"Tenes diez (10) filas para hacer tus conjeturas, si las agotas todas sin adivinar el código, perdes el juego."}
          </Typography>
          <Typography align='center' variant="subtitle1">
            {"En caso de perder, vas a poder seguir jugando, pero ya no vas a tener premio si ganas."}
          </Typography>
          <br />
          <Typography align='center' variant="subtitle1">
            {"Si logras adivinarlo antes de las diez filas"}
          </Typography>
          <Typography align='center' variant="subtitle1">
            {"¡TE LLEVAS UN PREMIO!"}
          </Typography>
          <br />
          <Typography align='center' variant="h5">
            {"¡Buena suerte!"}
          </Typography>
          <br />
          <Button fullWidth variant="contained" color="primary" onClick={this.minijuego}>
            <Typography variant="overline">
              jugar
            </Typography>
          </Button>
          <br />
          <br />
          <Button fullWidth variant="contained" color="primary" onClick={this.verPedido}>
            <Typography variant="overline">
              volver
            </Typography>
          </Button>
          <br />
          <br />
        </Container>
      </div>
    );
  }
}