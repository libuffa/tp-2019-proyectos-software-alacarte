import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesas/VisualizarMesas';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import Header from './components/Header/Header';
import './App.css';
import VisualizarPedidoCocina from './pages/VisualizarPedido/VisualizarPedidoCocina';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedido} />
          <Route path="/cocina" exact component={VisualizarPedidoCocina} />
          <Route path="/mesas" exact component={VisualizarMesa} />
          <Route path="/carta" exact component={VisualizarCarta} />
          <Route component={Redirect} />
        </Switch>
      </Router>
    </div>
  );
}

function Redirect(props) {
  props.history.push('/carta')
  return (
    <h1>Cargando..</h1>
  )
}

export default App;