import React from 'react';
import './App.css';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  const props = { mesas: [{ id: 1, estado: "Ocupada" }, { id: 2, estado: "Disponible" }, { id: 3, estado: "Ocupada" }] };

  return (
    <>
      <Header />
      <Router>
        <Route path="/" exact render={() => <VisualizarMesa mesas={props.mesas} />} />
      </Router>
    </>
  );
}

export default App;
