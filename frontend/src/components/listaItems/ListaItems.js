import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Avatar, ListItemText, List, ListItemSecondaryAction, ListSubheader, Divider } from '@material-ui/core';
import './ListaItems.scss';

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

export default function ListaItems(props) {
  const { data, subData, handlers } = props;
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
            if (object.habilitado) {
              return <ListItem button key={object.id} onClick={() => handlers.onChange(object.id)}>
                <ListItemAvatar>
                  <Avatar src={object.imagenes[0]} />
                </ListItemAvatar>
                <ListItemText primary={object.titulo} />
                <ListItemSecondaryAction>
                  <ListItemText primary={<div className="precio">${object.precioUnitario}</div>} />
                </ListItemSecondaryAction>
              </ListItem>
            }
            return <div></div>
          })}
        </List>
      })}
    </div>
  );
}