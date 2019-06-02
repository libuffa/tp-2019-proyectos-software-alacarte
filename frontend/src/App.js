import React from 'react';
import './App.css';
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
      ]
  };
  
  return (
    <>
      <Header />
      <Router>
        <Route path="/" exact render={() => <VisualizarPedido pedidos={props.pedidos} />} />
      </Router>
    </>
  );
}

export default App;
