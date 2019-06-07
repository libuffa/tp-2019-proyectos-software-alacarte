import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesas/VisualizarMesas';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import VisualizarCartaEmpleado from './pages/visualizarCartaEmpleado/VisualizarCartaEmpleado';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/pedido" exact component={VisualizarPedido} />
        <Route path="/mesas" exact component={VisualizarMesa} />
        <Route path="/carta" exact component={VisualizarCarta} />
        <Route path="/cartaEmpleado" exact component={VisualizarCartaEmpleado} />
        <Route component={Redirect} />
      </Switch>
    </Router>
  );
}

function Redirect(props) {
  props.history.push('/carta')
  return (
    <h1>Cargando..</h1>
  )
}

export default App;