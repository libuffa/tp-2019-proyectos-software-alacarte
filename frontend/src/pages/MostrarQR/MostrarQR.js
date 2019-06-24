import React, { Component } from 'react'
import MenuInferior from '../../components/menuInferior/MenuInferior';
import { Container, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './MostrarQR.scss';

export default class MostrarQR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mesa: this.props.location.state.mesa,
    }
  }

  verDetalleMesa = () => {
    this.props.history.push({
      pathname: '/detalle/mesa',
      state: { mesa: this.state.mesa }
    })
  }

  render() {
    console.log(this.state)

    const menuButtons = {
      firstButton: {
        onChange: this.verDetalleMesa,
        name: "Ver Detalle Mesa",
        icon: (<ArrowBack />)
      },
    }

    const url = `http://api.qrserver.com/v1/create-qr-code/?data=${this.props.match.params.id}!&size=200x200`

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <br></br>
          <Typography align='center' variant="h5">
            {"¡Escanea el codigo debajo y comenza a pedir!"}
          </Typography>
          <div align='center'>
            <img className="qr" src={url} alt="qr code" title="qr" />
          </div>
          <Typography align="center" variant="h5">

          </Typography>
        </Container>
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}