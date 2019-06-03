import React, { Component } from 'react'
import { ServiceLocator } from "../../services/ServiceLocator.js";
import MenuSuperior from "../../components/MenuSuperior";
import ItemCarta from "../../components/ItemCarta";
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default class VisualizarCarta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carta: null,
      selectedItem: null,
      categorias: ["Entrada", "Plato Principal", "Bebida", "Postre", "Cafeteria"],
    }
  }
  
  componentDidMount() {
    this.cargarCarta('Entrada')
  }
  
  cargarCarta(categoria) {
    categoria = categoria.replace(/\s/g, '');
    ServiceLocator.ItemsCartaService.getItemsCartaPorCategoria(categoria)
    .then( (carta) => {
      this.setState({
        carta,
      })
    })
  }

  seleccionEnMenuSuperior = (categoria) => {
    this.cargarCarta(categoria)
  }

  render() {
    const { carta, categorias } = this.state

    if (!carta) {
      return (<h3>Cargando..</h3>)
    }
    return (
      <div>
        <CssBaseline />
        <MenuSuperior handlers={{onChange: this.seleccionEnMenuSuperior}} data={categorias}></MenuSuperior>
        <Container maxWidth="sm">
          {carta.map( (itemCarta) => {
            return <Grid container spacing={3}>
              <Grid item xs={12}>
                <ItemCarta key={itemCarta.id} data={itemCarta}></ItemCarta>
              </Grid>
            </Grid>
          })}
        </Container>
      </div>
    )
  }
}