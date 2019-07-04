import React, { Component } from 'react'
import { ServiceLocator } from '../../services/ServiceLocator';
import MenuInferior from '../../components/menuInferior/MenuInferior.js';
import Menu from '@material-ui/icons/Menu';
import { CircularProgress, Card, CardActions, Button } from '@material-ui/core';
import ListaMesasAdministrador from '../../components/ListaMesasAdministrador/ListaMesasAdministrador';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';

export default class VisualizarMesasAdministrador extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timer: window.setInterval(() => { this.cargarMesas(); }, 4000),
            mesas: null,
            open: false,
        };
    }

    componentDidMount() {
        this.cargarMesas()
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
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
            state: { mesa: mesa }
        })
    }

    sesionMesa = (id) => {
        ServiceLocator.mesaService.cambiarEstado({
            "idMozo": ControllerDeEmpleado.getSesionActiva(),
            "idMesa": id
        }).then((respuesta) => {
            if (respuesta) {
                this.setState({
                    mensaje: respuesta,
                    variant: "success",
                })
            }
        })
    }

    crearMesa() {
        ServiceLocator.mesaService.crearMesa({
            "idEmpleado": ControllerDeEmpleado.getSesionActiva()
        }).then((respuesta) => {
            if (respuesta.ok) {
                this.setState({
                    mensaje: respuesta,
                    variant: "success",
                })
            } else {
                this.setState({
                    mensaje: respuesta.error.response.data.error,
                    variant: "error",
                })
            }
        })
        this.cargarMesas()
    }

    eliminarMesa = (id) => {
        ServiceLocator.mesaService.eliminarMesa({
            "idEmpleado": ControllerDeEmpleado.getSesionActiva(),
            "idMesa": id
        }).then((respuesta) => {
            console.log(respuesta)
            if (!respuesta.ok) {
                this.setState({
                    mensaje: respuesta.ok,
                    variant: "success",
                })
            } else {
                this.setState({
                    mensaje: respuesta.error,
                    variant: "error",
                })
            }
        })
        this.cargarMesas()
    }

    open = () => {
        this.setState({
            open: !this.state.open
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
            return (
                <div className="fullWidth center">
                    <CircularProgress size={80} />
                </div>
            )
        }

        return (
            <div className="contenedorLista">
                <ListaMesasAdministrador
                    mesas={mesas}
                    cambiarEstado={{ onChange: this.sesionMesa }}
                    eliminarMesa={{ onChange: this.eliminarMesa }} />
                <Card >
                    <CardActions >
                        <Button color="primary" variant="outlined" onClick={() => this.crearMesa()} >
                            {"Nueva mesa"}
                        </Button>
                    </CardActions>
                </Card>
                <MenuInferior menuButtons={menuButtons} />
            </div>
        )
    }
}
