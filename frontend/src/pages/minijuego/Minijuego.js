import React, { Component } from "react";
import '../estilosPaginas.scss';
import { Container, Grid } from "@material-ui/core";

export default class Minijuego extends Component {
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
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                1
              </Grid>
              <Grid item xs={3}>
                2
              </Grid>
              <Grid item xs={3}>
                3
              </Grid>
              <Grid item xs={3}>
                4
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                5
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}