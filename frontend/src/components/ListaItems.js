import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, Avatar, ListItemText, List, Grid, Paper } from '@material-ui/core';

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

export default function SimpleList(props) {
  const { data, subData, handlers } = props;
  const classes = useStyles();

  function filtrarData(subCategoria) {
    var dataFiltrada = []
    data.filter( (plato) => {
      if(plato.subCategoria === subCategoria){
        dataFiltrada.push(plato)
      }
      return true
    })
    return dataFiltrada
  }

  return (
    <div className={classes.root}>
      {subData.map( (subCategoria) => {
        return  <List key={subCategoria} component="nav" aria-label="Secondary mailbox folders">
                  <Grid key={subCategoria} container spacing={1}>
                    <Grid key={subCategoria} item xs={12}>
                      <Paper key={subCategoria} className={classes.paper}>{subCategoria}</Paper>
                    </Grid>
                  </Grid>
                  {filtrarData(subCategoria).map( (object) => {
                    return  <ListItem button key={object.id} onClick={() => handlers.onChange(object)}>
                              <Grid container spacing={1}>
                                <Grid item xs={2}>
                                  <ListItemAvatar>
                                    <Avatar alt={object.titulo} src={object.imagenes[0]} />
                                  </ListItemAvatar>
                                </Grid>
                                <Grid item xs={8}>
                                  <ListItemText primary={object.titulo} />
                                </Grid>
                                <Grid item xs={2}>
                                  <ListItemText primary={"$" + object.precioUnitario} />
                                </Grid>
                              </Grid>
                            </ListItem>
                  })}
                </List>
      })}
    </div>
  );
}