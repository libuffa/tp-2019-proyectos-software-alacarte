import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, ListItemText, List, ListSubheader, Typography, Avatar } from '@material-ui/core';

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
  empleadoActivo: {
    color: '#ffffff',
    backgroundColor: '#03a524bf',
  },
  empleadoInactivo: {
    color: '#ffffff',
    backgroundColor: '#ff0000bf',
  }
}));

export default function ListaEmpleados(props) {
  const { empleados, handlers } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.lista}>
        <div className="dividerLista" />
        <ListSubheader disableSticky color="inherit">
          <ListItemText primary={"Empleados"} />
        </ListSubheader>
        <div className="dividerLista" />
        {empleados.map((empleado) => {
          return (
            <ListItem button key={empleado.id} onClick={() => handlers.onChange(empleado)}>
              <ListItemAvatar >
                <Avatar className={empleado.logueado ? classes.empleadoActivo : classes.empleadoInactivo}>
                  <Typography variant="h5" >
                    {empleado.nombre.charAt(0)}
                  </Typography>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={empleado.nombre + " " + empleado.apellido} secondary={empleado.logueado ? "Conectado" : "Desconectado"} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}