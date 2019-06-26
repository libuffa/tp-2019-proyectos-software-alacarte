import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import ListaEmpleados from '../../components/listaEmpleados/ListaEmpleados';

export default class Empleados extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empleados: null,
    };
  }

  componentDidMount() {
    this.cargarEmpleados()
  }

  cargarEmpleados() {
    ServiceLocator.EmpleadoService.getEmpleados()
      .then((respuesta) => {
        this.setState({
          empleados: respuesta,
        })
      })
  }

  verMenu = () => {
    this.props.history.push('/menu/empleado')
  }

  verDetalleEmpleado = (empleado) => {
    this.props.history.push({
      pathname: '/detalle/empleado',
      state: { empleado: empleado }
    })
  }

  render() {
    const { empleados } = this.state;

    const menuButtons = {
      firstButton: {
        onChange: this.verMenu,
        name: "Ver Menu",
        icon: (<Menu />)
      },
    }

    if (!empleados) {
      return <div></div>
    }
    return (
      <div>
        <ListaEmpleados empleados={empleados} handlers={{ onChange: this.verDetalleEmpleado }} />
        <MenuInferior menuButtons={menuButtons} />
      </div>
    )
  }
}



