import React from 'react'
import { Typography, Drawer, List, ListItem, IconButton, Grid, AppBar, Container, Divider } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonPin'
import CartIcon from '@material-ui/icons/LocalLibrary';
import PedidoIcon from '@material-ui/icons/RestaurantMenu';
import MesaIcon from '@material-ui/icons/Layers';
import PersonOutlined from '@material-ui/icons/PersonOutline';
import './Sidenav.scss'
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';
import DialogConfirmacion from '../Dialog/DialogConfirmacion';

export function Sidenav(props) {

    const { open, history, handlers, empleado, opcionesMenu } = props;
    const [openDialog, setOpenDialog] = React.useState(false);

    function handleClickOpen() {
        setOpenDialog(true);
    }

    const handleClose = value => {
        setOpenDialog(false);
    };

    const optionSwitch = (opcionesMenu) => {
        if (opcionesMenu) {
            switch (opcionesMenu) {
                case 'carta':
                    return {
                        onClick: '/carta/empleado',
                        description: 'ver Carta',
                        icon: (<CartIcon />)
                    }

                case 'pedidoCocinero':
                    return {
                        onClick: '/pedido/cocina',
                        description: 'ver Pedidos',
                        icon: (<PedidoIcon />)
                    }

                default:
                    return {
                        onClick: '/mesa',
                        description: 'ver Mesa',
                        icon: (<MesaIcon />)
                    }
            }
        }
    }

    const logOut = () => {
        ControllerDeEmpleado.cerrarSesionActiva()
        window.location.reload();
    }

    return (
        <div>
            <Drawer
                open={open} onClose={handlers.onChange}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={handlers.onChange}>
                    <div className="side-nav">
                        <AppBar position="static">
                            <br />
                            <Grid container spacing={16}>
                                <Grid item xs={12}
                                    container
                                    direction="row"
                                    justify="center">

                                    <Grid item xd={6} >
                                        <br />
                                        <PersonIcon fontSize="large" />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <br />
                                        <Grid item xs={12}>
                                            <Typography
                                                color="inherit"
                                                variant="body2"
                                                gutterBottom >{((empleado) && empleado.nombre) + ' ' + ((empleado) && empleado.apellido)}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography color="inherit" variant="caption">{((empleado) && empleado.email)}</Typography>
                                        </Grid>
                                        <br />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <br />
                        </AppBar>
                        <List>
                            {(opcionesMenu) && opcionesMenu.map((opcion) => {
                                const menu = optionSwitch(opcion)
                                return <ListItem key={menu.description} >
                                    <IconButton onClick={() => history.push(menu.onClick)}>
                                        <Typography
                                            variant="subtitle2"
                                            color="primary">
                                            <Grid container spacing={16}>
                                                <Grid item xs={12}
                                                    container
                                                    direction="row"
                                                    justify="center">
                                                    <Grid item xd={6} >
                                                        {menu.icon}
                                                    </Grid>
                                                    <Grid item xd={6} >
                                                        {' ' + menu.description}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </IconButton>
                                </ListItem>
                            })}
                        </List>
                    </div>
                    <footer >
                        <Divider />
                        <Container maxWidth="sm">
                            <IconButton onClick={handleClickOpen}>
                                <Typography
                                    variant="subtitle2"
                                    color="primary">
                                    <Grid container spacing={16}>
                                        <Grid item xs={12}
                                            container
                                            direction="row"
                                            justify="center">
                                            <Grid item xd={6} >
                                                <PersonOutlined />
                                            </Grid>
                                            <Grid item xd={6} >
                                                {" Cerrar Sesión"}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </IconButton>
                        </Container>
                    </footer>
                </div>
            </Drawer>
            <DialogConfirmacion
                titulo={"Cerrar sesión"}
                descripcion={"¿Estas seguro que deseas cerrar tu sesión?"}
                handlers={{ onChange: logOut, open: handleClose }}
                open={openDialog}
            />
        </div>

    );
};
