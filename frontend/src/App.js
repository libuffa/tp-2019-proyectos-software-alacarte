import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ControllerDeEmpleado } from './controller/ControllerDeEmpleado';
import { ControllerDeSesion } from './controller/ControllerDeSesion';
import { ServiceLocator } from './services/ServiceLocator';
import { Paper, CircularProgress } from '@material-ui/core';
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
import InstruccionesJuego from './pages/instruccionesJuego/InstruccionesJuego';
import Minijuego from './pages/minijuego/Minijuego';
import RecuperarContraseña from './pages/RecuperarContraseña/RecuperarContraseña';

function RouterPrincipal(props) {
  const { empleado, opcionesMenu } = props

  return (
    <Router>
      <div className="fullPaper">
        <Header empleado={empleado} opcionesMenu={opcionesMenu} />
        <Switch>
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/pedido" exact component={VisualizarPedidoMozo} />}
          {empleado.tipoEmpleado === "Cocinero" && <Route path="/pedido/cocina" exact component={VisualizarPedidoCocina} />}
          {empleado.tipoEmpleado === "Mozo" && <Route path="/mesas" exact component={VisualizarMesas} />}
          {empleado.tipoEmpleado === "Administrador" && <Route path="/mesas/admin" exact component={VisualizarMesasAdministrador} />}
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/detalle/mesa" exact component={DetalleMesa} />}
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/carta/cliente" exact component={VisualizarCarta} />}
          <Route path="/detalle/item/carta/empleado" exact component={DetalleItemCartaEmpleado} />
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />}
          {empleado.tipoEmpleado === "Cocinero" && <Route path="/detalle/item/pedido/cocina" exact component={DetalleItemPedidoCocina} />}
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/detalle/item/carta" exact component={DetalleItemCarta} />}
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/detalle/item/pedido" exact component={DetalleItemPedido} />}
          {empleado.tipoEmpleado === "Administrador" && <Route path="/detalle/empleado" exact component={DetalleEmpleado} />}
          <Route path="/carta" exact component={VisualizarCartaEmpleado} />
          <Route path="/menu/empleado" exact component={MenuEmpleado} />
          {(empleado.tipoEmpleado === "Mozo" || empleado.tipoEmpleado === "Administrador") && <Route path="/mostrar/qr" exact component={MostrarQR} />}
          {empleado.tipoEmpleado === "Administrador" && <Route path="/empleados" exact component={Empleados} />}
          <Route path="/cambiar/contraseña" exact component={CambiarContraseña} />
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
          <Route path="/minijuego/instrucciones" exact component={InstruccionesJuego} />
          <Route path="/minijuego" exact component={Minijuego} />
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
          <Route path="/login" exact render={() => <Login iniciarSesion={iniciarSesion.empleado} />} />
          <Route path="/escanearQR" exact render={() => <EscanearQR iniciarSesion={iniciarSesion.sesion} />} />
          <Route path="/recuperar/contraseña" exact component={RecuperarContraseña} />
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
      sesion: null,
      empleado: null,
      opcionesMenu: null,
      mostrar: false,
    }
  }

  componentDidMount() {
    if (ControllerDeEmpleado.getSesionActiva()) {
      this.abrirSesionEmpleado()
    }
    if (ControllerDeSesion.getSesionActiva()) {
      this.abrirSesion()
    }
    setTimeout(() => { this.mostrar() }, 1000)
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

  async abrirSesion() {
    if (ControllerDeSesion.getSesionActiva()) {
      try {
        const sesion = await ServiceLocator.SesionService.getSesionActiva()

        this.setState({
          sesion: sesion,
        })
      } catch (error) {
        console.error({ error })
      }
    }
  }

  mostrar() {
    this.setState({
      mostrar: true,
    })
  }

  handleAbrirSesion = (sesion) => {
    ControllerDeSesion.setSesionActiva(sesion)
    this.setState({
      sesionActiva: sesion
    })
    this.abrirSesion()
  }

  handleAbrirSesionEmpleado = (empleado) => {
    ControllerDeEmpleado.setSesionActiva(empleado)
    this.setState({
      sesionEmpleadoActiva: empleado
    })
    this.abrirSesionEmpleado()
  }

  render() {
    if (!this.state.mostrar) {
      return (
        <div className="contenedorGeneral">
          <div className="contenedor600pix">
            <Paper square className="fullPaper">
              <div className="contenedorGeneral flexCenter">
                <CircularProgress size={80} color="secondary" />
              </div>
            </Paper>
          </div>
        </div>
      )
    } else {
      return (
        <div className="contenedorGeneral">
          <div className="contenedor600pix">
            <Paper square className="fullPaper">
              {
                (this.state.sesionActiva && this.state.sesion && !this.state.sesionEmpleadoActiva && <RouterCliente />)
                ||
                (this.state.sesionActiva && this.state.sesionEmpleadoActiva && this.state.empleado && <RouterPrincipal empleado={this.state.empleado} opcionesMenu={this.state.opcionesMenu} />)
                ||
                (this.state.sesionEmpleadoActiva && this.state.empleado && <RouterPrincipal empleado={this.state.empleado} opcionesMenu={this.state.opcionesMenu} />)
                ||
                (<RouterInicial iniciarSesion={{ sesion: this.handleAbrirSesion, empleado: this.handleAbrirSesionEmpleado }} />)
              }
            </Paper>
          </div>
        </div>
      )
    }
  }
}

export default App;