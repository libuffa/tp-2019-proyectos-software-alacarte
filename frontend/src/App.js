import React, { Component } from 'react';
import VisualizarPedidoCocina from './pages/VisualizarPedido/VisualizarPedidoCocina/VisualizarPedidoCocina';
import DetalleItemCartaEmpleado from './pages/detalleItemCartaEmpleado/DetalleItemCartaEmpleado';
import VisualizarCartaEmpleado from './pages/visualizarCartaEmpleado/VisualizarCartaEmpleado';
import DetalleItemPedidoCocina from './pages/detalleItemPedidoCocina/DetalleItemPedidoCocina';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido/VisualizarPedido';
import DetalleItemPedido from './pages/detalleItemPedido/DetalleItemPedido';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DetalleItemCarta from './pages/detalleItemCarta/DetalleItemCarta';
import { ControllerDeEmpleado } from './controller/ControllerDeEmpleado';
import VisualizarMesas from './pages/visualizarMesas/VisualizarMesas';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import { ControllerDeSesion } from './controller/ControllerDeSesion';
import MenuEmpleado from './pages/menuEmpleado/MenuEmpleado';
import { ServiceLocator } from './services/ServiceLocator';
import DetalleMesa from './pages/detalleMesa/DetalleMesa';
import EscanearQR from './pages/escanearQR/EscanearQR';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import './App.css';
import VisualizarPedidoMozo from './pages/visualizarPedidoMozo/VisualizarPedidoMozo';
import MostrarQR from './pages/MostrarQR/MostrarQR';

function RouterPrincipal(props) {
  const { empleado, opcionesMenu } = props

  return (
    <Router>
      <div>
        <Header empleado={empleado} opcionesMenu={opcionesMenu} />
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedidoMozo} />
          <Route path="/pedido/cocina" exact component={VisualizarPedidoCocina} />
          <Route path="/mesas" exact component={VisualizarMesas} />
          <Route path="/detalle/mesa" exact component={DetalleMesa} />
          <Route path="/carta/cliente" exact component={VisualizarCarta} />
          <Route path="/detalle/item/carta/empleado" exact component={DetalleItemCartaEmpleado} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
          <Route path="/detalle/item/pedido/cocina" exact component={DetalleItemPedidoCocina} />
          <Route path="/detalle/item/carta" exact component={DetalleItemCarta} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
          <Route path="/carta" exact component={VisualizarCartaEmpleado} />
          <Route path="/menu/empleado" exact component={MenuEmpleado} />
          <Route path="/escanearQR" exact component={EscanearQR} />
          <Route path="/mostrar/qr/:id" exact component={MostrarQR} />
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
        <Header />
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedido} />
          <Route path="/carta" exact component={VisualizarCarta} />
          <Route path="/detalle/item/carta" exact component={DetalleItemCarta} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
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
  props.history.push('/menu/empleado')
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
      sesionEmpleadoActiva: ControllerDeEmpleado.getSesionActiva(),
      empleado: null,
      opcionesMenu: null,
    }
  }

  componentDidMount() {
    this.abrirSesionEmpleado()
  }

  async abrirSesionEmpleado() {
    if (ControllerDeEmpleado.getSesionActiva()) {
      try {
        const empleado = await ServiceLocator.EmpleadoService.getEmpleado()
        const opcionesMenu = await ServiceLocator.EmpleadoService.getMenuEmpleado()

        this.setState({
          empleado: empleado,
          opcionesMenu: opcionesMenu,
        })
      } catch (error) {
        console.error({ error })
      }
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
    console.log(this.state.sesionEmpleadoActiva)
    console.log(this.state.sesionActiva)
    return (
      <div className="contenedor">
        {
          (this.state.sesionActiva && !this.state.sesionEmpleadoActiva && <RouterCliente />)
          ||
          (this.state.sesionActiva && this.state.sesionEmpleadoActiva && <RouterPrincipal empleado={this.state.empleado} opcionesMenu={this.state.opcionesMenu} />)
          ||
          (this.state.sesionEmpleadoActiva && <RouterPrincipal empleado={this.state.empleado} opcionesMenu={this.state.opcionesMenu} />)
          ||
          (<RouterInicial iniciarSesion={{ sesion: this.handleAbrirSesion, empleado: this.handleAbrirSesionEmpleado }} />)
        }
      </div>
    )
  }
}

export default App;