import React from 'react';
import './App.css';
import VisualizarCarta from './pages/visualizarCarta/VisualizarCarta';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/visualizarCarta" exact component={VisualizarCarta} />
    </Router>
  );
}

export default App;