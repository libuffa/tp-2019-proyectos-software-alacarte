import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido/VisualizarPedido';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import VisualizarCartaEmpleado from './pages/visualizarCartaEmpleado/VisualizarCartaEmpleado';
import DetalleItemCarta from './pages/detalleItemCarta/DetalleItemCarta';
import DetalleItemPedido from './pages/detalleItemPedido/DetalleItemPedido';
import Header from './components/Header/Header';
import './App.css';
import VisualizarPedidoCocina from './pages/VisualizarPedido/VisualizarPedidoCocina/VisualizarPedidoCocina';
import { ControllerDeSesion } from './controller/ControllerDeSesion';
import EscanearQR from './pages/escanearQR/EscanearQR';
import Login from './pages/Login/Login';
import { ControllerDeEmpleado } from './controller/ControllerDeEmpleado';

function RouterPrincipal() {
  return (
    <Router>
      <div>
        <Header sidenav={true} />
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedido} />
          <Route path="/pedido/cocina" exact component={VisualizarPedidoCocina} />
          <Route path="/mesa" exact component={VisualizarMesa} />
          <Route path="/carta" exact component={VisualizarCarta} />
          <Route path="/detalle/item/carta" exact component={DetalleItemCarta} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
          <Route path="/carta/empleado" exact component={VisualizarCartaEmpleado} />
          <Route path="/escanearQR" exact component={EscanearQR} />
          <Route component={RedirectPrincipal} />
        </Switch>
      </div>
    </Router>
  );
}

function RouterCliente() {
  return (
    <Router>
      <div>
        <Header sidenav={false} />
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedido} />
          <Route path="/carta" exact component={VisualizarCarta} />
          <Route path="/detalle/item/carta" exact component={DetalleItemCarta} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
          <Route path="/escanearQR" exact component={EscanearQR} />
          <Route component={RedirectCliente} />
        </Switch>
      </div>
    </Router>
  );
}

function RouterInicial(props) {
  const { iniciarSesion } = props

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" render={() => <Login iniciarSesion={iniciarSesion.empleado} />} />
          <Route path="/escanearQR" render={() => <EscanearQR iniciarSesion={iniciarSesion.sesion} />} />
          <Route component={RedirectInicial} />
        </Switch>
      </div>
    </Router>
  );
}

function RedirectPrincipal(props) {
  props.history.push('/mesa')
  return (
    <h1>Cargando..</h1>
  )
}

function RedirectCliente(props) {
  props.history.push('/carta')
  return (
    <h1>Cargando..</h1>
  )
}

function RedirectInicial(props) {
  props.history.push('/escanearQR')
  return (
    <h1>Cargando..</h1>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sesionActiva: ControllerDeSesion.getSesionActiva(),
      sesionEmpleadoActiva: ControllerDeEmpleado.getSesionActiva()
    }
  }

  handleAbrirSesion = (sesion) => {
    ControllerDeSesion.setSesionActiva(sesion)
    this.setState({
      sesionActiva: sesion
    })
  }

  handleAbrirSesionEmpleado = (empleado) => {
    ControllerDeEmpleado.setSesionActiva(empleado)
    this.setState({
      sesionEmpleadoActiva: empleado
    })
  }

  render() {
    return (
      <div className="contenedor">
        {(this.state.sesionActiva && <RouterCliente></RouterCliente>)
          || (this.state.sesionEmpleadoActiva && <RouterPrincipal></RouterPrincipal>)
          || <RouterInicial
              iniciarSesion={{
                sesion: this.handleAbrirSesion,
                empleado: this.handleAbrirSesionEmpleado
                }}></RouterInicial>}
      </div>
    )
  }
}

export default App;