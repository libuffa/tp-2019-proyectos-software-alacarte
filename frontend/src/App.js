import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido';
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
        <Route path="/" exact render={() => <VisualizarPedido pedidos={props.pedidos} />} />
        <Route path="/mesas" exact render={() => <VisualizarMesa mesas={props.mesas} />} />
      </Router>
    </>
  );
}

export default App;
