import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import ListaMesasMozo from '../../components/listaMesasMozo/ListaMesasMozo';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';

export default class VisualizarMesas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mesas: null,
    };
  }

  componentDidMount() {
    this.cargarMesas()
  }

  cargarMesas() {
    ServiceLocator.mesaService.getMesas()
      .then((respuesta) => {
        this.setState({
          mesas: respuesta,
        })
      })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  verDetalleMesa = (mesa) => {
    this.props.history.push({
      pathname: '/detalle/mesa',
      state: { mesa: mesa },
      history: this.props.history,
    })
  }

  render() {
    const { mesas } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!mesas) {
      return <div></div>
    }
    return (
      <div>
        <ListaMesasMozo mesas={mesas} handlers={{ onChange: this.verDetalleMesa }} />
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}



