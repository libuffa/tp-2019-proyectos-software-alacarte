import React from 'react'
import { Typography, Drawer, List, ListItem, IconButton, Grid, AppBar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonPin'
import CartIcon from '@material-ui/icons/LocalLibrary';
import PedidoIcon from '@material-ui/icons/RestaurantMenu';
import MesaIcon from '@material-ui/icons/Layers';
import './Sidenav.scss'

export function Sidenav(props) {

    const { open, history, handlers, empleado, opcionesMenu } = props;

    const optionSwitch = (opcionesMenu) => {
        if(opcionesMenu) {
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

    return (
        <Drawer
            open={open} onClose={handlers.onChange}>
            <div
                tabIndex={0}
                role="button"
                onClick={open}>
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
                            return <ListItem >
                                <IconButton >
                                    <Typography
                                        variant="subtitle2"
                                        color="primary"
                                        onClick={() => history.push(menu.onClick)}>
                                        {menu.icon}
                                        {' ' + menu.description}
                                    </Typography>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
                </div>
            </div>
        </Drawer>
    );
};
