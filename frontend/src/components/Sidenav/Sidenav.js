import React from 'react'
import { Typography, Drawer, List, ListItem, IconButton, Grid, AppBar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonPin'

export function Sidenav(props) {

    const { open, history, handlers } = props;
    console.log(props)

    const opciones = ['carta', 'mesa']

    const optionSwitch = (opcion) => {
        switch (opcion) {
            case 'carta':
                return {
                    // onClick: history.push('/cartaEmpleado'),
                    description: 'ver Carta'
                }
                break;

            default:
                return {
                    // onClick: history.push('/mesa'),
                    description: 'ver Mesa'
                }
                break;
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
                                    <PersonIcon fontSize="large" />
                                </Grid>

                                <Grid item xs={6}>

                                    <Grid item xs={12}>
                                        <Typography color="inherit" variant="body2" gutterBottom >Lautaro Buffa</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="inherit" variant="caption">buffalautaro@gmail.com</Typography>
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>
                        <br />
                    </AppBar>
                    <List>
                        {opciones.map((opcion) => {
                            const menu = optionSwitch(opcion)
                            return <ListItem >
                                <IconButton >
                                    <Typography
                                        variant="subtitle2"
                                        color="primary">
                                        {menu.description}
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
