import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Avatar, ListItemText, List, ListItemSecondaryAction, Switch, Divider, ListSubheader } from '@material-ui/core';

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
}));

export default function ListaItemsEmpleado(props) {
  const { data, subData, handlers, disableFunction } = props;
  const classes = useStyles();

  function filtrarData(subCategoria) {
    var dataFiltrada = []
    data.filter((plato) => {
      if (plato.subCategoria === subCategoria) {
        dataFiltrada.push(plato)
      }
      return true
    })
    return dataFiltrada
  }

  return (
    <div className={classes.root}>
      {subData.map((subCategoria) => {
        return <List key={subCategoria}>
          <Divider />
          <ListSubheader disableSticky color="inherit" key={subCategoria}>
            <ListItemText primary={subCategoria} />
          </ListSubheader>
          <Divider />
          {filtrarData(subCategoria).map((object) => {
            return <ListItem button key={object.id} onClick={() => handlers.onChange(object)}>
              <ListItemAvatar>
                <Avatar src={object.imagenes[0]} />
              </ListItemAvatar>
              <ListItemText primary={object.titulo} />
              <ListItemSecondaryAction>
                <Switch onChange={() => disableFunction.onChange(object.id)} checked={object.habilitado} />
              </ListItemSecondaryAction>
            </ListItem>
          })}
        </List>
      })}
    </div>
  );
}