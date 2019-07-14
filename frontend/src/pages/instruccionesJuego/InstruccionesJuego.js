import React, { Component } from "react";
import '../estilosPaginas.scss';
import { Typography, Container, Button } from "@material-ui/core";
import BotonVolver from "../../components/botonVolver/BotonVolver";

export default class InstruccionesJuego extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  verPedido = () => {
    this.props.history.push('/pedido')
  }

  minijuego = () => {
    this.props.history.push('/minijuego')
  }

  render() {
    return (
      <Container component="main" maxWidth="xl">
        <br />
        <Typography align='center' variant="h5">
          {"¡Jugá y ganá!"}
        </Typography>
        <br />
        <Typography align='center' variant="subtitle1">
          {"Aca van a ir las instrucciones"}
        </Typography>
        <br />
        <Button fullWidth variant="contained" color="primary" onClick={this.minijuego} className="botonVolver">
          jugar
        </Button>
        <br />
        <br />
        <BotonVolver
          cancelar={{ onChange: this.verPedido }}
          text={"volver"}
        />
      </Container>
    );
  }
}