import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const props = {
    mesas: [{ id: 1, estado: "Ocupada" }, { id: 2, estado: "Disponible" }, { id: 3, estado: "Ocupada" }]
  };

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/pedido" exact component={VisualizarPedido} />
          <Route path="/mesas" exact component={() => <VisualizarMesa mesas={props.mesas} />} />
          <Route path="/carta" exact component={VisualizarCarta} />
          <Route component={Redirect} />
        </Switch>
      </Router>
    </>
  );
}

function Redirect(props) {
  props.history.push('/carta')
  return (
    <h1>Cargando..</h1>
  )
}

export default App;