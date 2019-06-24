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

    const url = `http://api.qrserver.com/v1/create-qr-code/?data=${this.props.location.state.mesa.sesion.id}!&size=200x200`

    console.log(this.props.location.state.mesa.sesion.id)

    const menuButtons = {
      firstButton: {
        onChange: this.verDetalleMesa,
        name: "Ver Detalle Mesa",
        icon: (<ArrowBack />)
      },
    }


    return (
      <div>
        <Container component="main" maxWidth="xs">
          <br></br>
          <Typography align='center' variant="h5">
            {"¡Escanea este codigo y comenza a pedir!"}
          </Typography>
          <div align='center'>
            <img className="qr" src={url} alt="qr code" title="qr" />
          </div>
          <div className="qr">
            <Typography align="center" variant="h5">
              {"Sesion: " + this.props.location.state.mesa.sesion.id}
            </Typography>
          </div>
        </Container>
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}