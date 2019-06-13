import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido/VisualizarPedido';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import VisualizarCartaEmpleado from './pages/visualizarCartaEmpleado/VisualizarCartaEmpleado';
import DetalleItemCarta from './pages/detalleItemCarta/DetalleItemCarta';
import Header from './components/Header/Header';
import './App.css';
import VisualizarPedidoCocina from './pages/VisualizarPedido/VisualizarPedidoCocina/VisualizarPedidoCocina';
import { ControllerDeSesion } from './controller/ControllerDeSesion';
import EscanearQR from './pages/escanearQR/EscanearQR';

function RouterPrincipal() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/pedido/:id" exact component={VisualizarPedido} />
          <Route path="/cocina" exact component={VisualizarPedidoCocina} />
          <Route path="/mesa" exact component={VisualizarMesa} />
          <Route path="/carta/:id" exact component={VisualizarCarta} />
          <Route path="/detalleItemCarta" exact component={DetalleItemCarta} />
          <Route path="/cartaEmpleado" exact component={VisualizarCartaEmpleado} />
          <Route path="/escanearQR" exact component={EscanearQR} />
          <Route component={Redirect} />
        </Switch>
      </div>
    </Router>
  );
}

function Redirect(props) {
  props.history.push('/carta/1')
  return (
    <h1>Cargando..</h1>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sesionActiva: ControllerDeSesion.getSesionActiva()
    }
  }

  handleAbrirSesion = (sesion) => {
    ControllerDeSesion.setSesionActiva(sesion)
    this.setState({
      sesionActiva: sesion
    })
  }

  render() {
    return (
      <div>
        {(this.state.sesionActiva && <RouterPrincipal></RouterPrincipal>) || <EscanearQR iniciarSesion={this.handleAbrirSesion}></EscanearQR>}
      </div>
    )
  }
}

export default App;