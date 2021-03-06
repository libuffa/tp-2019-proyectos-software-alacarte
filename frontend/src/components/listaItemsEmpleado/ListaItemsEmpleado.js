import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Avatar, ListItemText, List, ListItemSecondaryAction, ListSubheader, Typography } from '@material-ui/core';

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
  }
}));

export default function ListaItemsEmpleado(props) {
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
        return <List className={classes.lista} key={subCategoria}>
          <div className="dividerLista" />
          <ListSubheader disableSticky color="inherit" key={subCategoria}>
            <ListItemText primary={subCategoria} />
          </ListSubheader>
          <div className="dividerLista" />
          {filtrarData(subCategoria).map((object) => {
            return <ListItem button key={object.id} onClick={() => handlers.onChange(object)}>
              <ListItemAvatar>
                <Avatar src={object.imagenes[0] ? object.imagenes[0] : "/imagenes/default.jpg"} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography color={object.habilitado ? "textPrimary" : "textSecondary"}>
                    {object.titulo}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primary={
                    <div className="precio">
                      <Typography color={object.habilitado ? "textPrimary" : "textSecondary"} >
                        ${object.precioUnitario}
                      </Typography>
                    </div>
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
          })}
        </List>
      })}
    </div>
  );
}