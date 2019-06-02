import React from 'react';
import './App.css';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import VisualizarPedido from './pages/VisualizarPedido/VisualizarPedido';

function App() {
  const props = {
    pedidos:
      [
        {
          id: 1,
          itemCarta:
          {
            titulo: "Milanesa",
            descripcion: "lomo empanado con papas a la francesa"
          },
          estado: "creado",
          cantidad: 2
        },
        {
          id: 2,
          itemCarta:
          {
            titulo: "Milanesa",
            descripcion: "lomo empanado con papas a la francesa"
          },
          estado: "creado",
          cantidad: 2
        },
        {
          id: 3,
          itemCarta:
          {
            titulo: "Milanesa",
            descripcion: "lomo empanado con papas a la francesa"
          },
          estado: "creado",
          cantidad: 2
        }
      ],
    mesas: [{ id: 1, estado: "Ocupada" }, { id: 2, estado: "Disponible" }, { id: 3, estado: "Ocupada" }]
  };

  return (
    <>
      <Header />
      <Router>
        <Route path="/" exact render={() => <VisualizarPedido pedidos={props.pedidos} />} />
        <Route path="/mesa" exact render={() => <VisualizarMesa mesas={props.mesas} />} />
      </Router>
    </>
  );
}

export default App;
