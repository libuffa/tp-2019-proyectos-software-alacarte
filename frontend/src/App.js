import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido/VisualizarPedido';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import VisualizarCartaEmpleado from './pages/visualizarCartaEmpleado/VisualizarCartaEmpleado';
import DetalleItemCarta from './pages/detalleItemCarta/DetalleItemCarta';
import Header from './components/Header/Header';
import './App.css';
import VisualizarPedidoCocina from './pages/VisualizarPedido/VisualizarPedidoCocina/VisualizarPedidoCocina';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/pedido/:id" exact component={VisualizarPedido} />
        <Route path="/cocina" exact component={VisualizarPedidoCocina} />
        <Route path="/mesa" exact component={VisualizarMesa} />
        <Route path="/carta/:id" exact component={VisualizarCarta} />
        <Route path="/detalleItemCarta" exact component={DetalleItemCarta} />
        <Route path="/cartaEmpleado" exact component={VisualizarCartaEmpleado} />
        <Route component={Redirect} />
      </Switch>
    </Router>
  );
}

function Redirect(props) {
  props.history.push('/carta/1')
  return (
    <h1>Cargando..</h1>
  )
}

export default App;