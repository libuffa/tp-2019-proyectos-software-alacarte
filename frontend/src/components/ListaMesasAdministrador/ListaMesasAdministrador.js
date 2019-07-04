import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import DoneIcon from '@material-ui/icons/DoneOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItem, ListItemAvatar, ListItemText, List, ListSubheader, Typography, ListItemSecondaryAction, IconButton, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    lista: {
        padding: theme.spacing(0, 0),
    },
    mesaOcupada: {
        color: '#ffffff',
        backgroundColor: '#ff0000bf',
    },
    mesaLibre: {
        color: '#ffffff',
        backgroundColor: '#03a524bf',
    }
}));

export default function ListaMesasAdministrador(props) {
    const { mesas, cambiarEstado, eliminarMesa } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List className={classes.lista}>
                <div className="dividerLista" />
                <ListSubheader disableSticky color="inherit">
                    <ListItemText primary={"Mesas"} />
                </ListSubheader>
                <div className="dividerLista" />
                {mesas.map((mesa) => {
                    return (
                        <ListItem button key={mesa.id} >
                            <ListItemAvatar >
                                <Avatar className={mesa.sesion ? classes.mesaOcupada : classes.mesaLibre} >
                                    <Typography variant="h5" >
                                        {mesa.numero}
                                    </Typography>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText secondary={mesa.sesion ? "Ocupada" : "Disponible"} />
                            <ListItemSecondaryAction>
                                {mesa.sesion ?
                                    <IconButton edge="end" onClick={() => cambiarEstado.onChange(mesa.id) } >
                                        <DoneIcon color="primary" fontSize="large" />
                                    </IconButton> :
                                    <IconButton edge="end" onClick={() => cambiarEstado.onChange(mesa.id) } >
                                        <CloseIcon color="error" fontSize="large" />
                                    </IconButton>
                                }
                                <IconButton 
                                    edge="end" 
                                    onClick={() => eliminarMesa.onChange(mesa.id) } 
                                    disabled={mesa.sesion ? true : false } >
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}