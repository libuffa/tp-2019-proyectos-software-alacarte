import React from 'react';
import './App.css';
import VisualizarMesa from './pages/VisualizarMesas/VisualizarMesas';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/mesas" exact component={VisualizarMesa} />
    </Router>
  );
}

export default App;
