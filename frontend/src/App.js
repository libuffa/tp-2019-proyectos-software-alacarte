import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ControllerDeEmpleado } from './controller/ControllerDeEmpleado';
import { ControllerDeSesion } from './controller/ControllerDeSesion';
import { ServiceLocator } from './services/ServiceLocator';
import { Paper } from '@material-ui/core';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido';
import VisualizarPedidoMozo from './pages/visualizarPedidoMozo/VisualizarPedidoMozo';
import VisualizarPedidoCocina from './pages/visualizarPedidoCocina/VisualizarPedidoCocina';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import VisualizarCartaEmpleado from './pages/visualizarCartaEmpleado/VisualizarCartaEmpleado';
import VisualizarMesas from './pages/visualizarMesas/VisualizarMesas';
import DetalleItemCarta from './pages/detalleItemCarta/DetalleItemCarta';
import DetalleItemCartaEmpleado from './pages/detalleItemCartaEmpleado/DetalleItemCartaEmpleado';
import DetalleItemPedido from './pages/detalleItemPedido/DetalleItemPedido';
import DetalleItemPedidoCocina from './pages/detalleItemPedidoCocina/DetalleItemPedidoCocina';
import DetalleEmpleado from './pages/detalleEmpleado/DetalleEmpleado';
import DetalleMesa from './pages/detalleMesa/DetalleMesa';
import MenuEmpleado from './pages/menuEmpleado/MenuEmpleado';
import EscanearQR from './pages/escanearQR/EscanearQR';
import Empleados from './pages/empleados/Empleados';
import MostrarQR from './pages/MostrarQR/MostrarQR';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import './App.css';
import CambiarContraseña from './pages/CambiarContraseña/CambiarContraseña';
import VisualizarMesasAdministrador from './pages/VisualizarMesasAdministrador/VisualizarMesasAdministrador';
import FormularioItemCarta from './pages/FormularioItemCarta/FormularioItemCarta';

function RouterPrincipal(props) {
  const { empleado, opcionesMenu } = props

  return (
    <Router>
      <div className="fullPaper">
        <Header empleado={empleado} opcionesMenu={opcionesMenu} />
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedidoMozo} />
          <Route path="/pedido/cocina" exact component={VisualizarPedidoCocina} />
          <Route path="/mesas" exact component={VisualizarMesas} />
          <Route path="/mesas/admin" exact component={VisualizarMesasAdministrador} />
          <Route path="/detalle/mesa" exact component={DetalleMesa} />
          <Route path="/carta/cliente" exact component={VisualizarCarta} />
          <Route path="/detalle/item/carta/empleado" exact component={DetalleItemCartaEmpleado} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
          <Route path="/detalle/item/pedido/cocina" exact component={DetalleItemPedidoCocina} />
          <Route path="/detalle/item/carta" exact component={DetalleItemCarta} />
          <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />
          <Route path="/detalle/empleado" exact component={DetalleEmpleado} />
          <Route path="/carta" exact component={VisualizarCartaEmpleado} />
          <Route path="/menu/empleado" exact component={MenuEmpleado} />
          <Route path="/escanear/qr" exact component={EscanearQR} />
          <Route path="/mostrar/qr" exact component={MostrarQR} />
          <Route path="/empleados" exact component={Empleados} />
          <Route path="/cambiar/contraseña" exact component={CambiarContraseña} />
          <Route path="/formulario/item/carta" exact component={FormularioItemCarta} />
          <Route component={RedirectPrincipal} />
        </Switch>
      </div>
    </Router>
  );
}

function RouterCliente() {
  return (
    <Router>
      <div className="fullPaper">
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
      <div className="fullPaper">
        <Header />
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

  componentWillUnmount() {
    this.logOut()
  }

  logOut() {
    ServiceLocator.EmpleadoService.cerrarSesion({ idEmpleado: ControllerDeEmpleado.getSesionActiva() })
    ControllerDeEmpleado.cerrarSesionActiva()
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
    this.abrirSesionEmpleado()
  }

  render() {
    return (
      <div className="contenedorGeneral">
        <div className="contenedor600pix">
          <Paper square className="fullPaper">
            {
              (this.state.sesionActiva && !this.state.sesionEmpleadoActiva && <RouterCliente />)
              ||
              (this.state.sesionActiva && this.state.sesionEmpleadoActiva && <RouterPrincipal empleado={this.state.empleado} opcionesMenu={this.state.opcionesMenu} />)
              ||
              (this.state.sesionEmpleadoActiva && <RouterPrincipal empleado={this.state.empleado} opcionesMenu={this.state.opcionesMenu} />)
              ||
              (<RouterInicial iniciarSesion={{ sesion: this.handleAbrirSesion, empleado: this.handleAbrirSesionEmpleado }} />)
            }
          </Paper>
        </div>
      </div>
    )
  }
}

export default App;