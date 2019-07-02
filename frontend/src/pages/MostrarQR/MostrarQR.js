import React, { Component } from 'react'
import { Container, Typography, CircularProgress } from '@material-ui/core';
import MenuInferior from '../../components/menuInferior/MenuInferior';
import ArrowBack from '@material-ui/icons/ArrowBack';
import '../estilosPaginas.scss';

export default class MostrarQR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mesa: null
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        mesa: this.props.location.state.mesa,
      })
    }
  }

  verDetalleMesa = () => {
    this.props.history.push({
      pathname: '/detalle/mesa',
      state: { mesa: this.state.mesa }
    })
  }

  render() {
    const { mesa } = this.state

    if (!mesa) {
      return (
        <div className="fullWidth center">
          <CircularProgress size={80} />
        </div>
      )
    }

    const url = `http://api.qrserver.com/v1/create-qr-code/?data=${this.props.location.state.mesa.sesion.id}&size=200x200`

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
            {"¡Escaneá este código y empezá a pedir!"}
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