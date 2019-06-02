import React from 'react';
import './App.css';
import VisualizarMesa from './pages/VisualizarMesa/VisualizarMesa';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { Grid } from '@material-ui/core';

function App() {
  const props = { mesas: [{ id: 1, estado: "En curso" }, { id: 2, estado: "En curso" }, { id: 3, estado: "En curso" }] };

  return (
    <Grid container direction="column">
      <Grid item xs>
        <Header />
      </Grid>

      <Grid item xs>
        <Router>
          <Route path="/" exact render={() => <VisualizarMesa mesas={props.mesas} />} />
        </Router>
      </Grid>
    </Grid>
  );
}

export default App;
